/**
 * @module services/embeddingService
 * @description Lightweight token-based document search for offline demo mode.
 * NOTE: Despite the name, this does NOT use vector embeddings or semantic similarity.
 * All search is done via token matching in localStore.searchDocuments().
 * To enable real vector search, replace searchDocuments() with calls to an
 * embedding provider (e.g. OpenAI text-embedding-3-small) and a vector store.
 */

const localStore = require('../data/localStore');

// No-op: real embeddings not implemented in demo mode
async function generateEmbedding() {
  return [];
}

async function searchDocuments(queryText, limit = 5) {
  try {
    return localStore.searchDocuments(queryText, limit);
  } catch (err) {
    console.error('[EmbeddingService] Error searching documents:', err.message);
    return fallbackTextSearch(queryText, limit);
  }
}

async function fallbackTextSearch(queryText, limit = 5) {
  try {
    return localStore.searchDocuments(queryText, limit);
  } catch (err) {
    console.error('[EmbeddingService] Fallback search failed:', err.message);
    return [];
  }
}

// No-ops: embedding indexing not implemented in demo mode
async function embedDocument() { return; }
async function embedAllDocuments() { return localStore.getDocuments().length; }

module.exports = {
  generateEmbedding,
  searchDocuments,
  fallbackTextSearch,
  embedDocument,
  embedAllDocuments,
};
