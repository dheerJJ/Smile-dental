// ============================================================
// SmileCare Auth Utility — localStorage-based user accounts
// ============================================================

const USERS_KEY = 'smilecare_users';
const SESSION_KEY = 'smilecare_current_user';

// Simple encode — not cryptographic, suitable for demo/local use
const encodePassword = (password) => btoa(password + '_smilecare_salt');

// ── Read / Write helpers ──────────────────────────────────────

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// ── Public API ────────────────────────────────────────────────

/**
 * Register a new user.
 * Returns { success: true, user } or { success: false, error: string }
 */
export const registerUser = ({ name, email, phone, password }) => {
  const users = getUsers();

  if (!name.trim() || !email.trim() || !phone.trim() || !password) {
    return { success: false, error: 'All fields are required.' };
  }

  const emailLower = email.toLowerCase().trim();
  if (users.find((u) => u.email === emailLower)) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const newUser = {
    id: 'user-' + Date.now(),
    name: name.trim(),
    email: emailLower,
    phone: phone.trim(),
    passwordHash: encodePassword(password),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Return user without the hash
  const { passwordHash, ...safeUser } = newUser;
  return { success: true, user: safeUser };
};

/**
 * Attempt to log in.
 * Returns { success: true, user } or { success: false, error: string }
 */
export const loginUser = (email, password) => {
  const users = getUsers();
  const emailLower = email.toLowerCase().trim();
  const user = users.find((u) => u.email === emailLower);

  if (!user) {
    return { success: false, error: 'No account found with this email.' };
  }

  if (user.passwordHash !== encodePassword(password)) {
    return { success: false, error: 'Incorrect password. Please try again.' };
  }

  const { passwordHash, ...safeUser } = user;
  return { success: true, user: safeUser };
};

/**
 * Persist a session (survives page refresh).
 */
export const setCurrentUser = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

/**
 * Retrieve the current session user.
 */
export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
};

/**
 * Clear the session (logout).
 */
export const logoutUser = () => {
  localStorage.removeItem(SESSION_KEY);
};
