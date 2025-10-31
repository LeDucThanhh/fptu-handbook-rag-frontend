import { Outlet } from "react-router-dom";
import MentorSidebar from "./MentorSidebar";

const MentorLayout = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <MentorSidebar />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default MentorLayout;
