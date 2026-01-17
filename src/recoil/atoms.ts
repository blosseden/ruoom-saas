import type {
  AuthSession,
  OnboardingStatus,
  Tenant,
  User,
} from '@/types/kr-platform';
import { atom } from 'recoil';

/**
 * User State
 */
export const userState = atom<User | null>({
  key: 'userState',
  default: null,
});

/**
 * Auth Session State
 */
export const authSessionState = atom<AuthSession>({
  key: 'authSessionState',
  default: {
    user: null,
    accessToken: null,
    refreshToken: null,
    expiresAt: null,
  },
});

/**
 * Current Tenant State (for business users)
 */
export const currentTenantState = atom<Tenant | null>({
  key: 'currentTenantState',
  default: null,
});

/**
 * Onboarding Status State
 */
export const onboardingStatusState = atom<OnboardingStatus | null>({
  key: 'onboardingStatusState',
  default: null,
});

/**
 * Is Loading State
 */
export const isLoadingState = atom<boolean>({
  key: 'isLoadingState',
  default: false,
});
