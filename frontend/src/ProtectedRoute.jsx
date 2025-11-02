import { Navigate } from "react-router-dom";

// ProtectedRoute now supports role-based access via `allowedRoles` prop.
// Usage: <ProtectedRoute user={user} allowedRoles={["ADMIN"]}>...</ProtectedRoute>
export default function ProtectedRoute({ user, children, allowedRoles }) {
  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    // user.role should be provided by the backend UserSerializer
    if (!user.role || !allowedRoles.includes(user.role)) {
      // not authorized — redirect to home or a dedicated unauthorized page
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
