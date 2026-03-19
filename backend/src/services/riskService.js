/**
 * @module services/riskService
 * @description Computes risk scores for developers using the local demo store.
 */

const localStore = require('../data/localStore');

const SIGNAL_WEIGHTS = {
  STUCK_TASKS: 0.3,
  VERIFICATION_FAILURES: 0.25,
  INACTIVE_24H: 0.2,
  LOW_COMPLETION_48H: 0.15,
  NO_CHAT_ACTIVITY: 0.1,
};

const FLAG_THRESHOLD = 0.7;

async function computeRiskScore(userId) {
  try {
    const tasks = localStore.listTasksForUser(userId);
    const progressLogs = localStore.getProgressLogs(userId);
    const chatHistory = localStore.getChatHistory(userId, 200);
    const user = localStore.getUserById(userId);
    const factors = {};
    let totalScore = 0;

    const stuckTasks = tasks.filter((task) => {
      if (task.status !== 'in_progress' || !task.startedAt) {
        return false;
      }

      const minutesActive = (Date.now() - new Date(task.startedAt).getTime()) / (1000 * 60);
      return minutesActive > (task.estimatedMinutes || 30) * 2;
    });
    const stuckScore = stuckTasks.length > 0 ? Math.min(1, stuckTasks.length * 0.5) : 0;
    factors.stuck_tasks = { count: stuckTasks.length, signal_score: stuckScore };
    totalScore += stuckScore * SIGNAL_WEIGHTS.STUCK_TASKS;

    const failedTasks = tasks.filter((task) => task.verificationResult === false);
    const maxAttempts = Math.max(0, ...failedTasks.map((task) => task.attemptCount || 0));
    const highFailTasks = failedTasks.filter((task) => (task.attemptCount || 0) > 3).length;
    const failureScore = maxAttempts > 3 ? Math.min(1, highFailTasks * 0.4 + 0.2) : 0;
    factors.verification_failures = {
      max_attempts: maxAttempts,
      high_fail_tasks: highFailTasks,
      signal_score: failureScore,
    };
    totalScore += failureScore * SIGNAL_WEIGHTS.VERIFICATION_FAILURES;

    const recentActivity = progressLogs.filter((event) =>
      new Date(event.timestamp).getTime() > Date.now() - 24 * 60 * 60 * 1000
    ).length;
    const inactiveScore = recentActivity === 0 ? 1 : 0;
    factors.inactive_24h = { recent_events: recentActivity, signal_score: inactiveScore };
    totalScore += inactiveScore * SIGNAL_WEIGHTS.INACTIVE_24H;

    const totalTasks = tasks.length || 1;
    const completedTasks = tasks.filter((task) => task.status === 'completed' || task.status === 'verified').length;
    const completionPct = completedTasks / totalTasks;
    const hoursSinceStart = user
      ? (Date.now() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60)
      : 0;
    const lowCompletionScore = hoursSinceStart > 48 && completionPct < 0.3 ? 1 : 0;
    factors.low_completion = {
      completion_pct: parseFloat((completionPct * 100).toFixed(1)),
      hours_since_start: parseFloat(hoursSinceStart.toFixed(1)),
      signal_score: lowCompletionScore,
    };
    totalScore += lowCompletionScore * SIGNAL_WEIGHTS.LOW_COMPLETION_48H;

    const userChatMessages = chatHistory.filter((message) => message.role === 'user').length;
    const noChatScore = userChatMessages === 0 ? 1 : 0;
    factors.no_chat_activity = { total_messages: userChatMessages, signal_score: noChatScore };
    totalScore += noChatScore * SIGNAL_WEIGHTS.NO_CHAT_ACTIVITY;

    const finalScore = parseFloat(Math.min(1, totalScore).toFixed(3));
    const flagForManager = finalScore > FLAG_THRESHOLD;

    localStore.setRiskScore(userId, {
      score: finalScore,
      factors,
      flagForManager,
    });
    localStore.logProgress(userId, 'risk_recalculated', { score: finalScore, flagged: flagForManager });

    return { score: finalScore, factors, flagForManager };
  } catch (err) {
    console.error('[RiskService] Error computing risk score:', err.message);
    throw new Error('Failed to compute risk score.');
  }
}

async function getRiskScore(userId) {
  const cached = localStore.getRiskScore(userId);
  if (cached) {
    return {
      score: parseFloat(cached.score),
      factors: cached.factors,
      flagForManager: cached.flagForManager,
      updatedAt: cached.updatedAt,
    };
  }

  return computeRiskScore(userId);
}

async function getFlaggedDevelopers() {
  try {
    const developers = await Promise.all(
      localStore.listDevelopers().map(async (user) => {
        const risk = await getRiskScore(user.id);
        return {
          userId: user.id,
          name: user.name,
          email: user.email,
          score: risk.score,
          factors: risk.factors,
          updatedAt: risk.updatedAt,
        };
      })
    );

    return developers.filter((developer) => developer.score > FLAG_THRESHOLD);
  } catch (err) {
    console.error('[RiskService] Error getting flagged developers:', err.message);
    return [];
  }
}

module.exports = { computeRiskScore, getRiskScore, getFlaggedDevelopers };
