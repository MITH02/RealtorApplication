import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import styled from "@emotion/styled";

const StyledRadioGroupRoot = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 0.5rem;
`;

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ ...props }, ref) => {
  return <StyledRadioGroupRoot ref={ref} {...props} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const StyledRadioGroupItem = styled(RadioGroupPrimitive.Item)`
  aspect-ratio: 1;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid hsl(var(--primary));
  background: hsl(var(--background));
  color: hsl(var(--primary));
  cursor: pointer;
  transition: all 150ms;

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
    color: hsl(var(--primary-foreground));
  }
`;

const StyledRadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    height: 0.625rem;
    width: 0.625rem;
    fill: currentColor;
  }
`;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ ...props }, ref) => {
  return (
    <StyledRadioGroupItem ref={ref} {...props}>
      <StyledRadioGroupIndicator>
        <Circle />
      </StyledRadioGroupIndicator>
    </StyledRadioGroupItem>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
