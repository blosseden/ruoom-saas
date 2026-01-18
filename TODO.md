# Ruoom KR Platform - TODO Checklist

## Completed ✅

### Infrastructure & Setup
- [x] Project initialization with Vite + React 18 + TypeScript
- [x] Package manager setup (pnpm 9.0.0)
- [x] TypeScript configuration (strict mode)
- [x] Mock data environment setup (localStorage-based auth)
- [x] Route structure with React Router 7

### UI Framework & Styling
- [x] Bootstrap 5.3.3 installation
- [x] React Bootstrap 2.10.5 integration
- [x] PrimeReact 10.8.2 setup
- [x] Dashkit theme integration from S3
- [x] Noto Sans JP font for Korean/CJK support
- [x] Feather Icons integration
- [x] Custom CSS utilities (.or-container, .line-separator, .social-container)

### Authentication (Epic A)
- [x] Mock authentication system with localStorage
- [x] Sign In page (`/src/features/auth/sign-in/index.tsx`)
- [x] Sign Up page (`/src/features/auth/sign-up/index.tsx`)
- [x] User type selection (individual, business, enterprise)
- [x] Protected route component (`/src/components/ProtectedRoute.tsx`)
- [x] Route protection for business dashboard
- [x] Route protection for calendar page
- [x] Smart redirect logic based on user type
- [x] Logout functionality in navbar
- [x] Persistent auth state across page navigation

### Dashboard (Epic E)
- [x] Dashboard page structure (`/src/features/dashboard/index.tsx`)
- [x] Bootstrap navbar with logo
- [x] User name display in navbar
- [x] Logout button with mockSignOut integration
- [x] Dashboard cards layout (Stats, Revenue, Bookings, Customers)
- [x] Recent activity section

### Calendar (Epic D)
- [x] Calendar page structure (`/src/features/calendar/index.tsx`)
- [x] Bootstrap navbar with logo
- [x] User name display in navbar
- [x] Logout button
- [x] Calendar UI with PrimeReact Calendar component

### Public Website (Epic C)
- [x] Public website template (`/src/features/public/index.tsx`)
- [x] Dynamic routing with tenantSlug (`/:tenantSlug`)
- [x] Navigation bar with menu items:
  - [x] About section link
  - [x] Location section link
  - [x] Products section link
  - [x] Services section link
  - [x] Booking section link
- [x] Login button in navbar
- [x] My Page button in navbar
- [x] Hero section with call-to-action
- [x] About section with business description
- [x] Location section with:
  - [x] Address display
  - [x] Phone number
  - [x] Email address
  - [x] Business hours
  - [x] Map placeholder
- [x] Products & Pricing section with cards
- [x] Services section with icons and descriptions
- [x] Booking section with Open Calendar link
- [x] Footer with copyright
- [x] Floating chatbot button
- [x] Chatbot modal with message input
- [x] Bootstrap styling matching customer-frontend

## In Progress 🔄

### Website Customization
- [x] Website builder admin panel design
- [x] Template customization interface (colors, images, text)
- [x] Color theme picker (primary/secondary colors, preset themes)
- [x] Font family selector (Noto Sans JP, Roboto, Open Sans, etc.)
- [x] Layout customization options (section visibility toggles)
- [x] Text content editing (business name, tagline, about, contact info)
- [x] Preview mode (Edit Mode vs Preview Mode)
- [x] Device preview (Desktop vs Mobile)
- [x] Publish/Unpublish functionality
- [x] SEO settings (title, description, keywords)
- [ ] Image upload functionality (mock)
- [ ] Google Maps integration for location section

## Pending 📋

### Epic A: Authentication
#### Password Management
- [x] Password reset request page (`/src/features/auth/ForgotPassword.tsx`)
- [x] Password reset email sending (mock)
- [x] Password reset confirmation page (`/src/features/auth/ResetPassword.tsx`)
- [x] New password form with validation
- [x] Password strength indicator (added to SignUp and ResetPassword)

#### Settings Page
- [x] Profile settings (`/src/features/settings/index.tsx`)
- [x] Business information settings
- [x] Notification preferences
- [x] Billing & subscription management

