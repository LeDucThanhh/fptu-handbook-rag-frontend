import React from "react";
import { DESIGN_TOKENS } from "@/design-system/tokens";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "large";
  background?: "primary" | "secondary" | "tertiary";
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  size = "default",
  background = "primary",
}) => {
  const sectionClass =
    size === "large"
      ? DESIGN_TOKENS.spacing.sectionLarge
      : DESIGN_TOKENS.spacing.section;

  const backgroundClass = DESIGN_TOKENS.colors.background[background];

  return (
    <section className={`${sectionClass} ${backgroundClass} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
