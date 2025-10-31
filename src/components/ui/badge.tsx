/**
 * Professional Badge Component
 * 
 * Small status indicators and labels with various styles
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// BADGE VARIANTS
// ============================================================================

const badgeVariants = cva(
  [
    "inline-flex items-center gap-1 font-medium transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-800 hover:bg-gray-200",
        primary: "bg-orange-100 text-orange-800 hover:bg-orange-200",
        secondary: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        success: "bg-green-100 text-green-800 hover:bg-green-200",
        warning: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
        error: "bg-red-100 text-red-800 hover:bg-red-200",
        info: "bg-blue-100 text-blue-800 hover:bg-blue-200",
        
        // Solid variants
        solidPrimary: "bg-orange-500 text-white hover:bg-orange-600",
        solidSecondary: "bg-blue-500 text-white hover:bg-blue-600",
        solidSuccess: "bg-green-500 text-white hover:bg-green-600",
        solidWarning: "bg-yellow-500 text-white hover:bg-yellow-600",
        solidError: "bg-red-500 text-white hover:bg-red-600",
        
        // Outline variants
        outline: "border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-50",
        outlinePrimary: "border-2 border-orange-500 text-orange-600 bg-white hover:bg-orange-50",
      },
      
      size: {
        sm: "px-2 py-0.5 text-xs rounded",
        md: "px-2.5 py-1 text-sm rounded-md",
        lg: "px-3 py-1.5 text-base rounded-lg",
      },
    },
    
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// ============================================================================
// BADGE PROPS
// ============================================================================

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  /** Icon to display before text */
  icon?: React.ReactNode;
  
  /** Whether badge is removable */
  onRemove?: () => void;
}

// ============================================================================
// BADGE COMPONENT
// ============================================================================

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, icon, onRemove, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size }), className)}
        {...props}
      >
        {/* Icon */}
        {icon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        
        {/* Text */}
        {children}
        
        {/* Remove button */}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Remove"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  }
);

Badge.displayName = "Badge";

// ============================================================================
// STATUS BADGE (Pre-built with dot indicator)
// ============================================================================

export interface StatusBadgeProps {
  status: "active" | "inactive" | "pending" | "success" | "error" | "warning";
  children: React.ReactNode;
  className?: string;
  showDot?: boolean;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
  className,
  showDot = true,
}) => {
  const statusConfig = {
    active: {
      variant: "success" as const,
      dotColor: "bg-green-500",
    },
    inactive: {
      variant: "default" as const,
      dotColor: "bg-gray-400",
    },
    pending: {
      variant: "warning" as const,
      dotColor: "bg-yellow-500",
    },
    success: {
      variant: "success" as const,
      dotColor: "bg-green-500",
    },
    error: {
      variant: "error" as const,
      dotColor: "bg-red-500",
    },
    warning: {
      variant: "warning" as const,
      dotColor: "bg-yellow-500",
    },
  };

  const config = statusConfig[status];

  return (
    <Badge
      variant={config.variant}
      className={className}
      icon={
        showDot ? (
          <span
            className={cn(
              "w-2 h-2 rounded-full",
              config.dotColor
            )}
          />
        ) : undefined
      }
    >
      {children}
    </Badge>
  );
};

// ============================================================================
// COUNT BADGE (For notifications, etc.)
// ============================================================================

export interface CountBadgeProps {
  count: number;
  max?: number;
  variant?: "primary" | "error";
  className?: string;
}

export const CountBadge: React.FC<CountBadgeProps> = ({
  count,
  max = 99,
  variant = "primary",
  className,
}) => {
  const displayCount = count > max ? `${max}+` : count;
  
  const variantStyles = {
    primary: "bg-orange-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "min-w-[20px] h-5 px-1.5",
        "text-xs font-semibold",
        "rounded-full",
        variantStyles[variant],
        className
      )}
    >
      {displayCount}
    </span>
  );
};

// ============================================================================
// TAG COMPONENT (For filtering, categories, etc.)
// ============================================================================

export interface TagProps {
  children: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  selected = false,
  onSelect,
  onRemove,
  className,
}) => {
  const isInteractive = onSelect || onRemove;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5",
        "text-sm font-medium rounded-full",
        "transition-all duration-200",
        selected
          ? "bg-orange-500 text-white shadow-sm"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        isInteractive && "cursor-pointer",
        className
      )}
      onClick={onSelect}
    >
      {children}
      
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="inline-flex shrink-0 hover:opacity-70 transition-opacity"
          aria-label="Remove tag"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
};

// ============================================================================
// TAG GROUP COMPONENT
// ============================================================================

export interface TagGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const TagGroup: React.FC<TagGroupProps> = ({ children, className }) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {children}
    </div>
  );
};

