import { FC, Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from '@/components/ProtectedRoute';
import { ROUTES } from '@/constants/routes';
import { getCurrentUser, isAuthenticated } from '@/mocks/auth';

// Lazy load features for code splitting
const SignIn = lazy(() => import('@/features/auth/SignIn'));
const SignUp = lazy(() => import('@/features/auth/SignUp'));
const ForgotPassword = lazy(() => import('@/features/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('@/features/auth/ResetPassword'));
const OnboardingWizard = lazy(() => import('@/features/onboarding'));
const BusinessDashboard = lazy(() => import('@/features/dashboard'));
const BusinessCalendar = lazy(() => import('@/features/calendar'));
const Customers = lazy(() => import('@/features/customers'));
const CustomerDetail = lazy(() => import('@/features/customers/detail'));
const Spaces = lazy(() => import('@/features/spaces'));
const Bookings = lazy(() => import('@/features/bookings'));
const Settings = lazy(() => import('@/features/settings'));
const WebsiteBuilder = lazy(() => import('@/features/website-builder'));
const ChatbotAdmin = lazy(() => import('@/features/chatbot-admin'));
const Notifications = lazy(() => import('@/features/notifications'));
const Reports = lazy(() => import('@/features/reports'));
const Analytics = lazy(() => import('@/features/analytics'));
const Availability = lazy(() => import('@/features/availability'));
const Booking = lazy(() => import('@/features/booking'));
const CustomerMyPage = lazy(() => import('@/features/customer-mypage'));
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
        <Route
          path={ROUTES.AUTH.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
        <Route path={ROUTES.AUTH.RESET_PASSWORD} element={<ResetPassword />} />

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
        <Route
          path={ROUTES.BUSINESS.CUSTOMERS}
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.CUSTOMER_DETAIL}
          element={
            <ProtectedRoute>
              <CustomerDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.SPACES}
          element={
            <ProtectedRoute>
              <Spaces />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.BOOKINGS}
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.SETTINGS}
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.WEBSITE}
          element={
            <ProtectedRoute>
              <WebsiteBuilder />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.CHAT}
          element={
            <ProtectedRoute>
              <ChatbotAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.ANALYTICS}
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.NOTIFICATIONS}
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path={ROUTES.BUSINESS.REPORTS}
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/business/availability"
          element={
            <ProtectedRoute>
              <Availability />
            </ProtectedRoute>
          }
        />

        {/* Public Website Routes (tenant-specific) */}
        <Route path={ROUTES.PUBLIC.HOME} element={<PublicWebsite />} />
        <Route path={ROUTES.PUBLIC.BOOKING} element={<Booking />} />
        <Route path={ROUTES.PUBLIC.MY_PAGE} element={<CustomerMyPage />} />

        {/* 404 - redirect to root */}
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </Suspense>
  );
};
