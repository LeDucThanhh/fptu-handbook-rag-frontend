import React from "react";
import { DESIGN_TOKENS } from "@/design-system/tokens";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
  size = "default",
}) => {
  const containerClass =
    size === "large"
      ? DESIGN_TOKENS.spacing.containerLarge
      : DESIGN_TOKENS.spacing.container;

  return (
    <div className={`${DESIGN_TOKENS.colors.background.primary} min-h-screen`}>
      <div className={`${containerClass} ${className}`}>{children}</div>
    </div>
  );
};

export default PageContainer;
