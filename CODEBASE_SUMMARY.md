# Beauty Service Dashboard - Complete Codebase Overview

## Project Summary
**memillennial Admin Dashboard** - A comprehensive Next.js 16.2.10-based admin portal for managing a beauty services platform. Features user management, booking analytics, revenue tracking, and verification workflows.

---

## Project Structure & Architecture

### Core Setup
- **Framework**: Next.js 16.2.10 with React 19.2.4
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 + PostCSS
- **UI Components**: Shadcn/ui + Radix UI primitives
- **State Management**: Redux Toolkit + React Query
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation

---

## File Structure & Key Components

### 1. **App Routes** (`/app`)

#### Authentication Routes (`/app/(auth)`)
```
/login/page.tsx          - Login page with email/password form
/forgot-password/page.tsx - Password recovery flow
/verify/page.tsx          - OTP verification page
```

#### Dashboard Routes (`/app/(dashboard)`)
```
/dashboard/page.tsx  - Main dashboard with stats, charts, bookings
/users/page.tsx      - User management table with filtering
/layout.tsx          - Dashboard layout with sidebar & topbar
```

#### Root Pages
```
/layout.tsx         - Root layout with metadata, fonts
/page.tsx          - Redirect to /login
/globals.css       - Global styles with Tailwind v4 + brand tokens
```

---

## 2. **Components** (`/components`)

### UI Components (`/components/ui`)
Reusable, base-level components:
- **button.tsx** - CVA-based button with variants (default, outline, ghost, subtle, link)
- **input.tsx** - Text input with optional icon support
- **label.tsx** - Form label component via Radix
- **avatar.tsx** - Avatar with image & initials fallback (Radix-based)
- **badge.tsx** - Status/role badges with 6 color variants
- **card.tsx** - Card container with header, title, description, content, footer

### Layout Components (`/components/layout`)
- **brand-logo.tsx** - memillennial logo (gem icon + brand text)
- **sidebar.tsx** - Left navigation with 12 menu items + badge counts
- **topbar.tsx** - Page header with breadcrumb, notifications, user profile
- **otp-input.tsx** - 6-digit OTP input with auto-focus logic

### Dashboard Components (`/components/dashboard`)
- **stat-card.tsx** - KPI card with icon, value, trend, sparkline
- **sparkline.tsx** - Mini line chart using Recharts (Client Component)
- **revenue-chart.tsx** - Area chart showing monthly revenue/bookings
- **booking-chart.tsx** - Bar chart with booking status breakdown
- **recent-bookings.tsx** - Table preview of recent booking records
- **pending-verifications.tsx** - List of pending artist verifications

---

## 3. **Utilities & Libraries** (`/lib`)

### avatar-color.ts
Deterministic color assignment based on string seed (name/id) using hash function.
Palette: 6 pastel colors repeated via modulo.

### utils.ts
- `cn()` - Utility combining clsx + tailwind-merge for class composition

---

## 4. **Mock Data** (`/app/src/mock`)

### dashboard.ts
Contains placeholder API responses:
- User info (name, role)
- Stats with icons, values, trends, sparklines
- Structured to mirror real API shape

---

## 5. **Configuration Files**

### next.config.ts
Minimal Next.js configuration (placeholder).

### tsconfig.json
- Target: ES2017
- Path aliases: `@/*` → root
- JSX: react-jsx
- Strict mode enabled

### components.json
Shadcn CLI config:
- Style: base-nova
- Icons: lucide
- Aliases configured (components, utils, lib, etc.)

### postcss.config.mjs
Single plugin: `@tailwindcss/postcss`

---

## 6. **Styling System**

### Brand Tokens (Tailwind v4)
```css
--brand-pink: #FF69B4          (primary color)
--brand-pink-deep: #E0507F     (deeper shade)
--brand-orange: #FF9BB3        (accent)
--brand-purple: #B57EDC        (secondary)
--brand-lilac: #DDF3E7         (light)
--brand-gradient: linear-gradient(135deg, pink → orange)

--ink: #160911                 (text)
--subtle: #8A8590              (secondary text)
--hairline: #EFEAF3            (borders)
--appbg: #FBF9FB               (background)

--success: #2FA773
--warning: #E8A33D
--destructive: #E5484D
```

