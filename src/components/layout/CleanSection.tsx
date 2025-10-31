import React from "react";
import { DESIGN_TOKENS } from "@/design-system/tokens";

interface CleanSectionProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export const CleanSection: React.FC<CleanSectionProps> = ({
  children,
  className = "",
  title,
  description,
}) => {
  return (
    <section className={`${className}`}>
      {(title || description) && (
        <div className="mb-8">
          {title && (
            <h2
              className={`${DESIGN_TOKENS.typography.heading2} ${DESIGN_TOKENS.colors.text.primary} mb-2`}
            >
              {title}
            </h2>
          )}
          {description && (
            <p
              className={`${DESIGN_TOKENS.typography.body} ${DESIGN_TOKENS.colors.text.secondary}`}
            >
              {description}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
};

export default CleanSection;
