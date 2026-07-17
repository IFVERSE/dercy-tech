import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, adminOnly }) {
  const { user, loading } = useAuth();

  // Still checking if user is logged in
  if (loading) {
    return (
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        height: "100vh", background: "var(--bg)",
      }}>
        <div style={{
          width: 40, height: 40,
          border: "3px solid var(--border)",
          borderTopColor: "var(--primary)",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Not logged in — go to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin — go home
  if (adminOnly && !user.is_admin) {
    return <Navigate to="/" replace />;
  }

  // All good — show the page
  return children;
}