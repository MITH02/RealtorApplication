import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import styled from "@emotion/styled";

const StyledNavigationMenu = styled(NavigationMenuPrimitive.Root)`
  position: relative;
  z-index: 10;
  display: flex;
  max-width: max-content;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledNavigationMenuList = styled(NavigationMenuPrimitive.List)`
  display: flex;
  flex: 1;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
  &:focus-within {
    & > * {
      /* group styles when focused */
    }
  }
`;

const StyledNavigationMenuTrigger = styled(NavigationMenuPrimitive.Trigger)`
  display: inline-flex;
  height: 2.5rem;
  width: max-content;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  background-color: hsl(var(--background));
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }
  
  &:focus {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
    outline: none;
  }
  
  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }
  
  &[data-active] {
    background-color: hsl(var(--accent) / 0.5);
  }
  
  &[data-state="open"] {
    background-color: hsl(var(--accent) / 0.5);
  }
  
  & svg {
    position: relative;
    top: 1px;
    margin-left: 0.25rem;
    height: 0.75rem;
    width: 0.75rem;
    transition: transform 200ms ease;
  }
  
  &[data-state="open"] svg {
    transform: rotate(180deg);
  }
`;

const StyledNavigationMenuContent = styled(NavigationMenuPrimitive.Content)`
  left: 0;
  top: 0;
  width: 100%;
  
  &[data-motion^="from-"] {
    animation: slideIn 200ms ease;
  }
  
  &[data-motion^="to-"] {
    animation: slideOut 200ms ease;
  }
  
  &[data-motion="from-end"] {
    animation: slideInFromRight 200ms ease;
  }
  
  &[data-motion="from-start"] {
    animation: slideInFromLeft 200ms ease;
  }
  
  &[data-motion="to-end"] {
    animation: slideOutToRight 200ms ease;
  }
  
  &[data-motion="to-start"] {
    animation: slideOutToLeft 200ms ease;
  }
  
  @media (min-width: 768px) {
    position: absolute;
    width: auto;
  }
  
  @keyframes slideIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideOut {
    from { opacity: 1; }
    to { opacity: 0; }
  }
  
  @keyframes slideInFromRight {
    from { 
      opacity: 0;
      transform: translateX(52px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInFromLeft {
    from { 
      opacity: 0;
      transform: translateX(-52px);
    }
    to { 
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideOutToRight {
    from { 
      opacity: 1;
      transform: translateX(0);
    }
    to { 
      opacity: 0;
      transform: translateX(52px);
    }
  }
  
  @keyframes slideOutToLeft {
    from { 
      opacity: 1;
      transform: translateX(0);
    }
    to { 
      opacity: 0;
      transform: translateX(-52px);
    }
  }
`;

const StyledNavigationMenuViewportContainer = styled.div`
  position: absolute;
  left: 0;
  top: 100%;
  display: flex;
  justify-content: center;
`;

const StyledNavigationMenuViewport = styled(NavigationMenuPrimitive.Viewport)`
  transform-origin: top center;
  position: relative;
  margin-top: 0.375rem;
  height: var(--radix-navigation-menu-viewport-height);
  width: 100%;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  
  &[data-state="open"] {
    animation: zoomIn 200ms ease;
  }
  
  &[data-state="closed"] {
    animation: zoomOut 200ms ease;
  }
  
  @media (min-width: 768px) {
    width: var(--radix-navigation-menu-viewport-width);
  }
  
  @keyframes zoomIn {
    from { 
      opacity: 0;
      transform: scale(0.9);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes zoomOut {
    from { 
      opacity: 1;
      transform: scale(1);
    }
    to { 
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;

const StyledNavigationMenuIndicator = styled(NavigationMenuPrimitive.Indicator)`
  top: 100%;
  z-index: 1;
  display: flex;
  height: 0.375rem;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  
  &[data-state="visible"] {
    animation: fadeIn 200ms ease;
  }
  
  &[data-state="hidden"] {
    animation: fadeOut 200ms ease;
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

const StyledIndicatorArrow = styled.div`
  position: relative;
  top: 60%;
  height: 0.5rem;
  width: 0.5rem;
  transform: rotate(45deg);
  border-top-left-radius: calc(var(--radius) - 4px);
  background-color: hsl(var(--border));
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, ...props }, ref) => (
  <StyledNavigationMenu ref={ref} {...props}>
    {children}
    <NavigationMenuViewport />
  </StyledNavigationMenu>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ ...props }, ref) => (
  <StyledNavigationMenuList ref={ref} {...props} />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <StyledNavigationMenuTrigger ref={ref} {...props}>
    {children}{" "}
    <ChevronDown aria-hidden="true" />
  </StyledNavigationMenuTrigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ ...props }, ref) => (
  <StyledNavigationMenuContent ref={ref} {...props} />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ ...props }, ref) => (
  <StyledNavigationMenuViewportContainer>
    <StyledNavigationMenuViewport ref={ref} {...props} />
  </StyledNavigationMenuViewportContainer>
));
NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ ...props }, ref) => (
  <StyledNavigationMenuIndicator ref={ref} {...props}>
    <StyledIndicatorArrow />
  </StyledNavigationMenuIndicator>
));
NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};
