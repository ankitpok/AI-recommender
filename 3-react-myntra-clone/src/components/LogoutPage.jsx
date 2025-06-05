import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { useEffect } from "react";

const LogOut = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        await logout();
        // Success - redirect after slight delay
        setTimeout(() => navigate('/', { replace: true }), 500);
      } catch (error) {
        // Even if API fails, ensure local logout
        setTimeout(() => navigate('/', { replace: true }), 500);

      } finally {
        window.location.href = '/';
      }
    };
    performLogout();
  }, [logout, navigate]);

  return <div className="logout-message">Logging out...</div>;
};
export default LogOut;