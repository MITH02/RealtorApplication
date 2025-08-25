import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import styled from "@emotion/styled";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const StyledSelectTrigger = styled(SelectPrimitive.Trigger)`
  display: flex;
  height: 2.5rem;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition: colors 150ms;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
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
`;

const StyledSelectIcon = styled(SelectPrimitive.Icon)`
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
    <StyledSelectIcon asChild>
      <ChevronDown />
    </StyledSelectIcon>
  </StyledSelectTrigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const StyledSelectScrollUpButton = styled(SelectPrimitive.ScrollUpButton)`
  display: flex;
  cursor: default;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0;

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
  padding: 0.25rem 0;

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
  position?: "item-aligned" | "popper";
}>`
  position: relative;
  z-index: 50;
  max-height: 24rem;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--border));
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 150ms;

  &[data-state="open"] {
    animation: selectContentShow 150ms ease-out;
  }

  &[data-state="closed"] {
    animation: selectContentHide 150ms ease-out;
  }

  @keyframes selectContentShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes selectContentHide {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  &[data-side="bottom"] {
    transform-origin: top;
  }

  &[data-side="left"] {
    transform-origin: right;
  }

  &[data-side="right"] {
    transform-origin: left;
  }

  &[data-side="top"] {
    transform-origin: bottom;
  }

  ${props => props.position === "popper" && `
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
  position?: "item-aligned" | "popper";
}>`
  padding: 0.25rem;

  ${props => props.position === "popper" && `
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
  padding: 0.375rem 2rem 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ ...props }, ref) => (
  <StyledSelectLabel ref={ref} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const ItemIndicatorSpan = styled.span`
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

const StyledSelectItem = styled(SelectPrimitive.Item)`
  position: relative;
  display: flex;
  width: 100%;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem 0.375rem 2rem;
  font-size: 0.875rem;
  outline: none;
  transition: colors 150ms;
  color: hsl(var(--foreground));

  &:focus {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, ...props }, ref) => (
  <StyledSelectItem ref={ref} {...props}>
    <ItemIndicatorSpan>
      <SelectPrimitive.ItemIndicator>
        <Check />
      </SelectPrimitive.ItemIndicator>
    </ItemIndicatorSpan>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </StyledSelectItem>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const StyledSelectSeparator = styled(SelectPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background: hsl(var(--muted));
`;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ ...props }, ref) => (
  <StyledSelectSeparator ref={ref} {...props} />
));
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
