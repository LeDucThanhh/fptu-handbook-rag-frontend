import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProtectedRoute, RoleRoute } from "./routes";
import MainLayout from "./components/MainLayout";
import RoleBasedLayout from "./components/RoleBasedLayout";
import { UserRole } from "./types";

// Public pages
import Home from "./pages/Home";
import QA from "./pages/QA";
import Clubs from "./pages/Clubs";
import Handbook from "./pages/Handbook";
import Introduction from "./pages/Handbook/Introduction";
import Admission from "./pages/Handbook/Admission";
import Tuition from "./pages/Handbook/Tuition";

// Student protected pages
import Profile from "./pages/student/Profile";
import History from "./pages/student/History";
import NotificationCenter from "./pages/student/NotificationCenter";

// Mentor pages (from dev - detailed UI by teammate)
import MentorAnalytics from "./pages/Mentor/Analytics";
import ResourceRecommendation from "./pages/Mentor/ResourceRecommendation";
import UnresolvedQueue from "./pages/Mentor/UnresolvedQueue";

// Academic Staff pages
import AcademicDashboard from "./pages/academic/Dashboard";
import HandbookManagement from "./pages/academic/HandbookManagement";
import RebuildIndex from "./pages/academic/RebuildIndex";

// Student Affairs pages
import AffairsDashboard from "./pages/affairs/Dashboard";
import NotificationManagement from "./pages/affairs/NotificationManagement";
import ClubManagement from "./pages/affairs/ClubManagement";
import EngagementDashboard from "./pages/affairs/EngagementDashboard";

// Club Coordinator pages
import ClubList from "./pages/club/ClubList";
import ClubDetail from "./pages/club/ClubDetail";

// Admin pages
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import SystemConfig from "./pages/admin/SystemConfig";
import AuditLogs from "./pages/admin/AuditLogs";
import SystemHealth from "./pages/admin/SystemHealth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes - Accessible to everyone */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/qa" element={<QA />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/handbook" element={<Handbook />} />
          <Route path="/handbook/introduction" element={<Introduction />} />
          <Route path="/handbook/admission" element={<Admission />} />
          <Route path="/handbook/tuition" element={<Tuition />} />

          {/* Student pages (Require login) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/history" element={<History />} />
            <Route path="/notifications" element={<NotificationCenter />} />
          </Route>
        </Route>

        {/* Role-based routes with Sidebar Navigation */}
        <Route element={<RoleBasedLayout />}>
          {/* Admin routes */}
          <Route element={<RoleRoute allowedRoles={[UserRole.ADMIN]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/config" element={<SystemConfig />} />
            <Route path="/admin/logs" element={<AuditLogs />} />
            <Route path="/admin/health" element={<SystemHealth />} />
          </Route>

          {/* Mentor routes */}
          <Route
            element={
              <RoleRoute allowedRoles={[UserRole.MENTOR, UserRole.ADMIN]} />
            }
          >
            <Route path="/mentor/unresolved" element={<UnresolvedQueue />} />
            <Route path="/mentor/analytics" element={<MentorAnalytics />} />
            <Route path="/mentor/recommendations" element={<ResourceRecommendation />} />
          </Route>

          {/* Academic Staff routes */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[UserRole.ACADEMIC_STAFF, UserRole.ADMIN]}
              />
            }
          >
            <Route path="/academic/dashboard" element={<AcademicDashboard />} />
            <Route path="/academic/handbook" element={<HandbookManagement />} />
            <Route path="/academic/rebuild" element={<RebuildIndex />} />
          </Route>

          {/* Student Affairs routes */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[UserRole.STUDENT_AFFAIRS, UserRole.ADMIN]}
              />
            }
          >
            <Route path="/affairs/dashboard" element={<AffairsDashboard />} />
            <Route
              path="/affairs/notifications"
              element={<NotificationManagement />}
            />
            <Route path="/affairs/clubs" element={<ClubManagement />} />
            <Route
              path="/affairs/engagement"
              element={<EngagementDashboard />}
            />
          </Route>

          {/* Club Coordinator routes */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[UserRole.CLUB_COORDINATOR, UserRole.ADMIN]}
              />
            }
          >
            <Route path="/club/dashboard" element={<ClubList />} />
            <Route path="/club/detail/:clubId" element={<ClubDetail />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
