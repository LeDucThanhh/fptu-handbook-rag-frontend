import React from "react";
import { DESIGN_TOKENS } from "@/design-system/tokens";

interface ProfessionalCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glare?: boolean;
  size?: "default" | "large";
  onClick?: () => void;
}

export const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  children,
  className = "",
  hover = true,
  glare = true,
  size = "default",
  onClick,
}) => {
  const cardClass =
    size === "large"
      ? DESIGN_TOKENS.spacing.cardLarge
      : DESIGN_TOKENS.spacing.card;

  const glareClass = glare ? "glare-card" : "";
  const hoverClass = hover ? "cursor-pointer" : "";

  return (
    <div
      className={`
        ${DESIGN_TOKENS.colors.background.secondary}
        ${DESIGN_TOKENS.radius.lg}
        ${DESIGN_TOKENS.shadows.md}
        ${cardClass}
        ${glareClass}
        ${hoverClass}
        ${className}
      `}
      onClick={onClick}
    >
      <div className="glare-content">{children}</div>
    </div>
  );
};

export default ProfessionalCard;
