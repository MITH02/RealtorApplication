import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { PanelLeft } from "lucide-react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

// Styled Components
const SidebarProviderWrapper = styled.div<{
  hasInsetVariant?: boolean;
}>`
  display: flex;
  min-height: 100svh;
  width: 100%;
  background: ${props => props.hasInsetVariant ? 'hsl(var(--sidebar-background))' : 'inherit'};

  --sidebar-width: ${SIDEBAR_WIDTH};
  --sidebar-width-icon: ${SIDEBAR_WIDTH_ICON};
`;

const SidebarProvider = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = React.useState(false);

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = React.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = React.useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );

    // Helper to toggle the sidebar.
    const toggleSidebar = React.useCallback(() => {
      return isMobile
        ? setOpenMobile((open) => !open)
        : setOpen((open) => !open);
    }, [isMobile, setOpen, setOpenMobile]);

    // Adds a keyboard shortcut to toggle the sidebar.
    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // We add a state so that we can do data-state="expanded" or "collapsed".
    const state = open ? "expanded" : "collapsed";

    const contextValue = React.useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
      ],
    );

    const hasInsetVariant = React.useMemo(() => {
      const checkForInset = (element: React.ReactElement): boolean => {
        if (element?.props?.['data-variant'] === 'inset') return true;
        if (element?.props?.variant === 'inset') return true;
        if (React.Children.count(element?.props?.children) > 0) {
          return React.Children.toArray(element.props.children).some((child) =>
            React.isValidElement(child) ? checkForInset(child) : false
          );
        }
        return false;
      };
      
      return React.Children.toArray(children).some((child) =>
        React.isValidElement(child) ? checkForInset(child) : false
      );
    }, [children]);

    return (
      <SidebarContext.Provider value={contextValue}>
        <TooltipProvider delayDuration={0}>
          <SidebarProviderWrapper
            hasInsetVariant={hasInsetVariant}
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            ref={ref}
            {...props}
          >
            {children}
          </SidebarProviderWrapper>
        </TooltipProvider>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

// Sidebar main component styles
const SidebarWrapper = styled.div<{
  state: "expanded" | "collapsed";
  collapsible: "offcanvas" | "icon" | "none";
  variant: "sidebar" | "floating" | "inset";
  side: "left" | "right";
}>`
  position: relative;
  display: none;
  color: hsl(var(--sidebar-foreground));

  @media (min-width: 768px) {
    display: block;
  }

  &[data-state="${props => props.state}"] {
    /* State is managed via data attributes */
  }

  &[data-collapsible="${props => props.collapsible}"] {
    /* Collapsible state */
  }

  &[data-variant="${props => props.variant}"] {
    /* Variant styling */
  }

  &[data-side="${props => props.side}"] {
    /* Side positioning */
  }
`;

const SidebarGap = styled.div<{
  state: "expanded" | "collapsed";
  collapsible: "offcanvas" | "icon" | "none";
  variant: "sidebar" | "floating" | "inset";
  side: "left" | "right";
}>`
  position: relative;
  height: 100svh;
  width: var(--sidebar-width);
  background: transparent;
  transition: width 200ms ease-linear;

  ${props => props.collapsible === "offcanvas" && props.state === "collapsed" && `
    width: 0;
  `}

  ${props => props.side === "right" && `
    transform: rotate(180deg);
  `}

  ${props => (props.variant === "floating" || props.variant === "inset") && props.state === "collapsed" && props.collapsible === "icon" && `
    width: calc(var(--sidebar-width-icon) + 1rem);
  `}

  ${props => props.variant === "sidebar" && props.state === "collapsed" && props.collapsible === "icon" && `
    width: var(--sidebar-width-icon);
  `}
`;

const SidebarContainer = styled.div<{
  state: "expanded" | "collapsed";
  collapsible: "offcanvas" | "icon" | "none";
  variant: "sidebar" | "floating" | "inset";
  side: "left" | "right";
}>`
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 10;
  display: none;
  height: 100svh;
  width: var(--sidebar-width);
  transition: left 200ms ease-linear, right 200ms ease-linear, width 200ms ease-linear;

  @media (min-width: 768px) {
    display: flex;
  }

  ${props => props.side === "left" && `
    left: 0;
  `}

  ${props => props.side === "right" && `
    right: 0;
  `}

  ${props => props.side === "left" && props.collapsible === "offcanvas" && props.state === "collapsed" && `
    left: calc(var(--sidebar-width) * -1);
  `}

  ${props => props.side === "right" && props.collapsible === "offcanvas" && props.state === "collapsed" && `
    right: calc(var(--sidebar-width) * -1);
  `}

  ${props => (props.variant === "floating" || props.variant === "inset") && `
    padding: 0.5rem;
  `}

  ${props => (props.variant === "floating" || props.variant === "inset") && props.state === "collapsed" && props.collapsible === "icon" && `
    width: calc(var(--sidebar-width-icon) + 1rem + 2px);
  `}

  ${props => props.variant === "sidebar" && props.state === "collapsed" && props.collapsible === "icon" && `
    width: var(--sidebar-width-icon);
  `}

  ${props => props.variant === "sidebar" && props.side === "left" && `
    border-right: 1px solid hsl(var(--border));
  `}

  ${props => props.variant === "sidebar" && props.side === "right" && `
    border-left: 1px solid hsl(var(--border));
  `}
`;

const SidebarInner = styled.div<{
  variant: "sidebar" | "floating" | "inset";
}>`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  background: hsl(var(--sidebar-background));

  ${props => props.variant === "floating" && `
    border-radius: calc(var(--radius) + 2px);
    border: 1px solid hsl(var(--sidebar-border));
    box-shadow: 
      0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);
  `}
`;

