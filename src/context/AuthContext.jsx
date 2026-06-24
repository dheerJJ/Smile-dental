import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  registerUser,
  loginUser,
  setCurrentUser,
  getCurrentUser,
  logoutUser,
} from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getCurrentUser());

  const register = useCallback(({ name, email, phone, password }) => {
    const result = registerUser({ name, email, phone, password });
    if (result.success) {
      setCurrentUser(result.user);
      setUser(result.user);
    }
    return result;
  }, []);

  const login = useCallback((email, password) => {
    const result = loginUser(email, password);
    if (result.success) {
      setCurrentUser(result.user);
      setUser(result.user);
    }
    return result;
  }, []);

  const logout = useCallback(() => {
    logoutUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
