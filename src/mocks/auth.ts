import type { SignInData, SignUpData, User } from '@/types/kr-platform';

import { getUserByEmail, mockUsers } from './data';

/**
 * Mock Auth Service (localStorage 기반)
 */

const STORAGE_KEYS = {
  USER: 'mock_user',
  ACCESS_TOKEN: 'mock_access_token',
  REFRESH_TOKEN: 'mock_refresh_token',
};

/**
 * Generate mock token
 */
const generateMockToken = (userId: string): string => {
  return `mock_token_${userId}_${Date.now()}`;
};

/**
 * Mock Sign In
 */
export const mockSignIn = async (
  data: SignInData,
): Promise<{ user: User; accessToken: string } | null> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const user = getUserByEmail(data.email);

  if (!user) {
    throw new Error('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  // Mock password validation (실제로는 항상 성공)
  // 테스트용: password는 "password" 또는 아무거나 입력해도 됨
  if (data.password.length < 6) {
    throw new Error('비밀번호는 최소 6자 이상이어야 합니다.');
  }

  const accessToken = generateMockToken(user.id);
  const refreshToken = generateMockToken(user.id);

  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

  return { user, accessToken };
};

/**
 * Mock Sign Up
 */
export const mockSignUp = async (
  data: SignUpData,
): Promise<{ user: User; accessToken: string }> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Check if email already exists
  const existingUser = getUserByEmail(data.email);
  if (existingUser) {
    throw new Error('이미 사용 중인 이메일입니다.');
  }

  // Create new user
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    userType: data.userType,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Add to mock users (in memory only)
  mockUsers.push(newUser);

  const accessToken = generateMockToken(newUser.id);
  const refreshToken = generateMockToken(newUser.id);

  // Store in localStorage
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(newUser));
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

  return { user: newUser, accessToken };
};

/**
 * Mock Sign Out
 */
export const mockSignOut = async (): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));

  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};

/**
 * Get Current User
 */
export const getCurrentUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEYS.USER);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

/**
 * Get Access Token
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = (): boolean => {
  return !!getAccessToken() && !!getCurrentUser();
};

/**
 * Mock OAuth Sign In
 */
export const mockOAuthSignIn = async (
  provider: 'kakao' | 'google' | 'naver',
): Promise<{ user: User; accessToken: string }> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // For demo, use the first business user for OAuth
  const user = mockUsers.find((u) => u.userType === 'business') || mockUsers[0];

  const accessToken = generateMockToken(user.id);
  const refreshToken = generateMockToken(user.id);

  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);

  console.log(`Mock OAuth login with ${provider}`);

  return { user, accessToken };
};