const SidebarNonCollapsible = styled.div`
  display: flex;
  height: 100%;
  width: var(--sidebar-width);
  flex-direction: column;
  background: hsl(var(--sidebar-background));
  color: hsl(var(--sidebar-foreground));
`;

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      children,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

    if (collapsible === "none") {
      return (
        <SidebarNonCollapsible ref={ref} {...props}>
          {children}
        </SidebarNonCollapsible>
      );
    }

    if (isMobile) {
      return (
        <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
          <SheetContent
            data-sidebar="sidebar"
            data-mobile="true"
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
                width: "var(--sidebar-width)",
                background: "hsl(var(--sidebar-background))",
                padding: 0,
                color: "hsl(var(--sidebar-foreground))",
              } as React.CSSProperties
            }
            side={side}
          >
            <div style={{ display: "flex", height: "100%", width: "100%", flexDirection: "column" }}>
              {children}
            </div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <SidebarWrapper
        ref={ref}
        state={state}
        collapsible={collapsible}
        variant={variant}
        side={side}
        data-state={state}
        data-collapsible={state === "collapsed" ? collapsible : ""}
        data-variant={variant}
        data-side={side}
      >
        <SidebarGap
          state={state}
          collapsible={collapsible}
          variant={variant}
          side={side}
        />
        <SidebarContainer
          state={state}
          collapsible={collapsible}
          variant={variant}
          side={side}
          {...props}
        >
          <SidebarInner
            variant={variant}
            data-sidebar="sidebar"
          >
            {children}
          </SidebarInner>
        </SidebarContainer>
      </SidebarWrapper>
    );
  },
);
Sidebar.displayName = "Sidebar";

// Sidebar Trigger
const StyledSidebarTrigger = styled(Button)`
  height: 1.75rem;
  width: 1.75rem;

  span {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`;

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <StyledSidebarTrigger
      ref={ref}
      data-sidebar="trigger"
      variant="ghost"
      size="icon"
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelLeft />
      <span>Toggle Sidebar</span>
    </StyledSidebarTrigger>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";

