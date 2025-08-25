import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

// Keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translateY(-0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-0.5rem);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(0.5rem);
  }
  to {
    transform: translateY(0);
  }
`;

const StyledPopoverContent = styled(PopoverPrimitive.Content)`
  z-index: 50;
  width: 18rem;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 1rem;
  color: hsl(var(--popover-foreground));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  outline: none;
  animation-duration: 200ms;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;

  &[data-state="open"] {
    animation-name: ${fadeIn}, ${scaleIn};
  }

  &[data-state="closed"] {
    animation-name: ${fadeOut}, ${scaleOut};
  }

  &[data-side="bottom"] {
    animation-name: ${fadeIn}, ${scaleIn}, ${slideInFromTop};
  }

  &[data-side="left"] {
    animation-name: ${fadeIn}, ${scaleIn}, ${slideInFromRight};
  }

  &[data-side="right"] {
    animation-name: ${fadeIn}, ${scaleIn}, ${slideInFromLeft};
  }

  &[data-side="top"] {
    animation-name: ${fadeIn}, ${scaleIn}, ${slideInFromBottom};
  }
`;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <StyledPopoverContent
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
