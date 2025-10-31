import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RoleRoute } from "./routes";
import RoleBasedLayout from "./components/RoleBasedLayout";
import StudentLayout from "./components/StudentLayout";
import { UserRole } from "./types";

// Auth pages
import Login from "./pages/Login";

// Protected pages - QA, Clubs, Handbook
import QA from "./pages/QA";
import Clubs from "./pages/Clubs";
import Handbook from "./pages/Handbook";
import Introduction from "./pages/Handbook/Introduction";
import Admission from "./pages/Handbook/Admission";
import Tuition from "./pages/Handbook/Tuition";

// Student protected pages
import StudentHome from "./pages/student/StudentHome";
import Profile from "./pages/student/Profile";
import History from "./pages/student/History";
import NotificationCenter from "./pages/student/NotificationCenter";

// Mentor pages (from dev - detailed UI by teammate)
import MentorDashboard from "./pages/mentor/Dashboard";
import MentorAnalytics from "./pages/mentor/Analytics";
import ResourceRecommendation from "./pages/mentor/ResourceRecommendation";
import UnresolvedQueue from "./pages/mentor/UnresolvedQueue";

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
        {/* Public route - Login only */}
        <Route path="/login" element={<Login />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* QA Page - NO Layout (Full screen chat) */}
        <Route element={<RoleRoute allowedRoles={[UserRole.STUDENT]} />}>
          <Route path="/qa" element={<QA />} />
        </Route>

        {/* Student Layout - All Student routes with Header + Footer (NO Sidebar) */}
        <Route element={<StudentLayout />}>
          <Route element={<RoleRoute allowedRoles={[UserRole.STUDENT]} />}>
            <Route path="/student" element={<StudentHome />} />
            <Route path="/student/profile" element={<Profile />} />
            <Route path="/student/history" element={<History />} />
            <Route
              path="/student/notifications"
              element={<NotificationCenter />}
            />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/handbook/introduction" element={<Introduction />} />
            <Route path="/handbook/admission" element={<Admission />} />
            <Route path="/handbook/tuition" element={<Tuition />} />
            {/* Legacy routes for backward compatibility */}
            <Route
              path="/profile"
              element={<Navigate to="/student/profile" replace />}
            />
            <Route
              path="/history"
              element={<Navigate to="/student/history" replace />}
            />
            <Route
              path="/notifications"
              element={<Navigate to="/student/notifications" replace />}
            />
          </Route>
        </Route>

        {/* Management Roles Layout - With Navbar + Sidebar */}
        <Route element={<RoleBasedLayout />}>
          {/* Common protected pages - Management roles only */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  UserRole.MENTOR,
                  UserRole.ACADEMIC_STAFF,
                  UserRole.STUDENT_AFFAIRS,
                  UserRole.CLUB_COORDINATOR,
                  UserRole.ADMIN,
                ]}
              />
            }
          >
            <Route path="/qa" element={<QA />} />
            <Route path="/clubs" element={<Clubs />} />
            <Route path="/handbook" element={<Handbook />} />
            <Route path="/handbook/introduction" element={<Introduction />} />
            <Route path="/handbook/admission" element={<Admission />} />
            <Route path="/handbook/tuition" element={<Tuition />} />
          </Route>
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
            <Route path="/mentor/dashboard" element={<MentorDashboard />} />
            <Route path="/mentor/analytics" element={<MentorAnalytics />} />
            <Route path="/mentor/queue" element={<UnresolvedQueue />} />
            <Route
              path="/mentor/recommendations"
              element={<ResourceRecommendation />}
            />
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