// Sidebar Rail
const StyledSidebarRail = styled.button<{
  side: "left" | "right";
  state: "expanded" | "collapsed";
  collapsible: "offcanvas" | "icon" | "none";
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 20;
  display: none;
  width: 1rem;
  background: transparent;
  border: none;
  padding: 0;
  cursor: ${props => {
    if (props.side === "left") {
      return props.state === "collapsed" ? "e-resize" : "w-resize";
    } else {
      return props.state === "collapsed" ? "w-resize" : "e-resize";
    }
  }};
  transform: translateX(-50%);
  transition: all 200ms ease-linear;

  @media (min-width: 640px) {
    display: flex;
  }

  ${props => props.side === "left" && `
    right: -1rem;
  `}

  ${props => props.side === "right" && `
    left: 0;
  `}

  ${props => props.collapsible === "offcanvas" && `
    transform: translateX(0);
  `}

  ${props => props.collapsible === "offcanvas" && props.side === "left" && `
    right: -0.5rem;
  `}

  ${props => props.collapsible === "offcanvas" && props.side === "right" && `
    left: -0.5rem;
  `}

  ${props => props.collapsible === "offcanvas" && `
    &:hover {
      background: hsl(var(--sidebar-background));
    }
  `}

  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    width: 2px;
    background: transparent;
    transition: background-color 200ms ease-linear;

    ${props => props.collapsible === "offcanvas" && `
      left: 100%;
    `}
  }

  &:hover::after {
    background: hsl(var(--sidebar-border));
  }
`;

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ ...props }, ref) => {
  const { toggleSidebar, state } = useSidebar();

  return (
    <StyledSidebarRail
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      side="left" // This would need to be passed from parent context
      state={state}
      collapsible="offcanvas" // This would need to be passed from parent context
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

// Sidebar Inset
const StyledSidebarInset = styled.main<{
  variant?: "inset";
  state?: "expanded" | "collapsed";
}>`
  position: relative;
  display: flex;
  min-height: 100svh;
  flex: 1;
  flex-direction: column;
  background: hsl(var(--background));

  ${props => props.variant === "inset" && `
    min-height: calc(100svh - 1rem);

    @media (min-width: 768px) {
      margin: 0.5rem;
      border-radius: calc(var(--radius) + 4px);
      box-shadow: 
        0 10px 15px -3px rgb(0 0 0 / 0.1),
        0 4px 6px -4px rgb(0 0 0 / 0.1);
    }

    @media (min-width: 768px) {
      margin-left: 0;
    }

    ${props.state === "collapsed" && `
      @media (min-width: 768px) {
        margin-left: 0.5rem;
      }
    `}
  `}
`;

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main"> & {
    variant?: "inset";
  }
>(({ variant, ...props }, ref) => {
  const { state } = useSidebar();
  
  return (
    <StyledSidebarInset
      ref={ref}
      variant={variant}
      state={state}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

// Sidebar Input
const StyledSidebarInput = styled(Input)`
  height: 2rem;
  width: 100%;
  background: hsl(var(--background));
  box-shadow: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
  }
`;

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ ...props }, ref) => {
  return (
    <StyledSidebarInput
      ref={ref}
      data-sidebar="input"
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

// Basic Layout Components
const SidebarHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
`;
SidebarFooter.displayName = "SidebarFooter";

