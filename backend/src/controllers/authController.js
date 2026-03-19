/**
 * @module controllers/authController
 * @description Handles user registration and login against the local demo store.
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const localStore = require('../data/localStore');

function formatErrorMessage(err) {
  if (!err) {
    return 'Unknown error';
  }

  if (typeof err.message === 'string' && err.message.trim()) {
    return err.message;
  }

  if (Array.isArray(err.errors) && err.errors.length > 0) {
    const nestedMessages = err.errors
      .map((nestedError) => nestedError?.message)
      .filter((message) => typeof message === 'string' && message.trim());

    if (nestedMessages.length > 0) {
      return nestedMessages.join(' | ');
    }
  }

  return 'Unknown error';
}

async function autoMatchPersona(role, experienceLevel, techStack) {
  let bestMatch = null;
  let bestScore = -1;
  let matchReason = '';

  for (const persona of localStore.listPersonas()) {
    let score = 0;
    const reasons = [];

    if (persona.role.toLowerCase() === String(role).toLowerCase()) {
      score += 3;
      reasons.push(`Role match: ${role}`);
    }

    if (persona.experienceLevel.toLowerCase() === String(experienceLevel).toLowerCase()) {
      score += 2;
      reasons.push(`Experience match: ${experienceLevel}`);
    }

    const personaTech = Array.isArray(persona.techStack) ? persona.techStack : [];
    const userTechLower = (techStack || []).map((item) => item.toLowerCase());
    const overlap = personaTech.filter((item) => userTechLower.includes(item.toLowerCase()));
    score += overlap.length;

    if (overlap.length > 0) {
      reasons.push(`Tech overlap: ${overlap.join(', ')}`);
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = persona;
      matchReason = reasons.join(' | ');
    }
  }

  return { persona: bestMatch, matchReason };
}

async function register(req, res) {
  try {
    const { email, name, password, role, experienceLevel, techStack, team } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Email, name, and password are required.',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Password must be at least 6 characters.',
      });
    }

    if (localStore.getUserByEmail(email)) {
      return res.status(409).json({
        success: false,
        data: null,
        error: 'An account with this email already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const userRole = role || 'developer';
    const userExpLevel = experienceLevel || 'junior';
    const userTechStack = Array.isArray(techStack) ? techStack : [];
    const { persona, matchReason } = await autoMatchPersona(userRole, userExpLevel, userTechStack);

    const user = localStore.createUser({
      email,
      name,
      passwordHash,
      role: userRole,
      experienceLevel: userExpLevel,
      techStack: userTechStack,
      team: team || null,
      personaId: persona ? persona.id : null,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          experienceLevel: user.experienceLevel,
          techStack: user.techStack,
          team: user.team,
          createdAt: user.createdAt,
        },
        persona: persona
          ? {
              id: persona.id,
              name: persona.name,
              role: persona.role,
              experienceLevel: persona.experienceLevel,
              onboardingFocus: persona.onboardingFocus,
              learningObjectives: persona.learningObjectives,
              matchReason,
            }
          : null,
      },
      error: null,
    });
  } catch (err) {
    const errorMessage = formatErrorMessage(err);
    console.error('[AuthController] Registration error:', errorMessage, err.stack);
    res.status(500).json({
      success: false,
      data: null,
      error: process.env.NODE_ENV === 'development'
        ? `Registration failed: ${errorMessage}`
        : 'Registration failed. Please try again.',
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        data: null,
        error: 'Email and password are required.',
      });
    }

    const user = localStore.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Invalid email or password.',
      });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      return res.status(401).json({
        success: false,
        data: null,
        error: 'Invalid email or password.',
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    localStore.logProgress(user.id, 'login', { timestamp: new Date().toISOString() });
    const profile = localStore.getUserProfile(user.id);

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          role: profile.role,
          experienceLevel: profile.experienceLevel,
          techStack: profile.techStack,
          team: profile.team,
          createdAt: profile.createdAt,
        },
        persona: profile.persona,
      },
      error: null,
    });
  } catch (err) {
    const errorMessage = formatErrorMessage(err);
    console.error('[AuthController] Login error:', errorMessage);
    res.status(500).json({
      success: false,
      data: null,
      error: process.env.NODE_ENV === 'development'
        ? `Login failed: ${errorMessage}`
        : 'Login failed. Please try again.',
    });
  }
}

module.exports = { register, login };
