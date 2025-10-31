import { Outlet } from "react-router-dom";
import RoleNavigation from "./RoleNavigation";
import { DESIGN_TOKENS } from "@/design-system/tokens";

export default function RoleBasedLayout() {
  return (
    <div className={`min-h-screen ${DESIGN_TOKENS.colors.background.primary}`}>
      <div className="flex">
        <RoleNavigation />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
