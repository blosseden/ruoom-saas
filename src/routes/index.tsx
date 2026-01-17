import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ROUTES } from '@/constants/routes';
import { getCurrentUser, isAuthenticated } from '@/mocks/auth';

// Lazy load features for code splitting
const SignIn = lazy(() => import('@/features/auth/SignIn'));
const SignUp = lazy(() => import('@/features/auth/SignUp'));
const OnboardingWizard = lazy(() => import('@/features/onboarding'));
const BusinessDashboard = lazy(() => import('@/features/dashboard'));
const BusinessCalendar = lazy(() => import('@/features/calendar'));
const PublicWebsite = lazy(() => import('@/features/public'));

// Loading fallback component
const LoadingFallback: FC = () => (
  <div className="d-flex align-items-center justify-content-center min-vh-100">
    <div className="text-center">
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <p className="mt-4">Loading...</p>
    </div>
  </div>
);

/**
 * Root redirect based on auth state
 */
const RootRedirect: FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  const user = getCurrentUser();
  if (!user) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  // Redirect based on user type
  if (user.userType === 'business' || user.userType === 'enterprise') {
    return <Navigate to={ROUTES.BUSINESS.DASHBOARD} replace />;
  }

  return <Navigate to={ROUTES.CUSTOMER.MY_PAGE} replace />;
};

/**
 * Main App Router
 */
export const AppRouter: FC = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* Root - redirect based on auth state */}
        <Route path={ROUTES.ROOT} element={<RootRedirect />} />

        {/* Auth Routes (public) */}
        <Route path={ROUTES.AUTH.SIGN_IN} element={<SignIn />} />
        <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUp />} />

        {/* Onboarding Routes (protected) */}
        <Route
          path={`${ROUTES.ONBOARDING.ROOT}/*`}
          element={
            <ProtectedRoute>
              <OnboardingWizard />
            </ProtectedRoute>
          }
        />

        {/* Business Routes (protected) */}
        <Route
          path={ROUTES.BUSINESS.DASHBOARD}
          element={
            <ProtectedRoute>
              <BusinessDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.CALENDAR}
          element={
            <ProtectedRoute>
              <BusinessCalendar />
            </ProtectedRoute>
          }
        />

        {/* Public Website Routes (tenant-specific) */}
        <Route path={ROUTES.PUBLIC.HOME} element={<PublicWebsite />} />

        {/* 404 - redirect to root */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Suspense>
  );
};