#### Email Verification
- [ ] Email verification after signup
- [ ] Verification email sending (mock)
- [ ] Verification link handling
- [ ] Resend verification email functionality

#### OAuth Integration
- [ ] Google OAuth integration setup
- [ ] Kakao OAuth integration setup
- [ ] Naver OAuth integration setup
- [ ] OAuth callback handling
- [ ] OAuth account linking

#### Security
- [ ] Session timeout handling
- [ ] Remember me functionality
- [ ] Two-factor authentication (2FA)
- [ ] Login attempt limiting
- [ ] CSRF protection

### Epic B: Onboarding
#### Business Info Step
- [x] BusinessInfoStep component structure (`/src/features/onboarding/steps/BusinessInfoStep.tsx`)
- [x] Business name input field (2-100자, 필수)
- [x] Business type selection (gym, yoga, pilates, academy, salon, cafe, clinic, other)
- [x] Business description textarea (20-500자, 필수)
- [x] Business category dropdown (유형별 세부 카테고리)
- [x] Form validation rules (실시간 + 제출 시)
- [x] Form error handling (touched 상태, 에러 메시지)
- [x] Phone validation (010/011/016/017/018/019 형식)
- [x] Email validation (이메일 형식)
- [x] Website validation (URL 형식, 선택)

#### Template Selection Step
- [x] TemplateSelectionStep component structure (`/src/features/onboarding/steps/TemplateSelectionStep.tsx`)
- [x] Template card grid layout (Bootstrap 3-column grid)
- [x] Template preview images (이모지 프리뷰 + 컬러 테마)
- [x] Template selection radio buttons (hidden radio input)
- [x] Template details modal (상세 정보, 기능, 컬러, 적합 업종)
- [x] Template comparison feature (최대 3개 템플릿 비교)
- [x] Recommended templates (비즈니스 유형 기반 추천)
- [x] Comparison bar UI (비교 중인 템플릿 표시)

#### Space Creation Step
- [x] SpaceCreationStep component structure
- [x] Space name input field
- [x] Space type selection
- [x] Space capacity input
- [x] Space amenities checklist
- [x] Space image upload (mock)
- [x] Space description textarea

#### Onboarding Wizard Flow
- [ ] Multi-step form navigation
- [ ] Progress indicator
- [ ] Back/Next navigation buttons
- [ ] Step validation before proceeding
- [ ] Save draft functionality
- [ ] Complete onboarding success page
- [ ] Auto-generate website after completion

### Epic C: Public Website
#### Website Builder
- [x] Admin panel for website customization
- [x] Color theme picker
- [x] Font family selector
- [x] Layout customization options
- [x] Section visibility toggles
- [ ] Image upload functionality
- [x] Text content editing
- [x] Preview mode (edit vs live preview)
- [x] Publish/Unpublish functionality

#### Location & Maps
- [ ] Google Maps API integration
- [ ] Interactive map display
- [ ] Business location marker
- [ ] Get directions button
- [ ] Location coordinate input

#### Chatbot
- [x] Chatbot AI integration (Demo - Mock FAQ responses)
- [x] Chatbot conversation flow design
- [x] FAQ automation (keyword-based matching)
- [x] Chat history storage (localStorage)
- [x] Admin chatbot response interface
- [x] Chatbot training data management

#### SEO & Meta
- [x] Page title customization
- [x] Meta description editor
- [ ] Open Graph tag management
- [ ] Twitter Card integration
- [ ] Favicon upload
- [ ] Custom domain setup

#### Analytics
- [x] Website visitor tracking
- [x] Page view analytics
- [x] User journey tracking
- [x] Conversion tracking
- [x] Analytics dashboard for business owners

### Epic D: Calendar & Booking
#### Calendar Features
- [x] Convert PrimeReact calendar to Bootstrap style
- [x] Month/Week/Day view toggles
- [x] Multiple space calendars
- [x] Calendar color coding
- [x] Calendar sharing functionality
- [x] Calendar sync (Google Calendar, Apple Calendar)

#### Booking System
- [x] Booking page for customers
- [x] Time slot availability display
- [x] Time slot selection
- [x] Booking duration options
- [x] Booking form (customer info)
- [x] Booking confirmation page
- [x] Booking cancellation flow
- [x] Booking modification flow

