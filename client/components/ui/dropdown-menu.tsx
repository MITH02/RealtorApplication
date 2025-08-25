import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import styled from "@emotion/styled";
import { css, keyframes } from "@emotion/react";

const DropdownMenu = DropdownMenuPrimitive.Root;

const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

const DropdownMenuGroup = DropdownMenuPrimitive.Group;

const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

const DropdownMenuSub = DropdownMenuPrimitive.Sub;

const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

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

const StyledDropdownMenuSubTrigger = styled(DropdownMenuPrimitive.SubTrigger)<{
  inset?: boolean;
}>`
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: calc(var(--radius) - 2px);
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  background: transparent;
  border: none;
  color: hsl(var(--foreground));

  &:focus {
    background-color: hsl(var(--accent));
  }

  &[data-state="open"] {
    background-color: hsl(var(--accent));
  }

  ${({ inset }) =>
    inset &&
    css`
      padding-left: 2rem;
    `}

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
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 0.25rem;
  color: hsl(var(--popover-foreground));
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
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

const DropdownMenuSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ ...props }, ref) => (
  <StyledDropdownMenuSubContent ref={ref} {...props} />
));
DropdownMenuSubContent.displayName =
  DropdownMenuPrimitive.SubContent.displayName;

const StyledDropdownMenuContent = styled(DropdownMenuPrimitive.Content)`
  z-index: 50;
  min-width: 8rem;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 0.25rem;
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
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: 0.875rem;
  outline: none;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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

  ${({ inset }) =>
    inset &&
    css`
      padding-left: 2rem;
    `}
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

const StyledDropdownMenuCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem)`
  position: relative;
  display: flex;
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
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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

const CheckboxIndicator = styled.span`
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

const DropdownMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem>
>(({ children, checked, ...props }, ref) => (
  <StyledDropdownMenuCheckboxItem ref={ref} checked={checked} {...props}>
    <CheckboxIndicator>
      <DropdownMenuPrimitive.ItemIndicator>
        <Check />
      </DropdownMenuPrimitive.ItemIndicator>
    </CheckboxIndicator>
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
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  padding-left: 2rem;
  padding-right: 0.5rem;
  font-size: 0.875rem;
  outline: none;
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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

const RadioIndicator = styled.span`
  position: absolute;
  left: 0.5rem;
  display: flex;
  height: 0.875rem;
  width: 0.875rem;
  align-items: center;
  justify-content: center;

  svg {
    height: 0.5rem;
    width: 0.5rem;
    fill: currentColor;
  }
`;

const DropdownMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem>
>(({ children, ...props }, ref) => (
  <StyledDropdownMenuRadioItem ref={ref} {...props}>
    <RadioIndicator>
      <DropdownMenuPrimitive.ItemIndicator>
        <Circle />
      </DropdownMenuPrimitive.ItemIndicator>
    </RadioIndicator>
    {children}
  </StyledDropdownMenuRadioItem>
));
DropdownMenuRadioItem.displayName = DropdownMenuPrimitive.RadioItem.displayName;

const StyledDropdownMenuLabel = styled(DropdownMenuPrimitive.Label)<{
  inset?: boolean;
}>`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
  font-size: 0.875rem;
  font-weight: 600;

  ${({ inset }) =>
    inset &&
    css`
      padding-left: 2rem;
    `}
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
  margin-left: -0.25rem;
  margin-right: -0.25rem;
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
  height: 1px;
  background-color: hsl(var(--muted));
`;

const DropdownMenuSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ ...props }, ref) => (
  <StyledDropdownMenuSeparator ref={ref} {...props} />
));
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
