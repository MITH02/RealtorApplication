import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";
import styled from "@emotion/styled";

const StyledRadioGroup = styled(RadioGroupPrimitive.Root)`
  display: grid;
  gap: 0.5rem;
`;

const StyledRadioGroupItem = styled(RadioGroupPrimitive.Item)`
  aspect-ratio: 1;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  border: 1px solid hsl(var(--primary));
  color: hsl(var(--primary));
  ring-offset-color: hsl(var(--background));

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const StyledRadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & svg {
    height: 0.625rem;
    width: 0.625rem;
    fill: currentColor;
    color: currentColor;
  }
`;

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ ...props }, ref) => {
  return (
    <StyledRadioGroup
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ ...props }, ref) => {
  return (
    <StyledRadioGroupItem
      ref={ref}
      {...props}
    >
      <StyledRadioGroupIndicator>
        <Circle />
      </StyledRadioGroupIndicator>
    </StyledRadioGroupItem>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