### Shadow Utilities
- `shadow-soft`: 0 4px 20px rgba(22,17,25,0.05)
- `shadow-card`: 0 2px 10px rgba(22,17,25,0.04)

---

## 7. **Key Features & Pages**

### Dashboard Page
```
✓ Welcome section with date
✓ 6 KPI stat cards with sparklines
✓ Revenue area chart (monthly)
✓ Booking analytics bar chart
✓ Recent bookings table
✓ Pending verifications list
```

### Users Management Page
```
✓ Mini stats (total, customers, artists, suspended, active)
✓ Search + filter controls (role, status)
✓ User table (10 cols: name, email, phone, role, status, etc.)
✓ Pagination (3 pages shown)
✓ Avatar colors deterministic per user
```

### Authentication Flows
- **Login**: Email + password form → /dashboard redirect
- **Forgot Password**: Email input → sends code
- **Verify**: OTP input (6 digits) → dashboard access

---

## 8. **Data Models & API Response Shapes**

### Stat Card
```typescript
icon: LucideIcon
iconBg: string          // hex color for icon background
iconColor: string       // hex color for icon
value: string           // e.g., "24,832"
label: string
change: string          // e.g., "+12.4%"
trend: "up" | "down"
sparklineColor: string
sparkline: TrendPoint[] // { date, value }
```

### Booking Record
```typescript
id: string
customer: { name: string; initials: string }
artist: string
service: string
amountCents: number     // cents, not dollars
status: "Completed" | "Pending" | "Cancelled" | "Refunded"
bookedAt: string        // ISO date
```

### Revenue Data Point
```typescript
period: string          // ISO key (e.g., "2026-01")
label: string           // display (e.g., "Jan")
revenueCents: number
bookings: number
```

### Verification Record
```typescript
id: string
name: string
initials: string
role: string
submittedAt: string     // ISO date
```

### User Record (Users Page)
```typescript
id: string              // e.g., "U-001"
name: string
initials: string
email: string
phone: string
role: "Customer" | "Artist"
status: "Active" | "Pending" | "Suspended" | "Paused"
bookings: number
lastLogin: string       // date
joined: string          // date
```

---

## 9. **Navigation Structure**

### Sidebar Menu Items (12 items)
1. Dashboard → `/dashboard`
2. Users → `/users`
3. Verification → `/verification` [badge: 23]
4. Bookings → `/bookings`
5. Cancellation & Refund → `/refunds` [badge: 47]
6. Finance → `/finance`
7. Content → `/content`
8. Reviews → `/reviews`
9. Notifications → `/notifications` [badge: 5]
10. Reports → `/reports`
11. Support → `/support` [badge: 3]
12. Policies → `/policies`

---

## 10. **Color Coding System**

