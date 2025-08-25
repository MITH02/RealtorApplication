import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import styled from "@emotion/styled";

const StyledCheckboxRoot = styled(CheckboxPrimitive.Root)`
  height: 1rem;
  width: 1rem;
  flex-shrink: 0;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--primary));
  ring-offset-color: hsl(var(--background));

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[data-state="checked"] {
    background-color: hsl(var(--primary));
    color: hsl(var(--primary-foreground));
  }
`;

const StyledCheckboxIndicator = styled(CheckboxPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  color: currentColor;

  & svg {
    height: 1rem;
    width: 1rem;
  }
`;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ ...props }, ref) => (
  <StyledCheckboxRoot ref={ref} {...props}>
    <StyledCheckboxIndicator>
      <Check />
    </StyledCheckboxIndicator>
  </StyledCheckboxRoot>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
