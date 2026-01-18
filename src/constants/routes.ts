/**
 * Application Routes
 */

export const ROUTES = {
  // Auth Routes
  AUTH: {
    SIGN_IN: '/auth/signin',
    SIGN_UP: '/auth/signup',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CALLBACK: '/auth/callback',
  },

  // Onboarding Routes
  ONBOARDING: {
    ROOT: '/onboarding',
    STEP_1: '/onboarding/step-1', // User Type Selection
    STEP_2: '/onboarding/step-2', // Business Info
    STEP_3: '/onboarding/step-3', // Template Selection
    STEP_4: '/onboarding/step-4', // Space Creation
    COMPLETE: '/onboarding/complete',
  },

  // Business Dashboard Routes (사업자/기업 사용자)
  BUSINESS: {
    ROOT: '/business',
    DASHBOARD: '/business/dashboard',
    CALENDAR: '/business/calendar',
    BOOKINGS: '/business/bookings',
    CUSTOMERS: '/business/customers',
    STAFF: '/business/staff',
    PAYMENTS: '/business/payments',
    CHAT: '/business/chat',
    SETTINGS: '/business/settings',
    WEBSITE: '/business/website',
    ANALYTICS: '/business/analytics',
    INTEGRATIONS: '/business/integrations',
  },

  // Public Website Routes (테넌트별 공개 사이트)
  PUBLIC: {
    HOME: '/:tenantSlug',
    ABOUT: '/:tenantSlug/about',
    SERVICES: '/:tenantSlug/services',
    BOOKING: '/:tenantSlug/booking',
    CONTACT: '/:tenantSlug/contact',
    MY_PAGE: '/:tenantSlug/mypage',
  },

  // Customer Routes (개인 사용자)
  CUSTOMER: {
    MY_PAGE: '/mypage',
    BOOKINGS: '/mypage/bookings',
    PAYMENTS: '/mypage/payments',
    PROFILE: '/mypage/profile',
  },

  // Root
  ROOT: '/',
  NOT_FOUND: '/404',
} as const;
