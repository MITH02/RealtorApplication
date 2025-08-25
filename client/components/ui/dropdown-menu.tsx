import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import styled from "@emotion/styled";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<{
  inset?: boolean;
}>`
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: colors 150ms;
  color: hsl(var(--foreground));
  padding-left: ${(props) => (props.inset ? "2rem" : "0.5rem")};

  &:focus {
    background: hsl(var(--accent));
  }

  &[data-state="open"] {
    background: hsl(var(--accent));
  }

  svg {
    margin-left: auto;
    height: 1rem;
    width: 1rem;
  }
`;

const DropdownMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ inset, children, ...props }, ref) => (
  <StyledDropdownMenuSubTrigger ref={ref} inset={inset} {...props}>
    {children}
    <ChevronRight />
  </StyledDropdownMenuSubTrigger>
));
DropdownMenuSubTrigger.displayName =
  DropdownMenuPrimitive.SubTrigger.displayName;

const StyledDropdownMenuSubContent = styled(DropdownMenuPrimitive.SubContent)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--border));
  background: hsl(var(--popover));
  padding: 0.25rem;
  color: hsl(var(--popover-foreground));
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 150ms;

  &[data-state="open"] {
    animation: dropdownContentShow 150ms ease-out;
  }

  &[data-state="closed"] {
    animation: dropdownContentHide 150ms ease-out;
  }

  @keyframes dropdownContentShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes dropdownContentHide {
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
`;

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ ...props }, ref) => <StyledDropdownMenuSubContent ref={ref} {...props} />);
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--border));
  background: hsl(var(--popover));
  padding: 0.25rem;
  color: hsl(var(--popover-foreground));
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
  transition: all 150ms;

  &[data-state="open"] {
    animation: dropdownContentShow 150ms ease-out;
  }

  &[data-state="closed"] {
    animation: dropdownContentHide 150ms ease-out;
  }

  @keyframes dropdownContentShow {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes dropdownContentHide {
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
`;

const DropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
  <DropdownMenuPrimitive.Portal>
    <StyledDropdownMenuContent ref={ref} sideOffset={sideOffset} {...props} />
  </DropdownMenuPrimitive.Portal>
));
DropdownMenuContent.displayName = DropdownMenuPrimitive.Content.displayName;

const StyledDropdownMenuItem = styled(DropdownMenuPrimitive.Item)<{
  inset?: boolean;
}>`
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition: colors 150ms;
  color: hsl(var(--foreground));
  padding-left: ${(props) => (props.inset ? "2rem" : "0.5rem")};

  &:focus {
    background: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  &[data-disabled] {
    pointer-events: none;
    opacity: 0.5;
  }
`;

const DropdownMenuItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ inset, ...props }, ref) => (
  <StyledDropdownMenuItem ref={ref} inset={inset} {...props} />
));
DropdownMenuItem.displayName = DropdownMenuPrimitive.Item.displayName;

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

const StyledDropdownMenuCheckboxItem = styled(
  DropdownMenuPrimitive.CheckboxItem,
)`
  position: relative;
  display: flex;
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

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, checked, ...props }, ref) => (
  <StyledDropdownMenuCheckboxItem ref={ref} checked={checked} {...props}>
    <ItemIndicatorSpan>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check />
      </DropdownMenuPrimitive.ItemIndicator>
    </ItemIndicatorSpan>
    {children}
  </StyledDropdownMenuCheckboxItem>
));
DropdownMenuCheckboxItem.displayName =
  DropdownMenuPrimitive.CheckboxItem.displayName;

const StyledDropdownMenuRadioItem = styled(DropdownMenuPrimitive.RadioItem)`
  position: relative;
  display: flex;
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

const CircleIcon = styled(Circle)`
  height: 0.5rem;
  width: 0.5rem;
  fill: currentColor;
`;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, ...props }, ref) => (
  <StyledDropdownMenuRadioItem ref={ref} {...props}>
    <ItemIndicatorSpan>
      <DropdownMenuPrimitive.ItemIndicator>
        <CircleIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </ItemIndicatorSpan>
    {children}
  </StyledDropdownMenuRadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label)<{
  inset?: boolean;
}>`
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: hsl(var(--foreground));
  padding-left: ${(props) => (props.inset ? "2rem" : "0.5rem")};
`;

const DropdownMenuLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ inset, ...props }, ref) => (
  <StyledDropdownMenuLabel ref={ref} inset={inset} {...props} />
));
DropdownMenuLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const StyledDropdownMenuSeparator = styled(DropdownMenuPrimitive.Separator)`
  margin: 0.25rem -0.25rem;
  height: 1px;
  background: hsl(var(--muted));
`;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ ...props }, ref) => <StyledDropdownMenuSeparator ref={ref} {...props} />);
DropdownMenuSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

const DropdownMenuShortcut = styled.span`
  margin-left: auto;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  opacity: 0.6;
`;
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
};
