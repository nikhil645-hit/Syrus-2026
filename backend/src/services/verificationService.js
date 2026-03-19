/**
 * @module services/verificationService
 * @description Handles all task verification logic. Each verification_type maps
 * to a handler function that inspects the user-submitted evidence and returns
 * { success, message, details }.
 */

/**
 * Main verification dispatcher. Routes to the appropriate handler
 * based on the task's verification_type.
 *
 * @param {string} verificationType - The type of verification to perform
 * @param {string} evidence - User-submitted evidence string
 * @param {Object} params - Task-specific verification parameters from verification_params JSONB
 * @returns {{success: boolean, message: string, details: string}}
 */
function verify(verificationType, evidence, params = {}) {
  if (!evidence || evidence.trim().length === 0) {
    return {
      success: false,
      message: 'No evidence provided. Please submit the required output.',
      details: 'Empty evidence string.',
    };
  }

  const normalized = evidence.trim().toLowerCase();

  const handlers = {
    node_version: () => verifyNodeVersion(normalized, params),
    python_version: () => verifyPythonVersion(normalized, params),
    docker_running: () => verifyDockerRunning(normalized),
    pnpm_installed: () => verifyPnpmInstalled(normalized),
    repo_cloned: () => verifyRepoCloned(normalized),
    env_configured: () => verifyEnvConfigured(normalized, params),
    service_running: () => verifyServiceRunning(normalized, params),
    tests_passing: () => verifyTestsPassing(normalized),
    text_confirmation: () => verifyTextConfirmation(normalized),
  };

  const handler = handlers[verificationType];
  if (!handler) {
    return {
      success: false,
      message: `Unknown verification type: ${verificationType}`,
      details: `No handler for verification type "${verificationType}".`,
    };
  }

  return handler();
}

