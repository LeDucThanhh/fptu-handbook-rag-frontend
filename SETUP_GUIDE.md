# FPTU Handbook RAG - Frontend Setup Guide

## 🎯 Phase 1: Foundation Setup - COMPLETED ✅

### 📁 Project Structure Created

```
src/
├── components/
│   ├── common/           # Shared components (Navbar, Footer, etc.)
│   ├── student/          # Student-specific components
│   ├── mentor/           # Mentor-specific components
│   ├── academic/         # Academic Staff components
│   ├── affairs/          # Student Affairs components
│   ├── club/             # Club Coordinator components
│   ├── admin/            # Admin components
│   └── ui/               # shadcn/ui components
├── pages/
│   ├── auth/             # Login, Register pages
│   ├── student/          # 5 student screens (to be implemented)
│   ├── mentor/           # 3 mentor screens (to be implemented)
│   ├── academic/         # 3 academic screens (to be implemented)
│   ├── affairs/          # 3 affairs screens (to be implemented)
│   ├── club/             # 3 club coordinator screens (to be implemented)
│   └── admin/            # 4 admin screens (to be implemented)
├── services/
│   ├── api/
│   │   ├── auth.service.ts       ✅
│   │   ├── ai.service.ts         ✅
│   │   ├── handbook.service.ts   ✅
│   │   ├── club.service.ts       ✅
│   │   ├── notification.service.ts ✅
│   │   └── mentor.service.ts     ✅
│   └── api.service.ts    # Base axios instance
├── types/
│   ├── models/
│   │   ├── user.types.ts         ✅
│   │   ├── handbook.types.ts     ✅
│   │   ├── ai.types.ts           ✅
│   │   ├── club.types.ts         ✅
│   │   ├── notification.types.ts ✅
│   │   └── mentor.types.ts       ✅
│   └── index.ts          # Export all types
├── contexts/
│   └── AuthContext.tsx   # Zustand store for auth ✅
├── routes/
│   ├── ProtectedRoute.tsx ✅
│   └── index.tsx          ✅
└── hooks/
    └── useGlareEffect.ts  # Custom hook (already existed)
```

---

## ✅ What's Been Implemented

### 1. **Authentication System**

- ✅ Zustand store for state management (`AuthContext.tsx`)
- ✅ Login/Logout functionality
- ✅ Token management (access + refresh tokens)
- ✅ Role-based access control helper functions

### 2. **Routing & Protection**

- ✅ `ProtectedRoute` - Requires authentication
- ✅ `RoleRoute` - Requires specific roles
- ✅ `PublicRoute` - Only accessible when NOT authenticated
- ✅ Updated `App.tsx` with protected routing

### 3. **API Services Layer**

Complete API service modules for:

- ✅ **Auth** - login, register, refresh token, password reset
- ✅ **AI** - query, feedback, history, suggestions
- ✅ **Handbook** - versions, sections, search, rebuild index
- ✅ **Clubs** - CRUD clubs & activities
- ✅ **Notifications** - user notifications, management
- ✅ **Mentor** - unresolved queries, mentor posts, popular queries

### 4. **TypeScript Types**

Complete type definitions for:

- ✅ User & Authentication
- ✅ Handbook (versions, sections, chunks)
- ✅ AI (queries, responses, citations, feedback)
- ✅ Clubs (clubs, activities, types)
- ✅ Notifications
- ✅ Mentor (posts, unresolved queries)

### 5. **UI Components**

