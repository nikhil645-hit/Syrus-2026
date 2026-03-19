/**
 * @module services/reportService
 * @description Generates onboarding reports from the local demo store.
 */

const localStore = require('../data/localStore');
const riskService = require('./riskService');

async function generateReport(userId) {
  try {
    const user = localStore.getUserById(userId);
    const profile = localStore.getUserProfile(userId);
    const tasks = localStore.listTasksForUser(userId);

    if (!user || !profile) {
      throw new Error('User not found.');
    }

    const now = new Date();
    const startDate = new Date(user.createdAt);
    const daysElapsed = Math.max(1, Math.ceil((now - startDate) / (1000 * 60 * 60 * 24)));
    const completedTasks = tasks.filter((task) => task.status === 'completed' || task.status === 'verified');
    const inProgressTasks = tasks.filter((task) => task.status === 'in_progress');
    const notStartedTasks = tasks.filter((task) => task.status === 'not_started');
    const completedWithTime = tasks.filter((task) => task.startedAt && task.completedAt);
    const totalEstimatedMinutes = tasks.reduce((sum, task) => sum + (task.estimatedMinutes || 0), 0);
    const totalActualMinutes = completedWithTime.reduce((sum, task) => {
      return sum + Math.round((new Date(task.completedAt) - new Date(task.startedAt)) / (1000 * 60));
    }, 0);
    const averageTaskMinutes = completedWithTime.length > 0
      ? Math.round(totalActualMinutes / completedWithTime.length)
      : null;
    const tasksPerDay = completedTasks.length > 0
      ? parseFloat((completedTasks.length / daysElapsed).toFixed(1))
      : 0;
    const riskData = await riskService.getRiskScore(userId);
    const chatHistory = localStore.getChatHistory(userId, 200);
    const userMessages = chatHistory.filter((message) => message.role === 'user').length;
    const assistantMessages = chatHistory.filter((message) => message.role === 'assistant').length;
    const remainingTasks = tasks.length - completedTasks.length;
    const estimatedDaysRemaining = tasksPerDay > 0
      ? parseFloat((remainingTasks / tasksPerDay).toFixed(1))
      : null;

    const categoryBreakdown = {};
    for (const task of tasks) {
      if (!categoryBreakdown[task.category]) {
        categoryBreakdown[task.category] = { total: 0, completed: 0, in_progress: 0 };
      }
      categoryBreakdown[task.category].total += 1;
      if (task.status === 'completed' || task.status === 'verified') {
        categoryBreakdown[task.category].completed += 1;
      } else if (task.status === 'in_progress') {
        categoryBreakdown[task.category].in_progress += 1;
      }
    }

    const totalVerifications = tasks.reduce((sum, task) => sum + (task.attemptCount || 0), 0);
    const successfulVerifications = tasks.filter((task) => task.verificationResult === true).length;
    const verificationPassRate = totalVerifications > 0
      ? parseFloat(((successfulVerifications / totalVerifications) * 100).toFixed(1))
      : 0;

    return {
      report_metadata: {
        generated_at: now.toISOString(),
        report_type: 'Developer Onboarding Progress Report',
        version: 'local-demo-1.0',
      },
      developer: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        experience_level: user.experienceLevel,
        tech_stack: user.techStack,
        team: user.team,
        onboarding_start_date: startDate.toISOString(),
        days_elapsed: daysElapsed,
      },
      persona_match: {
        persona_name: profile.persona?.name || 'Unassigned',
        persona_role: profile.persona?.role || null,
        onboarding_focus: profile.persona?.onboardingFocus || null,
        learning_objectives: profile.persona?.learningObjectives || null,
      },
      progress_summary: {
        total_tasks: tasks.length,
        completed: completedTasks.length,
        in_progress: inProgressTasks.length,
        not_started: notStartedTasks.length,
        completion_percentage: tasks.length > 0
          ? parseFloat(((completedTasks.length / tasks.length) * 100).toFixed(1))
          : 0,
        category_breakdown: categoryBreakdown,
      },
      velocity_metrics: {
        tasks_per_day: tasksPerDay,
        average_task_duration_minutes: averageTaskMinutes,
        total_estimated_minutes: totalEstimatedMinutes,
        total_actual_minutes: totalActualMinutes,
        overall_efficiency: totalActualMinutes > 0
          ? parseFloat(((totalEstimatedMinutes / totalActualMinutes) * 100).toFixed(1))
          : null,
      },
      verification_stats: {
        total_attempts: totalVerifications,
        successful: successfulVerifications,
        pass_rate_percentage: verificationPassRate,
        tasks_with_multiple_attempts: tasks.filter((task) => (task.attemptCount || 0) > 1).length,
      },
      risk_assessment: {
        current_score: riskData.score,
        risk_level: riskData.score > 0.7 ? 'HIGH' : riskData.score > 0.4 ? 'MEDIUM' : 'LOW',
        flagged_for_manager: riskData.flagForManager,
        factors: riskData.factors,
      },
      chat_engagement: {
        total_user_messages: userMessages,
        total_assistant_responses: assistantMessages,
        engagement_level: userMessages > 10 ? 'HIGH' : userMessages > 3 ? 'MEDIUM' : 'LOW',
      },
      time_to_productivity: {
        estimated_days_remaining: estimatedDaysRemaining,
        estimated_completion_date: estimatedDaysRemaining
          ? new Date(now.getTime() + estimatedDaysRemaining * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
          : null,
        assessment: completedTasks.length === tasks.length
          ? 'Onboarding complete - developer is ready for full productivity.'
          : estimatedDaysRemaining && estimatedDaysRemaining <= 2
            ? 'On track - developer should be productive within 2 days.'
            : estimatedDaysRemaining && estimatedDaysRemaining <= 5
              ? 'Progressing - developer is working through tasks at a reasonable pace.'
              : 'Needs attention - progress is slower than expected. Consider assigning a buddy.',
      },
      task_details: tasks.map((task) => {
        let minutesSpent = null;
        if (task.startedAt && task.completedAt) {
          minutesSpent = Math.round((new Date(task.completedAt) - new Date(task.startedAt)) / (1000 * 60));
        } else if (task.startedAt) {
          minutesSpent = Math.round((now - new Date(task.startedAt)) / (1000 * 60));
        }

        return {
          title: task.title,
          category: task.category,
          status: task.status,
          estimated_minutes: task.estimatedMinutes,
          actual_minutes: minutesSpent,
          efficiency: minutesSpent && task.estimatedMinutes
            ? parseFloat(((task.estimatedMinutes / minutesSpent) * 100).toFixed(1))
            : null,
          verification_type: task.verificationType,
          verification_passed: task.verificationResult,
          attempts: task.attemptCount,
          started_at: task.startedAt,
          completed_at: task.completedAt,
        };
      }),
    };
  } catch (err) {
    console.error('[ReportService] Error generating report:', err.message);
    throw new Error('Failed to generate onboarding report.');
  }
}

module.exports = { generateReport };