#### Availability Management
- [x] Business hours settings
- [x] Break time configuration
- [x] Holiday/blockout dates
- [x] Recurring availability rules
- [x] Manual availability overrides
- [x] Buffer time between bookings

#### Booking Management
- [x] Upcoming bookings list (`/src/features/bookings/index.tsx`)
- [x] Booking history
- [x] Booking status tracking (pending, confirmed, cancelled)
- [x] Booking reminders (email/SMS)
- [x] Booking notifications

### Epic E: Dashboard
#### Analytics & Metrics
- [ ] Real-time data integration
- [ ] Revenue charts (Chart.js or Recharts)
- [ ] Booking trends graph
- [ ] Customer growth metrics
- [ ] Peak hours analysis
- [ ] Service popularity tracking
- [ ] Export reports (CSV, PDF)

#### Customer Management
- [x] Customer list view (`/src/features/customers/index.tsx`)
- [ ] Customer detail page
- [ ] Customer booking history
- [ ] Customer notes/notes
- [ ] Customer tags/labels
- [ ] Customer communication log

#### Space Management
- [ ] Space list view
- [ ] Space detail page
- [ ] Space availability overview
- [ ] Space booking statistics
- [ ] Space edit functionality
- [ ] Space images gallery

#### Notifications
- [ ] Notification center
- [ ] New booking alerts
- [ ] Cancellation notifications
- [ ] Review notifications
- [ ] System announcements
- [x] Notification preferences (in Settings page)

#### Reports
- [ ] Daily/Weekly/Monthly reports
- [ ] Revenue reports
- [ ] Booking reports
- [ ] Customer reports
- [ ] Space utilization reports
- [ ] Custom report builder

### Infrastructure
#### Backend Integration
- [ ] Supabase client setup
- [ ] Replace mock auth with Supabase Auth
- [ ] Database schema design
- [ ] API client implementation (axios/fetch)
- [ ] API error handling
- [ ] API response interceptors
- [ ] Loading states for all API calls
- [ ] Refresh token handling

#### State Management
- [ ] Context API setup for global state
- [ ] Auth context implementation
- [ ] Business data context
- [ ] Booking context
- [ ] State persistence strategy

#### File Upload
- [ ] Image upload functionality
- [ ] File upload to Supabase Storage
- [ ] Image optimization
- [ ] Upload progress indicator
- [ ] File size validation
- [ ] File type validation

#### Performance
- [ ] Code splitting implementation
- [ ] Lazy loading for routes
- [ ] Image lazy loading
- [ ] Bundle size optimization
- [ ] Memoization optimizations
- [ ] Virtual scrolling for long lists

#### Error Handling
- [ ] Global error boundary
- [ ] Error page designs (404, 500, etc.)
- [ ] Form validation errors
- [ ] API error display
- [ ] Network error handling
- [ ] Retry mechanism

#### Testing
- [ ] Unit test setup (Vitest)
- [ ] Component tests
- [ ] Hook tests
- [ ] Utility function tests
- [ ] E2E test setup (Playwright/Cypress)
- [ ] Critical user flow tests
- [ ] Test coverage reporting

#### Deployment
- [ ] Production build configuration
- [ ] Environment variables management
- [ ] CI/CD pipeline setup
- [ ] Staging environment
- [ ] Production deployment
- [ ] Domain configuration
- [ ] SSL certificate setup

#### Documentation
- [ ] README.md with setup instructions
- [ ] Component documentation
- [ ] API documentation
- [ ] Contributing guidelines
- [ ] Deployment guide
- [ ] Troubleshooting guide

## Notes

### Design Decisions
- Using Bootstrap 5 as primary CSS framework (matching customer-frontend)
- Mock authentication with localStorage for development
- Template-based public websites with tenant routing
- Dashkit theme from S3 for consistent styling

### Known Issues
- None currently

### Next Priorities
1. Complete onboarding wizard (Epic B)
2. Website builder admin panel (Epic C)
3. Booking system implementation (Epic D)
4. Dashboard analytics (Epic E)
5. Supabase integration (Infrastructure)
