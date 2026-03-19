/**
 * @module controllers/userController
 * @description Handles user profile retrieval and persona assignment.
 */

const localStore = require('../data/localStore');

async function getProfile(req, res) {
  try {
    const profile = localStore.getUserProfile(req.user.id);

    if (!profile) {
      return res.status(404).json({ success: false, data: null, error: 'User not found.' });
    }

    res.json({
      success: true,
      data: profile,
      error: null,
    });
  } catch (err) {
    console.error('[UserController] Get profile error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to retrieve profile.' });
  }
}

async function updatePersona(req, res) {
  try {
    const { personaId } = req.body;

    if (!personaId) {
      return res.status(400).json({ success: false, data: null, error: 'personaId is required.' });
    }

    const persona = localStore.getPersonaById(personaId);
    if (!persona) {
      return res.status(404).json({ success: false, data: null, error: 'Persona not found.' });
    }

    const updatedUser = localStore.updateUserPersona(req.user.id, personaId);
    if (!updatedUser) {
      return res.status(404).json({ success: false, data: null, error: 'User not found.' });
    }

    localStore.logProgress(req.user.id, 'persona_changed', { new_persona: persona.name });

    res.json({
      success: true,
      data: {
        persona: {
          id: persona.id,
          name: persona.name,
          role: persona.role,
          experienceLevel: persona.experienceLevel,
          onboardingFocus: persona.onboardingFocus,
          learningObjectives: persona.learningObjectives,
        },
      },
      error: null,
    });
  } catch (err) {
    console.error('[UserController] Update persona error:', err.message);
    res.status(500).json({ success: false, data: null, error: 'Failed to update persona.' });
  }
}

module.exports = { getProfile, updatePersona };
