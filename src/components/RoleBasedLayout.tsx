import { Outlet } from "react-router-dom";
import RoleNavigation from "./RoleNavigation";
import Navbar from "./Navbar";

export default function RoleBasedLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <RoleNavigation />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}