const StyledSidebarSeparator = styled(Separator)`
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  width: auto;
  background: hsl(var(--sidebar-border));
`;

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ ...props }, ref) => {
  return (
    <StyledSidebarSeparator
      ref={ref}
      data-sidebar="separator"
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = styled.div<{
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
  overflow: auto;

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    overflow: hidden;
  `}
`;
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  padding: 0.5rem;
`;
SidebarGroup.displayName = "SidebarGroup";

// Sidebar Group Label
const StyledSidebarGroupLabel = styled.div<{
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  display: flex;
  height: 2rem;
  flex-shrink: 0;
  align-items: center;
  border-radius: calc(var(--radius));
  padding: 0 0.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: hsl(var(--sidebar-foreground) / 0.7);
  outline: none;
  transition: margin 200ms ease-linear, opacity 200ms ease-linear;

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
  }

  svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    margin-top: -2rem;
    opacity: 0;
  `}
`;

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  const { state } = useSidebar();

  return (
    <StyledSidebarGroupLabel
      as={Comp}
      ref={ref}
      data-sidebar="group-label"
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

// Sidebar Group Action
const StyledSidebarGroupAction = styled.button<{
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  position: absolute;
  right: 0.75rem;
  top: 0.875rem;
  display: flex;
  aspect-ratio: 1;
  width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius));
  padding: 0;
  color: hsl(var(--sidebar-foreground));
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 150ms;

  &:hover {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
  }

  svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -0.5rem;

    @media (min-width: 768px) {
      display: none;
    }
  }

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    display: none;
  `}
`;

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { state } = useSidebar();

  return (
    <StyledSidebarGroupAction
      as={Comp}
      ref={ref}
      data-sidebar="group-action"
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = styled.div`
  width: 100%;
  font-size: 0.875rem;
`;
SidebarGroupContent.displayName = "SidebarGroupContent";

// Sidebar Menu
const SidebarMenu = styled.ul`
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = styled.li`
  position: relative;
`;
SidebarMenuItem.displayName = "SidebarMenuItem";

// Sidebar Menu Button Variants
interface SidebarMenuButtonVariants {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const getSidebarMenuButtonStyles = ({
  variant = "default",
  size = "default",
}: SidebarMenuButtonVariants): CSSObject => {
  const baseStyles: CSSObject = {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "0.5rem",
    overflow: "hidden",
    borderRadius: "calc(var(--radius))",
    padding: "0.5rem",
    textAlign: "left",
    fontSize: "0.875rem",
    outline: "none",
    transition: "width 200ms, height 200ms, padding 200ms",
    color: "hsl(var(--sidebar-foreground))",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    textDecoration: "none",

    "&:hover": {
      background: "hsl(var(--sidebar-accent))",
      color: "hsl(var(--sidebar-accent-foreground))",
    },

    "&:focus-visible": {
      boxShadow: "0 0 0 2px hsl(var(--sidebar-ring))",
    },

    "&:active": {
      background: "hsl(var(--sidebar-accent))",
      color: "hsl(var(--sidebar-accent-foreground))",
    },

    "&:disabled": {
      pointerEvents: "none",
      opacity: 0.5,
    },

    "&[aria-disabled='true']": {
      pointerEvents: "none",
      opacity: 0.5,
    },

    "&[data-active='true']": {
      background: "hsl(var(--sidebar-accent))",
      fontWeight: 500,
      color: "hsl(var(--sidebar-accent-foreground))",
    },

    "&[data-state='open']:hover": {
      background: "hsl(var(--sidebar-accent))",
      color: "hsl(var(--sidebar-accent-foreground))",
    },

    "& > span:last-child": {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    },

    "& > svg": {
      height: "1rem",
      width: "1rem",
      flexShrink: 0,
    },
  };

  // Variant styles
  if (variant === "outline") {
    baseStyles.background = "hsl(var(--background))";
    baseStyles.boxShadow = "0 0 0 1px hsl(var(--sidebar-border))";
    
    baseStyles["&:hover"] = {
      background: "hsl(var(--sidebar-accent))",
      color: "hsl(var(--sidebar-accent-foreground))",
      boxShadow: "0 0 0 1px hsl(var(--sidebar-accent))",
    };
  }

  // Size styles
  if (size === "sm") {
    baseStyles.height = "1.75rem";
    baseStyles.fontSize = "0.75rem";
  } else if (size === "lg") {
    baseStyles.height = "3rem";
    baseStyles.fontSize = "0.875rem";
  } else {
    baseStyles.height = "2rem";
    baseStyles.fontSize = "0.875rem";
  }

  return baseStyles;
};

const StyledSidebarMenuButton = styled.button<
  SidebarMenuButtonVariants & {
    state?: "expanded" | "collapsed";
    collapsible?: "icon";
  }
>`
  ${props => getSidebarMenuButtonStyles(props)}

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    width: 2rem !important;
    height: 2rem !important;
    padding: 0.5rem !important;
  `}
`;

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & SidebarMenuButtonVariants
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();

    const button = (
      <StyledSidebarMenuButton
        as={Comp}
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        variant={variant}
        size={size}
        state={state}
        collapsible="icon"
        {...props}
      />
    );

    if (!tooltip) {
      return button;
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      };
    }

    return (
      <Tooltip>
        <TooltipTrigger asChild>{button}</TooltipTrigger>
        <TooltipContent
          side="right"
          align="center"
          hidden={state !== "collapsed" || isMobile}
          {...tooltip}
        />
      </Tooltip>
    );
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

// Sidebar Menu Action
const StyledSidebarMenuAction = styled.button<{
  showOnHover?: boolean;
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  position: absolute;
  right: 0.25rem;
  top: 0.375rem;
  display: flex;
  aspect-ratio: 1;
  width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius));
  padding: 0;
  color: hsl(var(--sidebar-foreground));
  outline: none;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: transform 150ms;

  &:hover {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
  }

  svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }

  &::after {
    content: "";
    position: absolute;
    inset: -0.5rem;

    @media (min-width: 768px) {
      display: none;
    }
  }

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    display: none;
  `}

  ${props => props.showOnHover && `
    opacity: 0;
    
    .group:focus-within &,
    .group:hover &,
    &[data-state="open"] {
      opacity: 1;
    }

    @media (min-width: 768px) {
      opacity: 0;
    }
  `}
