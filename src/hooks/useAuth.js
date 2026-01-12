// src/hooks/useAuth.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage('admin_user', null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const userData = {
          id: '1',
          email,
          name: 'Admin User',
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email)}&background=3b82f6&color=fff`,
        };
        setUser(userData);
        resolve({ success: true, data: userData });
      }, 1000);
    });
  };

  const signup = async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          id: Date.now().toString(),
          ...userData,
          role: 'admin',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name)}&background=3b82f6&color=fff`,
        };
        setUser(newUser);
        resolve({ success: true, data: newUser });
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};