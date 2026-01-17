import { FC, ReactElement } from 'react';
import { Navigate } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import { isAuthenticated } from '@/mocks/auth';

interface ProtectedRouteProps {
  children: ReactElement;
}

/**
 * Protected Route Component
 * Redirects to sign-in if user is not authenticated
 */
export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  return children;
};