### Badge Variants
- `default`: Purple background (brand)
- `success`: Green (#DDF3E7 bg, #2FA773 text)
- `warning`: Orange (#FBF0D6 bg, #E8A33D text)
- `danger`: Red (#FBE2E2 bg, #E5484D text)
- `info`: Blue (#E1EAFB bg, #3E6FE0 text)
- `neutral`: Gray (muted)

### Avatar Colors (Deterministic Palette)
- #F4B6C2 (pink)
- #B8D8BA (green)
- #B8C7E8 (blue)
- #F4D9A0 (yellow)
- #D9B8E8 (purple)
- #F4B67C (orange)

---

## 11. **Responsive Breakpoints**

Grid layouts use Tailwind breakpoints:
- **Base**: `grid-cols-2` (mobile)
- **md**: `md:grid-cols-5` (tablets)
- **lg**: `lg:grid-cols-4` (desktop)
- **lg**: `lg:grid-cols-3` (for charts)

---

## 12. **Key Dependencies & Versions**

```json
{
  "next": "16.2.10",
  "react": "19.2.4",
  "typescript": "5.x",
  "tailwindcss": "4.x",
  "@radix-ui": "latest primitives",
  "@reduxjs/toolkit": "2.12.0",
  "@tanstack/react-query": "5.101.2",
  "recharts": "3.9.2",
  "react-hook-form": "7.81.0",
  "zod": "4.4.3",
  "lucide-react": "1.24.0",
  "sonner": "2.0.7"  // Toast notifications
}
```

---

## 13. **Authentication Flow**

```
Public Routes:
  /login → form → route push → /dashboard
  /forgot-password → email → /verify
  /verify → OTP input → /dashboard

Protected Routes (implicit):
  /dashboard/*  (redirects if unauthorized)
  /users, /verification, etc.
```

---

## 14. **Mock Data Statistics**

### Dashboard Stat Cards
- **Total Users**: 24,832 (+12.4%)
- **Total Artists**: 3,241 (+8.7%)
- **Pending Verify**: 23 (-5.2%)
- **Total Bookings**: 89,432 (+15.2%)
- **Total Revenue**: $8,420 (+18.9%)
- **Active Users**: 18,943 (+9.1%)

### Users Table Sample (10 rows)
Mixed customers & artists with various statuses:
- 5 Customers (roles)
- 5 Artists
- Statuses: Active, Pending, Suspended, Paused

### Revenue Data
12-month monthly buckets (Jan–Dec 2026):
- Range: $154k–$298k per month
- Bookings: 1,180–2,810

### Recent Bookings (6 sample records)
Mix of statuses: Completed, Pending, Cancelled, Refunded

### Pending Verifications (4 artists)
Sample dates: Jun 28 – Jul 1, 2026

---

## 15. **Development Workflow**

### Scripts
```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Next.js production build
npm run start   # Start production server
npm run lint    # ESLint check
```

### File Paths
- Aliases: `@/components`, `@/lib`, `@/hooks` (configured in tsconfig.json)
- All imports use `@/` prefix for absolute paths

---

## 16. **Notable Implementation Details**

### Server/Client Component Boundary
- **Server Components**: Page layout, stat card (icon rendering)
- **Client Components**: Charts (Recharts), forms, OTP input, sidebar
- Sparkline isolated as client component to avoid passing icon references across boundary

### Styling Approach
- Tailwind v4 with custom theme in `globals.css`
- CVA (class-variance-authority) for component variants
- Inline `minHeight` on Recharts containers to prevent CSS purge collapse

### Form Handling
- React Hook Form + Zod for validation (imported, not heavily used in demos)
- Currently using simple form submission patterns

### Data Normalization
- API responses simulate real backends:
  - Revenue in cents, not dollars
  - ISO date strings
  - Pagination metadata (total, page, pageSize)

---

## 17. **Future Integration Points**

### API Endpoints to Implement
```
GET /api/dashboard/stats         # KPI data
GET /api/analytics/revenue       # Revenue chart
GET /api/bookings                # Booking records
GET /api/users                   # User management
GET /api/verifications           # Pending reviews
POST /api/auth/login             # Authentication
```

### State Management
- Redux Toolkit available (not currently used)
- React Query configured for API integration

### Toast Notifications
- Sonner library imported (for success/error messages)

---

## 18. **Current Demo Content**

All data is currently **mock/hardcoded**:
- No real API calls
- Next.js routes work (navigation functions)
- Forms are interactive but don't persist
- Charts display with sample data
- Tables render sample records

---

## 19. **Code Quality Notes**

✓ TypeScript strict mode enabled
✓ Proper component type exports
✓ Accessibility: Radix primitives, semantic HTML
✓ Responsive design: Mobile-first approach
✓ Performance: Image optimization ready (Next.js Image not heavily used yet)
✓ ESLint configured with Next.js preset

---

## 20. **Deployment Readiness**

- ✓ Next.js production build supported
- ✓ Vercel deployment recommended
- ✓ Environment variables: Not yet configured
- ✓ Database: Ready to integrate
- ✓ Authentication: Placeholder, ready to wire to real auth provider

---

**Project Status**: Foundation phase complete. UI/UX fully designed. Ready for backend integration.
