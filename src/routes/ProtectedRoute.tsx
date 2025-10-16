import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "@/contexts/AuthContext";
import type { UserRole } from "@/types";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute - Requires authentication
 * Redirects to home page (where LoginModal can be triggered)
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
  redirectTo = "/",
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const location = useLocation();

  if (requireAuth && !isAuthenticated) {
    // Redirect to home but save the attempted url
    // User can login via LoginModal in Navbar
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

interface RoleRouteProps {
  children?: React.ReactNode;
  allowedRoles: UserRole[];
  redirectTo?: string;
}

/**
 * RoleRoute - Requires specific roles
 */
export const RoleRoute: React.FC<RoleRouteProps> = ({
  children,
  allowedRoles,
  redirectTo = "/unauthorized",
}) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const hasAnyRole = useAuthStore((state) => state.hasAnyRole);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!hasAnyRole(allowedRoles)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};
