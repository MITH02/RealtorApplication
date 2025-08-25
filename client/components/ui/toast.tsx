import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";
import { X } from "lucide-react";

interface ToastVariantProps {
  variant?: "default" | "destructive";
}

const ToastProvider = ToastPrimitives.Provider;

const StyledToastViewport = styled(ToastPrimitives.Viewport)`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  max-height: 100vh;
  width: 100%;
  flex-direction: column-reverse;
  padding: 1rem;

  @media (min-width: 640px) {
    bottom: 0;
    right: 0;
    top: auto;
    flex-direction: column;
  }

  @media (min-width: 768px) {
    max-width: 420px;
  }
`;

const getVariantStyles = (variant: ToastVariantProps["variant"]): CSSObject => {
  const variants = {
    default: {
      border: "1px solid hsl(var(--border))",
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    },
    destructive: {
      border: "1px solid hsl(var(--destructive))",
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
    },
  };

  return variants[variant || "default"] || variants.default;
};

const StyledToast = styled(ToastPrimitives.Root)<ToastVariantProps>`
  pointer-events: auto;
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  column-gap: 1rem;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  padding: 1.5rem 2rem 1.5rem 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &[data-swipe=cancel] {
    transform: translateX(0);
  }

  &[data-swipe=end] {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }

  &[data-swipe=move] {
    transform: translateX(var(--radix-toast-swipe-move-x));
    transition: none;
  }

  &[data-state=open] {
    animation: slideInFromTop 150ms cubic-bezier(0.16, 1, 0.3, 1);

    @media (min-width: 640px) {
      animation: slideInFromBottom 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
  }

  &[data-state=closed] {
    animation: slideOutToRight 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideOutToRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  ${(props) => getVariantStyles(props.variant)}
`;

const StyledToastAction = styled(ToastPrimitives.Action)`
  display: inline-flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: transparent;
  padding: 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background-color: hsl(var(--secondary));
  }

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  .group:has([data-variant="destructive"]) & {
    border-color: hsl(var(--muted) / 0.4);

    &:hover {
      border-color: hsl(var(--destructive) / 0.3);
      background-color: hsl(var(--destructive));
      color: hsl(var(--destructive-foreground));
    }

    &:focus {
      box-shadow: 0 0 0 2px hsl(var(--destructive));
    }
  }
`;

const StyledToastClose = styled(ToastPrimitives.Close)`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.25rem;
  color: hsl(var(--foreground) / 0.5);
  opacity: 0;
  transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    color: hsl(var(--foreground));
  }

  &:focus {
    opacity: 1;
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
  }

  .group:hover & {
    opacity: 1;
  }

  .group:has([data-variant="destructive"]) & {
    color: rgb(252 165 165);

    &:hover {
      color: rgb(254 226 226);
    }

    &:focus {
      box-shadow: 0 0 0 2px rgb(248 113 113);
    }
  }
`;

const StyledToastTitle = styled(ToastPrimitives.Title)`
  font-size: 0.875rem;
  font-weight: 600;
`;

const StyledToastDescription = styled(ToastPrimitives.Description)`
  font-size: 0.875rem;
  opacity: 0.9;
`;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ ...props }, ref) => (
  <StyledToastViewport ref={ref} {...props} />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & ToastVariantProps
>(({ variant = "default", ...props }, ref) => {
  return (
    <StyledToast
      ref={ref}
      variant={variant}
      className="group"
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ ...props }, ref) => (
  <StyledToastAction ref={ref} {...props} />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ ...props }, ref) => (
  <StyledToastClose ref={ref} toast-close="" {...props}>
    <X style={{ height: "1rem", width: "1rem" }} />
  </StyledToastClose>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ ...props }, ref) => (
  <StyledToastTitle ref={ref} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ ...props }, ref) => (
  <StyledToastDescription ref={ref} {...props} />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
