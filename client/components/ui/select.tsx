import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

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

const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  background: hsl(var(--background));
  color: hsl(var(--foreground));

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  & > span {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  svg {
    height: 1rem;
    width: 1rem;
    opacity: 0.5;
  }
`;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <StyledSelectTrigger ref={ref} {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown />
    </SelectPrimitive.Icon>
  </StyledSelectTrigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const StyledSelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;

  svg {
    height: 1rem;
    width: 1rem;
  }
`;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ ...props }, ref) => (
  <StyledSelectScrollUpButton ref={ref} {...props}>
    <ChevronUp />
  </StyledSelectScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const StyledSelectScrollDownButton = styled(SelectPrimitive.ScrollDownButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;

  svg {
    height: 1rem;
    width: 1rem;
  }
`;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ ...props }, ref) => (
  <StyledSelectScrollDownButton ref={ref} {...props}>
    <ChevronDown />
  </StyledSelectScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const StyledSelectContent = styled(SelectPrimitive.Content)<{
  position?: "popper" | "item-aligned";
}>`
  position: relative;
  z-index: 50;
  max-height: 24rem;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
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

  ${({ position }) =>
    position === "popper" &&
    css`
      &[data-side="bottom"] {
        transform: translateY(0.25rem);
      }

      &[data-side="left"] {
        transform: translateX(-0.25rem);
      }

      &[data-side="right"] {
        transform: translateX(0.25rem);
      }

      &[data-side="top"] {
        transform: translateY(-0.25rem);
      }
    `}
`;

const StyledSelectViewport = styled(SelectPrimitive.Viewport)<{
  position?: "popper" | "item-aligned";
}>`
  padding: 0.25rem;

  ${({ position }) =>
    position === "popper" &&
    css`
      height: var(--radix-select-trigger-height);
      width: 100%;
      min-width: var(--radix-select-trigger-width);
    `}
`;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <StyledSelectContent ref={ref} position={position} {...props}>
      <SelectScrollUpButton />
      <StyledSelectViewport position={position}>
        {children}
      </StyledSelectViewport>
      <SelectScrollDownButton />
    </StyledSelectContent>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const StyledSelectLabel = styled(SelectPrimitive.Label)`
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 2rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
`;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ ...props }, ref) => <StyledSelectLabel ref={ref} {...props} />);
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 2rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  background: transparent;
  border: none;
  color: hsl(var(--foreground));

  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SelectItemIndicator = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;

  svg {
    height: 1rem;
    width: 1rem;
  }
`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <StyledSelectItem ref={ref} {...props}>
    <SelectItemIndicator>
      <SelectPrimitive.ItemIndicator>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </SelectItemIndicator>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const StyledSelectSeparator = styled(SelectPrimitive.Separator)`
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 1px;
  background-color: hsl(var(--muted));
`;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ ...props }, ref) => <StyledSelectSeparator ref={ref} {...props} />);
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
