import API from './utils/api';
import React, { createContext, useEffect, useState, useContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("isAuthenticated") === "true");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
  }, [isAuthenticated]);

  const getCSRFToken = async () => {
    await API.get('/sanctum/csrf-cookie');
  };

  const signup = async (username, email, password) => {
    try {
      await getCSRFToken();
      const response = await API.post('/api/register', {
        name: username,
        email: email,
        password: password,
        password_confirmation: password, // TODO: VIGNESH We should ask this separately
      });

      if (response.status >= 200 && response.status < 300) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await getCSRFToken();
      const response = await API.post('/api/login', {
        email: email,
        password: password,
      });

      if (response.status >= 200 && response.status < 300) {
        setIsAuthenticated(true);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    await API.post('/api/logout');
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
