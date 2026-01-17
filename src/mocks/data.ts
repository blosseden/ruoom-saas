import type {
  Booking,
  Calendar,
  CustomerProfile,
  Event,
  StaffProfile,
  Tenant,
  User,
} from '@/types/kr-platform';

/**
 * Mock Users
 */
export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'business@test.com',
    firstName: '홍길동',
    lastName: '김',
    phone: '010-1234-5678',
    userType: 'business',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'user-2',
    email: 'customer@test.com',
    firstName: '고객',
    lastName: '테스트',
    phone: '010-9876-5432',
    userType: 'individual',
    createdAt: '2026-01-02T00:00:00Z',
    updatedAt: '2026-01-02T00:00:00Z',
  },
  {
    id: 'user-3',
    email: 'enterprise@test.com',
    firstName: '기업',
    lastName: '관리자',
    phone: '010-5555-6666',
    userType: 'enterprise',
    createdAt: '2026-01-03T00:00:00Z',
    updatedAt: '2026-01-03T00:00:00Z',
  },
];

/**
 * Mock Tenants
 */
export const mockTenants: Tenant[] = [
  {
    id: 'tenant-1',
    name: '홍길동 헬스장',
    slug: 'ruoom-fitness',
    businessProfile: {
      id: 'bp-1',
      tenantId: 'tenant-1',
      businessName: '홍길동 헬스장',
      category: '헬스/피트니스',
      address: '서울시 강남구 테헤란로 123',
      phone: '02-1234-5678',
      email: 'contact@ruoom-fitness.com',
      website: 'https://ruoom-fitness.com',
      operatingHours: {
        monday: { open: '06:00', close: '22:00' },
        tuesday: { open: '06:00', close: '22:00' },
        wednesday: { open: '06:00', close: '22:00' },
        thursday: { open: '06:00', close: '22:00' },
        friday: { open: '06:00', close: '22:00' },
        saturday: { open: '08:00', close: '20:00' },
        sunday: { open: '08:00', close: '18:00' },
      },
      refundPolicy:
        '예약 24시간 전까지 무료 취소 가능합니다. 이후 취소 시 50% 환불됩니다.',
      createdAt: '2026-01-01T00:00:00Z',
      updatedAt: '2026-01-01T00:00:00Z',
    },
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * Mock Calendars
 */
export const mockCalendars: Calendar[] = [
  {
    id: 'cal-1',
    tenantId: 'tenant-1',
    name: '개인 트레이닝',
    type: 'appointment',
    description: '1:1 개인 트레이닝 예약',
    color: '#667eea',
    isPublic: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'cal-2',
    tenantId: 'tenant-1',
    name: '그룹 수업',
    type: 'class',
    description: '그룹 피트니스 클래스',
    color: '#48bb78',
    isPublic: true,
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * Mock Events
 */
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    calendarId: 'cal-1',
    tenantId: 'tenant-1',
    title: '개인 트레이닝 - 김고객',
    description: '1:1 개인 트레이닝',
    startTime: '2026-01-15T10:00:00Z',
    endTime: '2026-01-15T11:00:00Z',
    location: '메인 홀',
    staffId: 'staff-1',
    capacity: 1,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'event-2',
    calendarId: 'cal-2',
    tenantId: 'tenant-1',
    title: '요가 클래스',
    description: '초급자를 위한 요가 클래스',
    startTime: '2026-01-15T14:00:00Z',
    endTime: '2026-01-15T15:00:00Z',
    location: '스튜디오 A',
    staffId: 'staff-2',
    capacity: 20,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'event-3',
    calendarId: 'cal-2',
    tenantId: 'tenant-1',
    title: '필라테스',
    description: '코어 강화 필라테스',
    startTime: '2026-01-16T09:00:00Z',
    endTime: '2026-01-16T10:00:00Z',
    location: '스튜디오 B',
    staffId: 'staff-2',
    capacity: 15,
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
];

/**
 * Mock Bookings
 */
export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    eventId: 'event-1',
    calendarId: 'cal-1',
    tenantId: 'tenant-1',
    customerId: 'user-2',
    customerName: '김고객',
    customerEmail: 'customer@test.com',
    customerPhone: '010-9876-5432',
    startTime: '2026-01-15T10:00:00Z',
    endTime: '2026-01-15T11:00:00Z',
    status: 'confirmed',
    notes: '첫 방문입니다',
    createdAt: '2026-01-10T00:00:00Z',
    updatedAt: '2026-01-10T00:00:00Z',
  },
  {
    id: 'booking-2',
    eventId: 'event-2',
    calendarId: 'cal-2',
    tenantId: 'tenant-1',
    customerId: 'user-2',
    customerName: '김고객',
    customerEmail: 'customer@test.com',
    customerPhone: '010-9876-5432',
    startTime: '2026-01-15T14:00:00Z',
    endTime: '2026-01-15T15:00:00Z',
    status: 'confirmed',
    createdAt: '2026-01-12T00:00:00Z',
    updatedAt: '2026-01-12T00:00:00Z',
  },
  {
    id: 'booking-3',
    eventId: 'event-3',
    calendarId: 'cal-2',
    tenantId: 'tenant-1',
    customerId: 'cust-2',
    customerName: '이손님',
    customerEmail: 'lee@test.com',
    customerPhone: '010-1111-2222',
    startTime: '2026-01-16T09:00:00Z',
    endTime: '2026-01-16T10:00:00Z',
    status: 'pending',
    createdAt: '2026-01-14T00:00:00Z',
    updatedAt: '2026-01-14T00:00:00Z',
  },
];

/**
 * Mock Customer Profiles
 */
export const mockCustomerProfiles: CustomerProfile[] = [
  {
    id: 'cp-1',
    userId: 'user-2',
    tenantId: 'tenant-1',
    notes: '정기 회원',
    tags: ['VIP', '정기회원'],
    totalBookings: 24,
    totalSpent: 1200000,
    lastVisit: '2026-01-14T00:00:00Z',
    createdAt: '2025-07-01T00:00:00Z',
    updatedAt: '2026-01-14T00:00:00Z',
  },
];

/**
 * Mock Staff Profiles
 */
export const mockStaffProfiles: StaffProfile[] = [
  {
    id: 'staff-1',
    userId: 'user-1',
    tenantId: 'tenant-1',
    role: 'owner',
    permissions: ['all'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
  {
    id: 'staff-2',
    userId: 'trainer-1',
    tenantId: 'tenant-1',
    role: 'trainer',
    permissions: ['manage_bookings', 'view_customers'],
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z',
  },
];

/**
 * Mock Dashboard Stats
 */
export const mockDashboardStats = {
  bookingsToday: 24,
  bookingsTodayChange: 12,
  revenueThisMonth: 1250000,
  revenueChange: 8.5,
  newCustomers: 48,
  newCustomersChange: 15,
  averageRating: 4.8,
  ratingChange: 0,
};

/**
 * Mock Recent Bookings
 */
export const mockRecentBookings = [
  {
    id: 'booking-1',
    customerName: 'John Doe',
    service: 'Yoga Class',
    time: '10:00 AM',
    status: 'confirmed' as const,
  },
  {
    id: 'booking-2',
    customerName: 'Jane Smith',
    service: 'Personal Training',
    time: '2:00 PM',
    status: 'pending' as const,
  },
  {
    id: 'booking-3',
    customerName: 'Mike Johnson',
    service: 'Group Class',
    time: '4:00 PM',
    status: 'confirmed' as const,
  },
];

/**
 * Mock Schedule for Today
 */
export const mockTodaySchedule = [
  {
    time: '09:00 - 10:00',
    title: 'Morning Yoga',
    attendees: 12,
  },
  {
    time: '10:30 - 11:30',
    title: 'Personal Training',
    attendees: 1,
  },
  {
    time: '14:00 - 15:00',
    title: 'Group Fitness',
    attendees: 20,
  },
];

/**
 * Mock Activities
 */
export const mockActivities = [
  {
    icon: '✅',
    text: '<strong>John Doe</strong> booked a session',
    time: '5 min ago',
  },
  {
    icon: '💬',
    text: 'New message from <strong>Jane Smith</strong>',
    time: '12 min ago',
  },
  {
    icon: '💳',
    text: 'Payment received from <strong>Mike Johnson</strong>',
    time: '1 hour ago',
  },
];

/**
 * Get user by email (for login)
 */
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find((user) => user.email === email);
};

/**
 * Get tenant by user ID
 */
export const getTenantByUserId = (userId: string): Tenant | undefined => {
  const staff = mockStaffProfiles.find((s) => s.userId === userId);
  if (!staff) return undefined;
  return mockTenants.find((t) => t.id === staff.tenantId);
};

/**
 * Get bookings by tenant ID
 */
export const getBookingsByTenantId = (tenantId: string): Booking[] => {
  return mockBookings.filter((b) => b.tenantId === tenantId);
};

/**
 * Get events by tenant ID
 */
export const getEventsByTenantId = (tenantId: string): Event[] => {
  return mockEvents.filter((e) => e.tenantId === tenantId);
};
