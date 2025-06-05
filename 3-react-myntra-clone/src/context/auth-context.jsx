import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/get_user/', {
        withCredentials: true
      });
      setUser(res.data.username ? { username: res.data.username } : null);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password) => {
  try {
    // 1. First get CSRF token
    const csrfResponse = await axios.get(
      'http://localhost:8000/api/csrf/',
      { withCredentials: true }
    );
    
    // 2. Then login with CSRF token
    const response = await axios.post(
      'http://localhost:8000/api/receive_items/',
      { username, password },
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfResponse.data.csrfToken,
          'Content-Type': 'application/json'
        }
      }
    );

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
    // 1. Get fresh CSRF token
    const csrfResponse = await axios.get(
      'http://localhost:8000/api/csrf/', 
      { withCredentials: true }
    );

    // 2. Send logout request
    await axios.post(
      'http://localhost:8000/api/logout/',
      {}, // Empty payload
      {
        withCredentials: true,
        headers: {
          'X-CSRFToken': csrfResponse.data.csrfToken,
          'Content-Type': 'application/json'
        }
      }
    );
  } catch (error) {
    // Even if request fails, clear local state
    setUser(null);
    throw error; // Re-throw for components to handle
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