`;

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const { state } = useSidebar();

  return (
    <StyledSidebarMenuAction
      as={Comp}
      ref={ref}
      data-sidebar="menu-action"
      showOnHover={showOnHover}
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";

// Sidebar Menu Badge
const StyledSidebarMenuBadge = styled.div<{
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  position: absolute;
  right: 0.25rem;
  display: flex;
  height: 1.25rem;
  min-width: 1.25rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius));
  padding: 0 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  color: hsl(var(--sidebar-foreground));
  user-select: none;
  pointer-events: none;

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    display: none;
  `}
`;

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ ...props }, ref) => {
  const { state } = useSidebar();
  
  return (
    <StyledSidebarMenuBadge
      ref={ref}
      data-sidebar="menu-badge"
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarMenuBadge.displayName = "SidebarMenuBadge";

// Sidebar Menu Skeleton
const StyledSidebarMenuSkeleton = styled.div`
  border-radius: calc(var(--radius));
  height: 2rem;
  display: flex;
  gap: 0.5rem;
  padding: 0 0.5rem;
  align-items: center;
`;

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <StyledSidebarMenuSkeleton
      ref={ref}
      data-sidebar="menu-skeleton"
      {...props}
    >
      {showIcon && (
        <Skeleton
          style={{ width: "1rem", height: "1rem", borderRadius: "calc(var(--radius))" }}
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        style={{ 
          height: "1rem", 
          flex: 1, 
          maxWidth: width,
        }}
        data-sidebar="menu-skeleton-text"
      />
    </StyledSidebarMenuSkeleton>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

// Sidebar Menu Sub
const StyledSidebarMenuSub = styled.ul<{
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  margin-left: 0.875rem;
  display: flex;
  min-width: 0;
  transform: translateX(1px);
  flex-direction: column;
  gap: 0.25rem;
  border-left: 1px solid hsl(var(--sidebar-border));
  padding-left: 0.625rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  list-style: none;
  margin-top: 0;
  margin-bottom: 0;

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    display: none;
  `}
`;

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ ...props }, ref) => {
  const { state } = useSidebar();
  
  return (
    <StyledSidebarMenuSub
      ref={ref}
      data-sidebar="menu-sub"
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

// Sidebar Menu Sub Button
const StyledSidebarMenuSubButton = styled.a<{
  size?: "sm" | "md";
  isActive?: boolean;
  state?: "expanded" | "collapsed";
  collapsible?: "icon";
}>`
  display: flex;
  height: 1.75rem;
  min-width: 0;
  transform: translateX(-1px);
  align-items: center;
  gap: 0.5rem;
  overflow: hidden;
  border-radius: calc(var(--radius));
  padding: 0 0.5rem;
  color: hsl(var(--sidebar-foreground));
  outline: none;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px hsl(var(--sidebar-ring));
  }

  &:active {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[aria-disabled='true'] {
    pointer-events: none;
    opacity: 0.5;
  }

  & > span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
    color: hsl(var(--sidebar-accent-foreground));
  }

  &[data-active='true'] {
    background: hsl(var(--sidebar-accent));
    color: hsl(var(--sidebar-accent-foreground));
  }

  ${props => props.size === "sm" && `
    font-size: 0.75rem;
  `}

  ${props => props.size === "md" && `
    font-size: 0.875rem;
  `}

  ${props => props.state === "collapsed" && props.collapsible === "icon" && `
    display: none;
  `}
`;

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
  }
>(({ asChild = false, size = "md", isActive, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  const { state } = useSidebar();

  return (
    <StyledSidebarMenuSubButton
      as={Comp}
      ref={ref}
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      size={size}
      isActive={isActive}
      state={state}
      collapsible="icon"
      {...props}
    />
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
