import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const userSignIn = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/user/signin', { email, password });
      const user = { ...response.data, role: 'user' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Sign in failed' };
    }
  };

  const adminSignIn = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/admin/signin', { email, password });
      const admin = { ...response.data, role: 'admin' };
      localStorage.setItem('currentUser', JSON.stringify(admin));
      setCurrentUser(admin);
      return { success: true, user: admin };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Admin sign in failed' };
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await axios.post('/api/auth/signup', userData);
      const user = { ...response.data, role: 'user' };
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Sign up failed' };
    }
  };

  const signOut = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    userSignIn,
    adminSignIn,
    signUp,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}