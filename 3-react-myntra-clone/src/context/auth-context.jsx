import { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await api.get('/api/get_user/');
      setUser(res.data.username ? { username: res.data.username } : null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
    try {
      const csrfResponse = await api.get('/api/csrf/');
      const response = await api.post('/api/receive_items/', { username, password }, {
        headers: { 'X-CSRFToken': csrfResponse.data.csrfToken },
      });

      if (response.data.message === "Login successful") {
        await checkAuth();
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const csrfResponse = await api.get('/api/csrf/');
      await api.post('/api/logout/', {}, {
        headers: { 'X-CSRFToken': csrfResponse.data.csrfToken },
      });
    } catch (error) {
      setUser(null);
      throw error;
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
