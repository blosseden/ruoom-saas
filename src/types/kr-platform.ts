/**
 * KR Platform Types (AIOSS)
 * Based on new-platform.md specifications
 */

// ============================================
// User & Tenant Types
// ============================================

export type UserType = 'individual' | 'business' | 'enterprise';

export type UserRole = 'owner' | 'staff' | 'customer' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  userType: UserType;
  profileImageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Tenant {
  id: string;
  name: string;
  slug: string; // for URL: /{tenantSlug}
  businessProfile?: BusinessProfile;
  createdAt: string;
  updatedAt: string;
}

export interface UserTenantRole {
  id: string;
  userId: string;
  tenantId: string;
  role: UserRole;
  permissions?: string[];
  createdAt: string;
}

// ============================================
// Business Profile Types
// ============================================

export interface BusinessProfile {
  id: string;
  tenantId: string;
  businessName: string;
  category: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  operatingHours?: OperatingHours;
  bookingPolicy?: BookingPolicy;
  refundPolicy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OperatingHours {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
}

export interface TimeRange {
  open: string; // "09:00"
  close: string; // "18:00"
}

export interface BookingPolicy {
  bookingUnit: number; // 30, 60 (minutes)
  cancellationPolicy: string;
  bookingPeriod: number; // days in advance
  requiresPayment: boolean;
}

// ============================================
// Template Types
// ============================================

export interface Template {
  id: string;
  name: string;
  category: string;
  description?: string;
  thumbnailUrl?: string;
  sections: TemplateSection[];
  createdAt: string;
  updatedAt: string;
}

export interface TemplateSection {
  id: string;
  type: 'hero' | 'about' | 'services' | 'location' | 'contact' | 'booking';
  title: string;
  content?: Record<string, unknown>;
  order: number;
}

// ============================================
// Space & Website Types
// ============================================

export interface Space {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  templateId?: string;
  settings?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Website {
  id: string;
  tenantId: string;
  spaceId?: string;
  domain?: string; // custom subdomain
  theme: WebsiteTheme;
  pages: WebsitePage[];
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WebsiteTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  buttonColor: string;
  buttonTextColor: string;
}

export interface WebsitePage {
  id: string;
  websiteId: string;
  slug: string;
  title: string;
  sections: WebsiteSection[];
  order: number;
}

export interface WebsiteSection {
  id: string;
  type: string;
  title?: string;
  content: Record<string, unknown>;
  order: number;
}

// ============================================
// Calendar & Booking Types
// ============================================

export interface Calendar {
  id: string;
  tenantId: string;
  name: string;
  type: string; // "appointment", "class", "resource"
  description?: string;
  color?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  calendarId: string;
  tenantId: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  staffId?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  eventId?: string;
  calendarId: string;
  tenantId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  paymentId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show';

// ============================================
// Payment Types
// ============================================

export interface Payment {
  id: string;
  bookingId: string;
  tenantId: string;
  customerId: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  paymentMethod?: string;
  paymentProvider?: string;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}

export type PaymentStatus =
  | 'pending'
  | 'completed'
  | 'failed'
  | 'refunded'
  | 'cancelled';

// ============================================
// Customer & Staff Types
// ============================================

export interface CustomerProfile {
  id: string;
  userId: string;
  tenantId: string;
  notes?: string;
  tags?: string[];
  totalBookings: number;
  totalSpent: number;
  lastVisit?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaffProfile {
  id: string;
  userId: string;
  tenantId: string;
  role: string;
  permissions: string[];
  assignedLocations?: string[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// Chat Types
// ============================================

export interface ChatThread {
  id: string;
  bookingId: string;
  tenantId: string;
  participants: string[]; // user IDs
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  senderId: string;
  senderName: string;
  message: string;
  createdAt: string;
}

// ============================================
// Integration Types
// ============================================

export interface IntegrationConnection {
  id: string;
  tenantId: string;
  provider: IntegrationProvider;
  type: IntegrationType;
  credentials: Record<string, unknown>;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IntegrationProvider =
  | 'google'
  | 'naver'
  | 'kakao'
  | 'outlook'
  | 'channeltalk'
  | 'happytalk'
  | 'hubspot';

export type IntegrationType = 'oauth' | 'calendar' | 'chatbot' | 'payment';

// ============================================
// Dashboard Types
// ============================================

export interface DashboardWidget {
  id: string;
  tenantId: string;
  type: WidgetType;
  title: string;
  position: WidgetPosition;
  settings?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export type WidgetType =
  | 'bookings_today'
  | 'revenue'
  | 'new_customers'
  | 'cancellation_rate'
  | 'no_show_rate'
  | 'chat_messages';

export interface WidgetPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

// ============================================
// Onboarding Types
// ============================================

export interface OnboardingStatus {
  userId: string;
  tenantId?: string;
  currentStep: number;
  completedSteps: string[];
  isCompleted: boolean;
  data?: Record<string, unknown>;
  updatedAt: string;
}

// ============================================
// Auth Types
// ============================================

export interface AuthSession {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName?: string;
  phone?: string;
  userType: UserType;
}

export interface SignInData {
  email: string;
  password: string;
}