/**
 * Verify Node.js version meets the minimum requirement.
 * Extracts semver from evidence and compares against minVersion in params.
 * @param {string} evidence - Lowercased evidence string
 * @param {Object} params - Expected: { minVersion: "18.0.0" }
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyNodeVersion(evidence, params) {
  const versionMatch = evidence.match(/v?(\d+)\.(\d+)\.(\d+)/);
  if (!versionMatch) {
    return {
      success: false,
      message: 'Could not find a valid Node.js version in your evidence. Please paste the output of `node --version`.',
      details: `No semver pattern found in: "${evidence}"`,
    };
  }

  const major = parseInt(versionMatch[1]);
  const minor = parseInt(versionMatch[2]);
  const patch = parseInt(versionMatch[3]);

  const minVersion = params.minVersion || '18.0.0';
  const [minMajor, minMinor, minPatch] = minVersion.split('.').map(Number);

  const isValid =
    major > minMajor ||
    (major === minMajor && minor > minMinor) ||
    (major === minMajor && minor === minMinor && patch >= minPatch);

  if (isValid) {
    return {
      success: true,
      message: `✅ Node.js v${major}.${minor}.${patch} detected — meets the v${minVersion}+ requirement.`,
      details: `Detected: ${major}.${minor}.${patch}, Required: >=${minVersion}`,
    };
  }

  return {
    success: false,
    message: `❌ Node.js v${major}.${minor}.${patch} is below the required v${minVersion}. Please upgrade using: nvm install ${minMajor} && nvm use ${minMajor}`,
    details: `Detected: ${major}.${minor}.${patch}, Required: >=${minVersion}`,
  };
}

/**
 * Verify Python version meets minimum 3.9 requirement.
 * @param {string} evidence - Lowercased evidence string
 * @param {Object} params - Expected: { minVersion: "3.9" }
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyPythonVersion(evidence, params) {
  const versionMatch = evidence.match(/python\s*(\d+)\.(\d+)(?:\.(\d+))?/i) ||
                        evidence.match(/(\d+)\.(\d+)(?:\.(\d+))?/);
  if (!versionMatch) {
    return {
      success: false,
      message: 'Could not find a valid Python version. Please paste the output of `python --version`.',
      details: `No version pattern found in: "${evidence}"`,
    };
  }

  const major = parseInt(versionMatch[1]);
  const minor = parseInt(versionMatch[2]);

  const minVersion = params.minVersion || '3.9';
  const [minMajor, minMinor] = minVersion.split('.').map(Number);

  const isValid = major > minMajor || (major === minMajor && minor >= minMinor);

  if (isValid) {
    return {
      success: true,
      message: `✅ Python ${major}.${minor} detected — meets the ${minVersion}+ requirement.`,
      details: `Detected: ${major}.${minor}, Required: >=${minVersion}`,
    };
  }

  return {
    success: false,
    message: `❌ Python ${major}.${minor} is below the required ${minVersion}. Please upgrade using pyenv.`,
    details: `Detected: ${major}.${minor}, Required: >=${minVersion}`,
  };
}

/**
 * Check if Docker is running based on evidence text.
 * @param {string} evidence - Lowercased evidence string
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyDockerRunning(evidence) {
  const dockerIndicators = [
    'docker version',
    'docker desktop',
    'docker engine',
    'server: docker',
    'docker is running',
    'api version',
    'docker compose version',
    'docker-compose version',
  ];

  const isRunning = dockerIndicators.some((indicator) => evidence.includes(indicator));

  if (isRunning) {
    return {
      success: true,
      message: '✅ Docker is installed and running. Good to go!',
      details: 'Docker indicators found in evidence.',
    };
  }

  return {
    success: false,
    message: '❌ Could not confirm Docker is running. Please paste the output of `docker --version` and ensure Docker Desktop is started.',
    details: 'No Docker indicators found in evidence.',
  };
}

/**
 * Check if pnpm is installed based on evidence text.
 * @param {string} evidence - Lowercased evidence string
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyPnpmInstalled(evidence) {
  const versionMatch = evidence.match(/(\d+)\.(\d+)\.(\d+)/);

  if (versionMatch || evidence.includes('pnpm')) {
    const version = versionMatch ? `${versionMatch[1]}.${versionMatch[2]}.${versionMatch[3]}` : 'detected';
    return {
      success: true,
      message: `✅ pnpm ${version} is installed. You're all set!`,
      details: `pnpm version ${version} found.`,
    };
  }

  return {
    success: false,
    message: '❌ Could not confirm pnpm installation. Please run `npm install -g pnpm` and paste the output of `pnpm --version`.',
    details: 'No pnpm version found in evidence.',
  };
}

/**
 * Check if a repository was cloned successfully.
 * @param {string} evidence - Lowercased evidence string
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyRepoCloned(evidence) {
  const cloneIndicators = [
    'cloning into',
    '.git',
    'package.json',
    'readme',
    'src',
    'node_modules',
    'pnpm-lock',
    'total',
    'receiving objects',
    'resolving deltas',
  ];

  const found = cloneIndicators.filter((ind) => evidence.includes(ind));

  if (found.length >= 2) {
    return {
      success: true,
      message: '✅ Repository cloned successfully! You can now install dependencies.',
      details: `Clone indicators found: ${found.join(', ')}`,
    };
  }

  return {
    success: false,
    message: '❌ Could not confirm the repository was cloned. Please paste the output of `git clone` or `ls -la` in the cloned directory.',
    details: `Only ${found.length} clone indicators found. Need at least 2.`,
  };
}

/**
 * Check that required environment variables are configured.
 * @param {string} evidence - Lowercased evidence string
 * @param {Object} params - Expected: { requiredKeys: ["DATABASE_URL", ...] }
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyEnvConfigured(evidence, params) {
  const requiredKeys = params.requiredKeys || ['DATABASE_URL', 'REDIS_URL', 'API_SECRET_KEY'];
  const foundKeys = [];
  const missingKeys = [];

  for (const key of requiredKeys) {
    if (evidence.includes(key.toLowerCase())) {
      foundKeys.push(key);
    } else {
      missingKeys.push(key);
    }
  }

  if (missingKeys.length === 0) {
    return {
      success: true,
      message: `✅ All required environment variables are configured: ${foundKeys.join(', ')}`,
      details: `All ${requiredKeys.length} required keys found.`,
    };
  }

  return {
    success: false,
    message: `❌ Missing environment variables: ${missingKeys.join(', ')}. Please add them to your .env.local file.`,
    details: `Found: ${foundKeys.join(', ')}. Missing: ${missingKeys.join(', ')}`,
  };
}

/**
 * Check that a service is running on the expected port.
 * @param {string} evidence - Lowercased evidence string
 * @param {Object} params - Expected: { expectedPort: 3000 }
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyServiceRunning(evidence, params) {
  const runningIndicators = [
    'listening on port',
    'server started',
    'server running',
    'started on port',
    'ready on',
    'http://localhost',
    'application started',
    'listening at',
  ];

  const isRunning = runningIndicators.some((ind) => evidence.includes(ind));
  const port = params.expectedPort || 3000;
  const hasPort = evidence.includes(String(port));

  if (isRunning) {
    return {
      success: true,
      message: `✅ Service is running${hasPort ? ` on port ${port}` : ''}. Well done!`,
      details: `Server running indicators found. Port ${port} ${hasPort ? 'confirmed' : 'not explicitly found but server appears running'}.`,
    };
  }

  return {
    success: false,
    message: `❌ Could not confirm the service is running. Make sure Docker containers are up and run \`pnpm run dev\`. Paste the terminal output.`,
    details: 'No server running indicators found in evidence.',
  };
}

/**
 * Check that tests are passing based on test output.
 * @param {string} evidence - Lowercased evidence string
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyTestsPassing(evidence) {
  const hasFailures =
    evidence.includes('failed') ||
    evidence.includes('failure') ||
    /\b\d+\s+failing\b/.test(evidence) ||
    /tests?:\s*\d+\s+failed/.test(evidence);

  const hasPassed =
    evidence.includes('passed') ||
    evidence.includes('passing') ||
    evidence.includes('tests passed') ||
    evidence.includes('test suites: 0 failed') ||
    evidence.includes('all tests passed');

  if (hasPassed && !hasFailures) {
    return {
      success: true,
      message: '✅ All tests are passing! Great work.',
      details: 'Test passing indicators found with no failure indicators.',
    };
  }

  if (hasFailures) {
    return {
      success: false,
      message: '❌ Some tests are failing. Review the test output for failures and fix them before proceeding. Run `pnpm run test` again after fixing.',
      details: 'Failure indicators found in test output.',
    };
  }

  return {
    success: false,
    message: '❌ Could not determine test results. Please paste the full output of `pnpm run test`.',
    details: 'No clear pass/fail indicators in evidence.',
  };
}

/**
 * Simple text confirmation check — user types "done", "completed", "yes", etc.
 * @param {string} evidence - Lowercased evidence string
 * @returns {{success: boolean, message: string, details: string}}
 */
function verifyTextConfirmation(evidence) {
  const confirmations = ['done', 'completed', 'yes', 'confirmed', 'finished', 'complete'];

  const hasKeyword = confirmations.some((c) => evidence.includes(c));
  const hasMinLength = evidence.trim().length >= 20;

  if (hasKeyword && hasMinLength) {
    return {
      success: true,
      message: '✅ Task confirmed as completed. Moving on!',
      details: 'Text confirmation received.',
    };
  }

  if (hasKeyword && !hasMinLength) {
    return {
      success: false,
      message: 'Please provide a brief description of what you did (at least 20 characters), e.g. "Completed — I read through the onboarding docs."',
      details: 'Confirmation keyword found but description is too short.',
    };
  }

  return {
    success: false,
    message: 'Please confirm completion by writing what you did, e.g. "Done — I finished setting up the repository."',
    details: 'No confirmation keywords found in evidence.',
  };
}

module.exports = { verify };
