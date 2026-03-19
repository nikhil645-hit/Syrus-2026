/**
 * @module controllers/pitfallController
 * @description Retrieves pitfalls associated with a specific task.
 */

const localStore = require('../data/localStore');

async function getPitfalls(req, res) {
  try {
    const { taskId } = req.query;

    if (!taskId) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'taskId query parameter is required.',
      });
    }

    const pitfalls = localStore.listPitfallsByTask(taskId);
    const task = localStore.getTaskById(taskId);

    res.json({
      success: true,
      data: {
        taskId,
        pitfalls: pitfalls.map((pitfall) => ({
          id: pitfall.id,
          title: pitfall.title,
          description: pitfall.description,
          warningMessage: pitfall.warningMessage,
          condition: pitfall.condition,
          taskTitle: task?.title || null,
        })),
      },
      error: null,
    });
  } catch (err) {
    console.error('[PitfallController] Get pitfalls error:', err.message);
    res.status(500).json({
      success: false,
      data: null,
      error: 'Failed to retrieve pitfalls.',
    });
  }
}

module.exports = { getPitfalls };
