/**
 * @module controllers/chatController
 * @description Handles the onboarding chat endpoint and chat history retrieval.
 */

const ragService = require('../services/ragService');
const localStore = require('../data/localStore');

async function sendMessage(req, res) {
  try {
    const { message } = req.body;

    if (!message || message.trim().length === 0) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Message is required.',
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Message too long. Maximum 2000 characters.',
      });
    }

    const result = await ragService.chat(req.user.id, message.trim());

    res.json({
      success: true,
      data: {
        reply: result.reply,
        sources: result.sources,
        confidence: result.confidence,
      },
      error: null,
    });
  } catch (err) {
    console.error('[ChatController] Send message error:', err.message);
    res.status(500).json({
      success: false,
      data: null,
      error: 'Failed to process your message. Please try again.',
    });
  }
}

async function getHistory(req, res) {
  try {
    const messages = localStore.getChatHistory(req.user.id, 50).map((message) => ({
      id: message.id,
      role: message.role,
      content: message.content,
      sources: message.sources || [],
      createdAt: message.createdAt,
    }));

    res.json({
      success: true,
      data: { messages },
      error: null,
    });
  } catch (err) {
    console.error('[ChatController] Get history error:', err.message);
    res.status(500).json({
      success: false,
      data: null,
      error: 'Failed to retrieve chat history.',
    });
  }
}

module.exports = { sendMessage, getHistory };
