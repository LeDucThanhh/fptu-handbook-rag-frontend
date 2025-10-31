/**
 * Professional Input Component
 * 
 * A fully-featured input component with labels, hints, errors,
 * icons, and various states.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertCircle, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================================
// INPUT VARIANTS
// ============================================================================

const inputVariants = cva(
  [
    "flex w-full rounded-lg border bg-white px-3 py-2",
    "text-sm transition-all duration-200",
    "placeholder:text-gray-400",
    "focus:outline-none focus:ring-2 focus:ring-offset-0",
    "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-gray-300",
          "focus:border-orange-500 focus:ring-orange-500/20",
        ],
        error: [
          "border-red-500",
          "focus:border-red-500 focus:ring-red-500/20",
        ],
        success: [
          "border-green-500",
          "focus:border-green-500 focus:ring-green-500/20",
        ],
      },
      inputSize: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      inputSize: "md",
    },
  }
);

// ============================================================================
// INPUT PROPS
// ============================================================================

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text */
  label?: string;

  /** Hint text below input */
  hint?: string;

  /** Error message */
  error?: string;

  /** Icon to display before input */
  leftIcon?: React.ReactNode;

  /** Icon to display after input */
  rightIcon?: React.ReactNode;

  /** Required field indicator */
  required?: boolean;

  /** Input container class name */
  containerClassName?: string;
}

// ============================================================================
// INPUT COMPONENT
// ============================================================================

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant,
      inputSize,
      label,
      hint,
      error,
      leftIcon,
      rightIcon,
      required,
      containerClassName,
      type = "text",
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || React.useId();
    const hintId = `${inputId}-hint`;
    const errorId = `${inputId}-error`;

    // Determine variant based on error
    const effectiveVariant = error ? "error" : variant;

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Input wrapper */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            className={cn(
              inputVariants({ variant: effectiveVariant, inputSize }),
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : hint ? hintId : undefined
            }
            {...props}
          />

          {/* Right icon or error icon */}
          {(rightIcon || error) && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {error ? (
                <AlertCircle className="h-4 w-4 text-red-500" />
              ) : (
                rightIcon
              )}
            </div>
          )}
        </div>

        {/* Hint text */}
        {hint && !error && (
          <p id={hintId} className="mt-1.5 text-xs text-gray-500">
            {hint}
          </p>
        )}

        {/* Error message */}
        {error && (
          <p id={errorId} className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

// ============================================================================
// PASSWORD INPUT COMPONENT
// ============================================================================

export interface PasswordInputProps extends Omit<InputProps, "type" | "rightIcon"> {}

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  (props, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Input
        ref={ref}
        type={showPassword ? "text" : "password"}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        }
        {...props}
      />
    );
  }
);

PasswordInput.displayName = "PasswordInput";

// ============================================================================
// TEXTAREA COMPONENT
// ============================================================================

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Label text */
  label?: string;

  /** Hint text below textarea */
  hint?: string;

  /** Error message */
  error?: string;

  /** Required field indicator */
  required?: boolean;

  /** Container class name */
  containerClassName?: string;

  /** Show character count */
  showCount?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      hint,
      error,
      required,
      containerClassName,
      showCount,
      maxLength,
      value,
      id,
      ...props
    },
    ref
  ) => {
    const textareaId = id || React.useId();
    const hintId = `${textareaId}-hint`;
    const errorId = `${textareaId}-error`;

    const currentLength = value?.toString().length || 0;

    return (
      <div className={cn("w-full", containerClassName)}>
        {/* Label */}
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        {/* Textarea */}
        <textarea
          ref={ref}
          id={textareaId}
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2",
            "text-sm transition-all duration-200",
            "placeholder:text-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-0",
            "focus:border-orange-500 focus:ring-orange-500/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50",
            "resize-y",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          maxLength={maxLength}
          value={value}
          {...props}
        />

        {/* Footer: Hint/Error and Character count */}
        <div className="flex items-center justify-between mt-1.5">
          <div className="flex-1">
            {/* Hint text */}
            {hint && !error && (
              <p id={hintId} className="text-xs text-gray-500">
                {hint}
              </p>
            )}

            {/* Error message */}
            {error && (
              <p id={errorId} className="text-xs text-red-600 flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {error}
              </p>
            )}
          </div>

          {/* Character count */}
          {showCount && maxLength && (
            <p className="text-xs text-gray-500 ml-2">
              {currentLength}/{maxLength}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

