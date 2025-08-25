import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import styled from "@emotion/styled";

const StyledSwitchRoot = styled(SwitchPrimitives.Root)`
  display: inline-flex;
  height: 1.5rem;
  width: 2.75rem;
  flex-shrink: 0;
  cursor: pointer;
  align-items: center;
  border-radius: 9999px;
  border: 2px solid transparent;
  transition: colors 150ms;
  background: hsl(var(--input));

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
    ring-offset-color: hsl(var(--background));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state="checked"] {
    background: hsl(var(--primary));
  }

  &[data-state="unchecked"] {
    background: hsl(var(--input));
  }
`;

const StyledSwitchThumb = styled(SwitchPrimitives.Thumb)`
  pointer-events: none;
  display: block;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 50%;
  background: hsl(var(--background));
  box-shadow: 
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: transform 150ms;

  &[data-state="checked"] {
    transform: translateX(1.25rem);
  }

  &[data-state="unchecked"] {
    transform: translateX(0);
  }
`;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ ...props }, ref) => (
  <StyledSwitchRoot ref={ref} {...props}>
    <StyledSwitchThumb />
  </StyledSwitchRoot>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
