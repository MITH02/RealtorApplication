import * as React from "react";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { ChevronDown } from "lucide-react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

const StyledNavigationMenuRoot = styled(NavigationMenuPrimitive.Root)`
  position: relative;
  z-index: 10;
  display: flex;
  max-width: max-content;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ children, ...props }, ref) => (
  <StyledNavigationMenuRoot ref={ref} {...props}>
    {children}
    <NavigationMenuViewport />
  </StyledNavigationMenuRoot>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const StyledNavigationMenuList = styled(NavigationMenuPrimitive.List)`
  display: flex;
  flex: 1;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  margin: 0;
  padding: 0;
`;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ ...props }, ref) => (
  <StyledNavigationMenuList ref={ref} {...props} />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

// Trigger styles using Emotion instead of cva
const navigationMenuTriggerStyles: CSSObject = {
  display: 'inline-flex',
  height: '2.5rem',
  width: 'max-content',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 'calc(var(--radius))',
  background: 'hsl(var(--background))',
  padding: '0.5rem 1rem',
  fontSize: '0.875rem',
  fontWeight: '500',
  transition: 'colors 150ms',
  cursor: 'pointer',
  border: 'none',
  color: 'hsl(var(--foreground))',

  '&:hover': {
    background: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
  },

  '&:focus': {
    background: 'hsl(var(--accent))',
    color: 'hsl(var(--accent-foreground))',
    outline: 'none',
  },

  '&:disabled': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  '&[data-active]': {
    background: 'hsl(var(--accent) / 0.5)',
  },

  '&[data-state="open"]': {
    background: 'hsl(var(--accent) / 0.5)',
  },
};

const StyledNavigationMenuTrigger = styled(NavigationMenuPrimitive.Trigger)`
  ${navigationMenuTriggerStyles}
`;

const StyledChevronDown = styled(ChevronDown)`
  position: relative;
  top: 1px;
  margin-left: 0.25rem;
  height: 0.75rem;
  width: 0.75rem;
  transition: transform 200ms;

  [data-state="open"] & {
    transform: rotate(180deg);
  }
`;

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <StyledNavigationMenuTrigger ref={ref} {...props}>
    {children}
    <StyledChevronDown aria-hidden="true" />
  </StyledNavigationMenuTrigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const StyledNavigationMenuContent = styled(NavigationMenuPrimitive.Content)`
  left: 0;
  top: 0;
  width: 100%;
  transition: all 200ms;

  &[data-motion^="from-"] {
    animation: navigationContentIn 200ms ease-out;
  }

  &[data-motion^="to-"] {
    animation: navigationContentOut 200ms ease-out;
  }

  @keyframes navigationContentIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes navigationContentOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

  &[data-motion="from-end"] {
    animation: slideInFromRight 200ms ease-out;
  }

  &[data-motion="from-start"] {
    animation: slideInFromLeft 200ms ease-out;
  }

  &[data-motion="to-end"] {
    animation: slideOutToRight 200ms ease-out;
  }

  &[data-motion="to-start"] {
    animation: slideOutToLeft 200ms ease-out;
  }

  @keyframes slideInFromRight {
    from {
      opacity: 0;
      transform: translateX(3.25rem);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      opacity: 0;
      transform: translateX(-3.25rem);
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
      transform: translateX(3.25rem);
    }
  }

  @keyframes slideOutToLeft {
    from {
      opacity: 1;
      transform: translateX(0);
    }
    to {
      opacity: 0;
      transform: translateX(-3.25rem);
    }
  }

  @media (min-width: 768px) {
    position: absolute;
    width: auto;
  }
`;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ ...props }, ref) => (
  <StyledNavigationMenuContent ref={ref} {...props} />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const ViewportContainer = styled.div`
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
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--border));
  background: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
  box-shadow: 
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  transition: all 200ms;

  &[data-state="open"] {
    animation: viewportShow 200ms ease-out;
  }

  &[data-state="closed"] {
    animation: viewportHide 200ms ease-out;
  }

  @keyframes viewportShow {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes viewportHide {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }

  @media (min-width: 768px) {
    width: var(--radix-navigation-menu-viewport-width);
  }
`;

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ ...props }, ref) => (
  <ViewportContainer>
    <StyledNavigationMenuViewport ref={ref} {...props} />
  </ViewportContainer>
));
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const StyledNavigationMenuIndicator = styled(NavigationMenuPrimitive.Indicator)`
  top: 100%;
  z-index: 1;
  display: flex;
  height: 0.375rem;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  transition: all 200ms;

  &[data-state="visible"] {
    animation: indicatorShow 200ms ease-out;
  }

  &[data-state="hidden"] {
    animation: indicatorHide 200ms ease-out;
  }

  @keyframes indicatorShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes indicatorHide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const IndicatorShape = styled.div`
  position: relative;
  top: 60%;
  height: 0.5rem;
  width: 0.5rem;
  transform: rotate(45deg);
  border-radius: 2px 0 0 0;
  background: hsl(var(--border));
  box-shadow: 
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
`;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ ...props }, ref) => (
  <StyledNavigationMenuIndicator ref={ref} {...props}>
    <IndicatorShape />
  </StyledNavigationMenuIndicator>
));
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

// Export the trigger styles for external use (equivalent to the old navigationMenuTriggerStyle)
export const navigationMenuTriggerStyle = navigationMenuTriggerStyles;

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
