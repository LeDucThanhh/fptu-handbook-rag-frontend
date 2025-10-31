/**
 * Professional Modal Component
 * 
 * A fully-featured modal dialog with animations, backdrop,
 * keyboard navigation, and accessibility features.
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

// ============================================================================
// MODAL CONTEXT
// ============================================================================

interface ModalContextValue {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextValue | undefined>(
  undefined
);

const useModalContext = () => {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within Modal");
  }
  return context;
};

// ============================================================================
// MODAL ROOT
// ============================================================================

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Callback when modal should close */
  onClose: () => void;

  /** Children */
  children: React.ReactNode;

  /** Size of the modal */
  size?: "sm" | "md" | "lg" | "xl" | "full";

  /** Whether clicking backdrop closes modal */
  closeOnBackdropClick?: boolean;

  /** Whether pressing Escape closes modal */
  closeOnEscape?: boolean;

  /** Custom class name */
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  className,
}) => {
  // Handle escape key
  React.useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape, onClose]);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-full mx-4",
  };

  return createPortal(
    <ModalContext.Provider value={{ isOpen, onClose }}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
              onClick={closeOnBackdropClick ? onClose : undefined}
              aria-hidden="true"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "relative w-full bg-white rounded-2xl shadow-2xl pointer-events-auto",
                  "max-h-[90vh] flex flex-col",
                  sizeClasses[size],
                  className
                )}
                role="dialog"
                aria-modal="true"
                onClick={(e) => e.stopPropagation()}
              >
                {children}
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </ModalContext.Provider>,
    document.body
  );
};

// ============================================================================
// MODAL HEADER
// ============================================================================

export interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  children,
  className,
  showCloseButton = true,
}) => {
  const { onClose } = useModalContext();

  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-b border-gray-200",
        className
      )}
    >
      <h2 className="text-xl font-semibold text-gray-900">{children}</h2>

      {showCloseButton && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8 rounded-full"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
};

// ============================================================================
// MODAL BODY
// ============================================================================

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex-1 overflow-y-auto px-6 py-4", className)}>
      {children}
    </div>
  );
};

// ============================================================================
// MODAL FOOTER
// ============================================================================

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50",
        className
      )}
    >
      {children}
    </div>
  );
};

// ============================================================================
// CONFIRMATION MODAL (Pre-built)
// ============================================================================

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
  isLoading?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "danger",
  isLoading = false,
}) => {
  const variantStyles = {
    danger: {
      icon: "⚠️",
      iconBg: "bg-red-100",
      confirmVariant: "destructive" as const,
    },
    warning: {
      icon: "⚡",
      iconBg: "bg-yellow-100",
      confirmVariant: "primary" as const,
    },
    info: {
      icon: "ℹ️",
      iconBg: "bg-blue-100",
      confirmVariant: "info" as const,
    },
  };

  const style = variantStyles[variant];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalBody>
        <div className="text-center">
          {/* Icon */}
          <div
            className={cn(
              "mx-auto w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4",
              style.iconBg
            )}
          >
            {style.icon}
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

          {/* Description */}
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="outline" onClick={onClose} disabled={isLoading}>
          {cancelText}
        </Button>
        <Button
          variant={style.confirmVariant}
          onClick={onConfirm}
          isLoading={isLoading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

