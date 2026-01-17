import {
  getCurrentUser,
  isAuthenticated,
  mockOAuthSignIn,
  mockSignIn,
  mockSignOut,
  mockSignUp,
} from '@/mocks/auth';
import type { SignInData, SignUpData } from '@/types/kr-platform';

/**
 * Mock Supabase Auth (Supabase 대신 사용)
 */
export const mockAuth = {
  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string, metadata?: object) => {
    try {
      const meta = metadata as Record<string, unknown> | undefined;
      const signUpData: SignUpData = {
        email,
        password,
        firstName: (meta?.firstName as string) || 'User',
        lastName: meta?.lastName as string | undefined,
        phone: meta?.phone as string | undefined,
        userType:
          (meta?.userType as 'individual' | 'business' | 'enterprise') ||
          'individual',
      };

      const result = await mockSignUp(signUpData);

      return {
        data: {
          user: {
            ...result.user,
            user_metadata: metadata,
          },
        },
        error: null,
      };
    } catch (error) {
      return {
        data: { user: null },
        error: { message: (error as Error).message },
      };
    }
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    try {
      const signInData: SignInData = { email, password };
      const result = await mockSignIn(signInData);

      if (!result) {
        return {
          data: { user: null },
          error: { message: '로그인 실패' },
        };
      }

      return {
        data: {
          user: {
            ...result.user,
            user_metadata: {
              userType: result.user.userType,
            },
          },
        },
        error: null,
      };
    } catch (error) {
      return {
        data: { user: null },
        error: { message: (error as Error).message },
      };
    }
  },

  /**
   * Sign in with OAuth (Mock)
   */
  signInWithOAuth: async (
    provider: 'kakao' | 'google' | 'github' | 'azure',
  ) => {
    try {
      const result = await mockOAuthSignIn(
        provider as 'kakao' | 'google' | 'naver',
      );

      return {
        data: {
          user: {
            ...result.user,
            user_metadata: {
              userType: result.user.userType,
            },
          },
        },
        error: null,
      };
    } catch (error) {
      return {
        data: { user: null },
        error: { message: (error as Error).message },
      };
    }
  },

  /**
   * Sign out
   */
  signOut: async () => {
    await mockSignOut();
    return { error: null };
  },

  /**
   * Get current session
   */
  getSession: async () => {
    if (!isAuthenticated()) {
      return { data: { session: null }, error: null };
    }

    const user = getCurrentUser();
    return {
      data: {
        session: {
          user,
          access_token: localStorage.getItem('mock_access_token'),
        },
      },
      error: null,
    };
  },

  /**
   * Get current user
   */
  getUser: async () => {
    const user = getCurrentUser();
    return user;
  },

  /**
   * Listen to auth state changes (Mock)
   */
  onAuthStateChange: () => {
    // Mock implementation
    // In a real app, this would listen to storage changes
    return {
      data: { subscription: { unsubscribe: () => {} } },
    };
  },
};

/**
 * Export mock auth as default to replace supabase auth
 */
export const auth = mockAuth;