- ✅ Login page with shadcn/ui + GlareCard effect
- ✅ Form validation with react-hook-form + zod
- ✅ Toast notifications with sonner
- ✅ Tailwind config with FPT orange theme (#f97316)
- ✅ SVN-Product Sans font configured

### 6. **Dependencies Installed**

```json
{
  "react-hook-form": "latest", // Form handling
  "zod": "latest", // Schema validation
  "@hookform/resolvers": "latest", // Zod + RHF integration
  "sonner": "latest", // Toast notifications
  "zustand": "latest" // State management
}
```

---

## 🎨 Design System

### Colors (Tailwind Config)

```js
primary: {
  50: '#fff7ed',
  100: '#ffedd5',
  200: '#fed7aa',
  300: '#fdba74',
  400: '#fb923c',
  500: '#f97316',  // FPT Orange
  600: '#ea580c',
  700: '#c2410c',
  800: '#9a3412',
  900: '#7c2d12',
}
```

### Font Family

- **Primary**: SVN-Product Sans
- **Fallback**: Product Sans, system fonts

### Effects

- **GlareCard** - Hover effect for cards (already implemented)
- **backdrop-blur** - Glass morphism effects
- **Gradients** - Orange to white transitions

---

## 🔐 Authentication Flow

### Login Flow

```
1. User enters email + password
2. Form validated with Zod schema
3. Call authService.login(credentials)
4. Store user + token in Zustand (persisted to localStorage)
5. Redirect to intended page (or home)
```

### Protected Routes

```tsx
// Requires authentication only
<Route element={<ProtectedRoute />}>
  <Route path="/qa" element={<QA />} />
</Route>

// Requires specific roles
<Route element={<RoleRoute allowedRoles={[UserRole.MENTOR]} />}>
  <Route path="/mentor/unresolved" element={<UnresolvedQueue />} />
</Route>
```

### Token Refresh

- Automatic token refresh when expired
- Logout if refresh fails
- Persisted in localStorage via Zustand middleware

---

## 📋 Next Steps (Phase 2)

### Priority 1 - Student Screens (Week 1-2)

- [ ] Move existing pages to `src/pages/student/`
  - [ ] `AskAI.tsx` (refactor from QA.tsx)
  - [ ] `HandbookBrowser.tsx` (refactor from Handbook/)
  - [ ] `ClubsDirectory.tsx` (refactor from Clubs.tsx)
- [ ] Create new student screens
  - [ ] `NotificationCenter.tsx`
  - [ ] `Profile.tsx`

### Priority 2 - Academic Staff Screens (Week 2-3)

- [ ] `HandbookManagement.tsx` - CRUD handbook sections
- [ ] `RebuildIndex.tsx` - Trigger & monitor index rebuild
- [ ] `AcademicDashboard.tsx` - Analytics for academic queries

### Priority 3 - Mentor Screens (Week 3-4)

- [ ] `UnresolvedQueue.tsx` - View & assign unresolved queries
- [ ] `PostsManagement.tsx` - Create & manage mentor posts
- [ ] `MentorAnalytics.tsx` - Analytics dashboard

### Priority 4 - Other Roles (Month 2)

- [ ] Club Coordinator screens (3)
- [ ] Student Affairs screens (3)
- [ ] Admin screens (4)

---

## 🚀 How to Run

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

---

## 🔧 Environment Variables

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 📝 Notes

### API Integration

- All API services are ready
- Need backend API endpoints to be implemented
- Base URL configured via environment variable

### Authentication

- Token stored in localStorage (Zustand persist)
- Automatic refresh token flow
- Role-based access control ready

### Routing

- Public routes: Home, FAQ, Login
- Protected routes: QA, Clubs, Handbook
- Role routes: Ready for implementation

### Next Backend Requirements

1. JWT authentication endpoints
2. Role-based authorization
3. API endpoints matching service definitions
4. CORS configuration

---

## 🎯 Capstone Requirements Alignment

### SRS Coverage

- ✅ User authentication & authorization
- ✅ Role-based access control (6 roles)
- ✅ API service layer for all features
- ⏳ 21 screens (5 completed, 16 to implement)

### Tech Stack

- ✅ React 19 + TypeScript
- ✅ Tailwind CSS + shadcn/ui
- ✅ React Router v7
- ✅ Zustand (state management)
- ✅ Axios (API calls)
- ✅ React Hook Form + Zod (forms)

### Timeline to December

- Week 1-2 (Oct): Student screens ✅ Foundation complete
- Week 3-4 (Oct-Nov): Academic + Mentor screens
- Week 1-2 (Nov): Club + Affairs screens
- Week 3-4 (Nov): Admin screens + Analytics
- Week 1-2 (Dec): Polish, testing, deployment

---

## 🆘 Troubleshooting

### Build Errors

- All TypeScript errors fixed ✅
- Build successful ✅
- No linter warnings (minor unused imports removed)

### Common Issues

1. **Import errors**: Use `@/` alias for imports
2. **Type errors**: All types exported from `@/types`
3. **Routing**: Use `ProtectedRoute` or `RoleRoute` components

---

**Last Updated**: October 10, 2024
**Status**: Phase 1 Complete ✅ | Ready for Phase 2 🚀
