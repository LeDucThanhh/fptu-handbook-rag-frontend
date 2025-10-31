import React from "react";
import { DESIGN_TOKENS } from "@/design-system/tokens";

interface CleanPageContainerProps {
  children: React.ReactNode;
  size?: "default" | "large";
  className?: string;
}

export const CleanPageContainer: React.FC<CleanPageContainerProps> = ({
  children,
  size = "default",
  className = "",
}) => {
  const maxWidthClass = size === "large" ? "max-w-7xl" : "max-w-6xl";

  return (
    <div className={`${DESIGN_TOKENS.colors.background.primary} min-h-screen`}>
      <div
        className={`container mx-auto px-6 py-8 ${maxWidthClass} ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default CleanPageContainer;
