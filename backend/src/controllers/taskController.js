/**
 * @module controllers/taskController
 * @description Handles task listing, starting, verification, and completion.
 */

const localStore = require('../data/localStore');
const verificationService = require('../services/verificationService');
const ragService = require('../services/ragService');
const riskService = require('../services/riskService');

async function listTasks(req, res) {
  try {
    const tasks = localStore.listTasksForUser(req.user.id);
    res.json({ success: true, data: { tasks }, error: null });
  } catch (err) {
    console.error('[TaskController] List tasks error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve tasks.' });
  }
}

async function getTask(req, res) {
  try {
    const task = localStore.getTaskDetailForUser(req.user.id, req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found.' });
    }

    res.json({ success: true, data: task, error: null });
  } catch (err) {
    console.error('[TaskController] Get task error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve task.' });
  }
}

async function startTask(req, res) {
  try {
    const task = localStore.getTaskDetailForUser(req.user.id, req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found.' });
    }

    if (task.status !== 'not_started') {
      return res.status(400).json({
        success: false,
        data: null,
        error: `Task is already ${task.status}. Cannot start.`,
      });
    }

    localStore.startTask(req.user.id, req.params.id);
    localStore.logProgress(req.user.id, 'task_started', { task_id: task.taskId, title: task.title });

    ragService.sendPitfallWarning(req.user.id, task.taskId).catch((err) => {
      console.error('[TaskController] Pitfall warning failed:', err.message);
    });

    res.json({
      success: true,
      data: { message: `Task "${task.title}" started.`, taskId: req.params.id },
      error: null,
    });
  } catch (err) {
    console.error('[TaskController] Start task error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to start task.' });
  }
}

async function verifyTask(req, res) {
  try {
    const { evidence } = req.body;

    if (!evidence || evidence.trim().length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Evidence is required for verification.',
      });
    }

    const task = localStore.getTaskDetailForUser(req.user.id, req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found.' });
    }

    const result = verificationService.verify(
      task.verificationType,
      evidence,
      task.verificationParams || {}
    );

    localStore.updateTaskVerification(req.user.id, req.params.id, result, evidence);
    localStore.logProgress(req.user.id, 'task_verified', {
      task_id: task.taskId,
      title: task.title,
      success: result.success,
      attempt: (task.attemptCount || 0) + 1,
    });

    riskService.computeRiskScore(req.user.id).catch((err) => {
      console.error('[TaskController] Risk recalculation failed:', err.message);
    });

    if (!result.success) {
      ragService.generateDiagnostic(req.user.id, task.title, evidence, result.message).catch((err) => {
        console.error('[TaskController] Diagnostic generation failed:', err.message);
      });
    }

    res.json({
      success: true,
      data: {
        verification: {
          passed: result.success,
          message: result.message,
          details: result.details,
          attemptCount: (task.attemptCount || 0) + 1,
        },
      },
      error: null,
    });
  } catch (err) {
    console.error('[TaskController] Verify task error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to verify task.' });
  }
}

async function completeTask(req, res) {
  try {
    const task = localStore.getTaskDetailForUser(req.user.id, req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, data: null, error: 'Task not found.' });
    }

    localStore.completeTask(req.user.id, req.params.id);
    localStore.logProgress(req.user.id, 'task_completed', { task_id: task.taskId, title: task.title });
    riskService.computeRiskScore(req.user.id).catch(() => {});

    res.json({
      success: true,
      data: { message: `Task "${task.title}" marked as completed.` },
      error: null,
    });
  } catch (err) {
    console.error('[TaskController] Complete task error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to complete task.' });
  }
}

module.exports = { listTasks, getTask, startTask, verifyTask, completeTask };
