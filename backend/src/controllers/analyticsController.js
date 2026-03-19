/**
 * @module controllers/analyticsController
 * @description Handles progress analytics, risk scores, productivity estimates,
 * all-developer views, and onboarding report generation.
 */

const localStore = require('../data/localStore');
const riskService = require('../services/riskService');
const reportService = require('../services/reportService');

function buildProgressData(userId) {
  const tasks = localStore.listTasksForUser(userId);
  const total = tasks.length || 1;
  const completed = tasks.filter((task) => task.status === 'completed' || task.status === 'verified').length;
  const inProgress = tasks.filter((task) => task.status === 'in_progress').length;
  const notStarted = tasks.filter((task) => task.status === 'not_started').length;
  const percentComplete = parseFloat(((completed / total) * 100).toFixed(1));
  const user = localStore.getUserById(userId);
  const startDate = user ? new Date(user.createdAt) : new Date();
  const now = new Date();
  const daysElapsed = Math.max(1, (now - startDate) / (1000 * 60 * 60 * 24));
  const tasksPerDay = completed / daysElapsed;
  const remainingTasks = total - completed;
  const estimatedDaysRemaining = tasksPerDay > 0 ? Math.ceil(remainingTasks / tasksPerDay) : null;
  const estimatedCompletionDate = estimatedDaysRemaining
    ? new Date(now.getTime() + estimatedDaysRemaining * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    : null;

  return {
    total,
    completed,
    inProgress,
    notStarted,
    percentComplete,
    tasksPerDay: parseFloat(tasksPerDay.toFixed(2)),
    estimatedCompletionDate,
    estimatedDaysRemaining,
  };
}

async function getProgress(req, res) {
  try {
    res.json({
      success: true,
      data: buildProgressData(req.user.id),
      error: null,
    });
  } catch (err) {
    console.error('[AnalyticsController] Progress error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve progress.' });
  }
}

async function getRisk(req, res) {
  try {
    const riskData = await riskService.computeRiskScore(req.user.id);

    res.json({
      success: true,
      data: {
        score: riskData.score,
        level: riskData.score > 0.7 ? 'high' : riskData.score > 0.4 ? 'medium' : 'low',
        flagForManager: riskData.flagForManager,
        factors: riskData.factors,
      },
      error: null,
    });
  } catch (err) {
    console.error('[AnalyticsController] Risk error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve risk score.' });
  }
}

async function getProductivityEstimate(req, res) {
  try {
    const progress = buildProgressData(req.user.id);
    const user = localStore.getUserById(req.user.id);

    if (!user || progress.total === 0) {
      return res.json({
        success: true,
        data: { estimate: null, message: 'No tasks assigned yet.' },
        error: null,
      });
    }

    const startDate = new Date(user.createdAt);
    const now = new Date();
    const daysElapsed = Math.max(0.5, (now - startDate) / (1000 * 60 * 60 * 24));
    const tasksPerDay = progress.completed / daysElapsed;
    const remaining = progress.total - progress.completed;
    const estimatedDaysToComplete = tasksPerDay > 0 ? remaining / tasksPerDay : null;
    const totalEstimatedDays = estimatedDaysToComplete
      ? parseFloat((estimatedDaysToComplete + 1.5).toFixed(1))
      : null;

    let message;
    if (progress.completed === progress.total) {
      message = 'You have completed all onboarding tasks. You should be ready to merge your first PR now.';
    } else if (totalEstimatedDays && totalEstimatedDays <= 1) {
      message = 'Based on your current pace, you will be ready to merge your first PR in about 1 day.';
    } else if (totalEstimatedDays && totalEstimatedDays <= 3) {
      message = `Based on your current pace, you will be ready to merge your first PR in about ${Math.ceil(totalEstimatedDays)} days.`;
    } else if (totalEstimatedDays) {
      message = `Based on your current pace, estimated ${Math.ceil(totalEstimatedDays)} days until your first PR.`;
    } else {
      message = 'Complete more tasks to generate a productivity estimate.';
    }

    res.json({
      success: true,
      data: {
        daysElapsed: parseFloat(daysElapsed.toFixed(1)),
        tasksCompleted: progress.completed,
        totalTasks: progress.total,
        tasksPerDay: parseFloat(tasksPerDay.toFixed(2)),
        estimatedDaysRemaining: totalEstimatedDays,
        estimatedReadyDate: totalEstimatedDays
          ? new Date(now.getTime() + totalEstimatedDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null,
        message,
      },
      error: null,
    });
  } catch (err) {
    console.error('[AnalyticsController] Productivity estimate error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to compute productivity estimate.' });
  }
}

async function getAllDevelopers(req, res) {
  try {
    const developers = await Promise.all(
      localStore.listDevelopers().map(async (developer) => {
        const profile = localStore.getUserProfile(developer.id);
        const progress = buildProgressData(developer.id);
        const risk = await riskService.computeRiskScore(developer.id);
        const daysSinceStart = Math.ceil(
          (Date.now() - new Date(developer.createdAt).getTime()) / (1000 * 60 * 60 * 24)
        );

        return {
          id: developer.id,
          name: developer.name,
          email: developer.email,
          experienceLevel: developer.experienceLevel,
          team: developer.team,
          personaName: profile?.persona?.name || null,
          daysSinceStart,
          progress: {
            total: progress.total,
            completed: progress.completed,
            percentage: progress.percentComplete,
          },
          risk: {
            score: risk.score,
            level: risk.score > 0.7 ? 'high' : risk.score > 0.4 ? 'medium' : 'low',
            flagged: risk.flagForManager,
            factors: risk.factors,
          },
        };
      })
    );

    res.json({
      success: true,
      data: { developers },
      error: null,
    });
  } catch (err) {
    console.error('[AnalyticsController] All developers error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve developer data.' });
  }
}

async function getOnboardingReport(req, res) {
  try {
    const report = await reportService.generateReport(req.params.userId);

    res.json({
      success: true,
      data: { report },
      error: null,
    });
  } catch (err) {
    console.error('[AnalyticsController] Report error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to generate onboarding report.' });
  }
}

module.exports = {
  getProgress,
  getRisk,
  getProductivityEstimate,
  getAllDevelopers,
  getOnboardingReport,
};
