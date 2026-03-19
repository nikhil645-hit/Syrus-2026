import { useState, useCallback } from 'react';
import { chatAPI } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadHistory = useCallback(async () => {
    try {
      const res = await chatAPI.getHistory();
      if (res.data.success) {
        setMessages(res.data.data.messages);
      }
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  }, []);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);

    // Optimistically add user message
    const userMsg = { id: crypto.randomUUID(), role: 'user', content: message, createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await chatAPI.send(message);
      if (res.data.success) {
        const { reply, sources, confidence } = res.data.data;
        const assistantMsg = {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: reply,
          sources,
          confidence,
          createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, assistantMsg]);
        return assistantMsg;
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send message');
      // Remove optimistic message on failure
      setMessages((prev) => prev.filter((m) => m.id !== userMsg.id));
    } finally {
      setLoading(false);
    }
  }, []);

  return { messages, loading, error, sendMessage, loadHistory, setMessages };
}
