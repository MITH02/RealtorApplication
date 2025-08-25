import * as React from "react";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import styled from "@emotion/styled";

const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
const AlertDialogPortal = AlertDialogPrimitive.Portal;

const StyledAlertDialogOverlay = styled(AlertDialogPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);
  
  &[data-state="open"] {
    animation: fadeIn 150ms ease-in;
  }
  
  &[data-state="closed"] {
    animation: fadeOut 150ms ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
`;

const StyledAlertDialogContent = styled(AlertDialogPrimitive.Content)`
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 50;
  display: grid;
  width: 100%;
  max-width: 32rem;
  transform: translate(-50%, -50%);
  gap: 1rem;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition-duration: 200ms;
  
  @media (min-width: 640px) {
    border-radius: calc(var(--radius));
  }
  
  &[data-state="open"] {
    animation: alertDialogShow 200ms ease-out;
  }
  
  &[data-state="closed"] {
    animation: alertDialogHide 200ms ease-in;
  }
  
  @keyframes alertDialogShow {
    0% {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
    100% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
  
  @keyframes alertDialogHide {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.95);
    }
  }
`;

const StyledAlertDialogHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;
  
  @media (min-width: 640px) {
    text-align: left;
  }
`;

const StyledAlertDialogFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;
  
  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

const StyledAlertDialogTitle = styled(AlertDialogPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
`;

const StyledAlertDialogDescription = styled(AlertDialogPrimitive.Description)`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const StyledAlertDialogAction = styled(AlertDialogPrimitive.Action)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: none;
  cursor: pointer;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));

  &:hover {
    background-color: hsl(var(--primary) / 0.9);
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }
`;

const StyledAlertDialogCancel = styled(AlertDialogPrimitive.Cancel)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  cursor: pointer;
  height: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  margin-top: 0.5rem;

  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }
  
  @media (min-width: 640px) {
    margin-top: 0;
  }
`;

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ ...props }, ref) => (
  <StyledAlertDialogOverlay {...props} ref={ref} />
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;

const AlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Content>
>(({ ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <StyledAlertDialogContent ref={ref} {...props} />
  </AlertDialogPortal>
));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;

const AlertDialogHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledAlertDialogHeader ref={ref} {...props} />
));
AlertDialogHeader.displayName = "AlertDialogHeader";

const AlertDialogFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledAlertDialogFooter ref={ref} {...props} />
));
AlertDialogFooter.displayName = "AlertDialogFooter";

const AlertDialogTitle = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Title>
>(({ ...props }, ref) => (
  <StyledAlertDialogTitle ref={ref} {...props} />
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;

const AlertDialogDescription = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Description>
>(({ ...props }, ref) => (
  <StyledAlertDialogDescription ref={ref} {...props} />
));
AlertDialogDescription.displayName =
  AlertDialogPrimitive.Description.displayName;

const AlertDialogAction = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Action>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Action>
>(({ ...props }, ref) => (
  <StyledAlertDialogAction ref={ref} {...props} />
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;

const AlertDialogCancel = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Cancel>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Cancel>
>(({ ...props }, ref) => (
  <StyledAlertDialogCancel ref={ref} {...props} />
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
