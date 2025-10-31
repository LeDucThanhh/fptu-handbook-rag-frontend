/**
 * Professional Button Component
 *
 * A fully-featured button component with multiple variants, sizes,
 * loading states, icons, and accessibility features.
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" leftIcon={<Plus />}>
 *   Create New
 * </Button>
 *
 * <Button variant="outline" isLoading>
 *   Loading...
 * </Button>
 * ```
 */

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// BUTTON VARIANTS
// ============================================================================

const buttonVariants = cva(
  // Base styles - Professional, accessible, smooth transitions
  [
    "inline-flex items-center justify-center gap-2",
    "font-medium transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "select-none whitespace-nowrap",
    "active:scale-[0.98]", // Subtle press effect
  ],
  {
    variants: {
      variant: {
        // Primary - FPT Orange (Main CTA)
        primary: [
          "bg-orange-500 text-white shadow-sm",
          "hover:bg-orange-600 hover:shadow-md hover:scale-[1.02]",
          "active:bg-orange-700",
          "focus-visible:ring-orange-500",
        ],

        // Secondary - Outlined Orange
        secondary: [
          "border-2 border-orange-500 text-orange-600 bg-white",
          "hover:bg-orange-50 hover:border-orange-600",
          "active:bg-orange-100",
          "focus-visible:ring-orange-500",
        ],

        // Outline - Neutral
        outline: [
          "border-2 border-gray-300 text-gray-700 bg-white",
          "hover:bg-gray-50 hover:border-gray-400",
          "active:bg-gray-100",
          "focus-visible:ring-gray-500",
        ],

        // Ghost - Transparent
        ghost: [
          "text-gray-700 bg-transparent",
          "hover:bg-gray-100",
          "active:bg-gray-200",
          "focus-visible:ring-gray-500",
        ],

        // Link - Text only
        link: [
          "text-orange-600 underline-offset-4 bg-transparent",
          "hover:underline hover:text-orange-700",
          "focus-visible:ring-orange-500",
        ],

        // Destructive - Red (Delete, Remove actions)
        destructive: [
          "bg-red-500 text-white shadow-sm",
          "hover:bg-red-600 hover:shadow-md",
          "active:bg-red-700",
          "focus-visible:ring-red-500",
        ],

        // Success - Green (Confirm, Save actions)
        success: [
          "bg-green-500 text-white shadow-sm",
          "hover:bg-green-600 hover:shadow-md",
          "active:bg-green-700",
          "focus-visible:ring-green-500",
        ],

        // Info - Blue
        info: [
          "bg-blue-500 text-white shadow-sm",
          "hover:bg-blue-600 hover:shadow-md",
          "active:bg-blue-700",
          "focus-visible:ring-blue-500",
        ],
      },

      size: {
        xs: "h-7 px-2.5 text-xs rounded-md",
        sm: "h-8 px-3 text-sm rounded-lg",
        md: "h-10 px-4 text-base rounded-lg",
        lg: "h-12 px-6 text-lg rounded-xl",
        xl: "h-14 px-8 text-xl rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },

      fullWidth: {
        true: "w-full",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

// ============================================================================
// BUTTON PROPS
// ============================================================================

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Use Slot for composition */
  asChild?: boolean;

  /** Loading state - shows spinner and disables button */
  isLoading?: boolean;

  /** Icon to display before text */
  leftIcon?: React.ReactNode;

  /** Icon to display after text */
  rightIcon?: React.ReactNode;

  /** Full width button */
  fullWidth?: boolean;
}

// ============================================================================
// BUTTON COMPONENT
// ============================================================================

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        )}

        {/* Left icon */}
        {!isLoading && leftIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {leftIcon}
          </span>
        )}

        {/* Button text */}
        {children && <span>{children}</span>}

        {/* Right icon */}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">
            {rightIcon}
          </span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
