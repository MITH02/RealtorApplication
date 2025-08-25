import * as SheetPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import * as React from "react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

const Sheet = SheetPrimitive.Root;
const SheetTrigger = SheetPrimitive.Trigger;
const SheetClose = SheetPrimitive.Close;
const SheetPortal = SheetPrimitive.Portal;

const StyledSheetOverlay = styled(SheetPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);

  &[data-state="open"] {
    animation: fadeIn 150ms ease-in;
  }

  &[data-state="closed"] {
    animation: fadeOut 150ms ease-out;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

interface SheetContentProps {
  side?: "top" | "right" | "bottom" | "left";
}

const getSheetContentStyles = (side: SheetContentProps["side"]): CSSObject => {
  const baseStyles: CSSObject = {
    position: "fixed",
    zIndex: 50,
    gap: "1rem",
    backgroundColor: "hsl(var(--background))",
    padding: "1.5rem",
    boxShadow:
      "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    transition: "all 150ms ease-in-out",
  };

  const variants = {
    top: {
      ...baseStyles,
      insetInline: 0,
      top: 0,
      borderBottom: "1px solid hsl(var(--border))",
      "&[data-state='closed']": {
        animationDuration: "300ms",
        animationFillMode: "forwards",
        animationName: "slideOutToTop",
      },
      "&[data-state='open']": {
        animationDuration: "500ms",
        animationFillMode: "forwards",
        animationName: "slideInFromTop",
      },
    },
    bottom: {
      ...baseStyles,
      insetInline: 0,
      bottom: 0,
      borderTop: "1px solid hsl(var(--border))",
      "&[data-state='closed']": {
        animationDuration: "300ms",
        animationFillMode: "forwards",
        animationName: "slideOutToBottom",
      },
      "&[data-state='open']": {
        animationDuration: "500ms",
        animationFillMode: "forwards",
        animationName: "slideInFromBottom",
      },
    },
    left: {
      ...baseStyles,
      insetBlock: 0,
      left: 0,
      height: "100%",
      width: "75%",
      borderRight: "1px solid hsl(var(--border))",
      "@media (min-width: 640px)": {
        maxWidth: "24rem",
      },
      "&[data-state='closed']": {
        animationDuration: "300ms",
        animationFillMode: "forwards",
        animationName: "slideOutToLeft",
      },
      "&[data-state='open']": {
        animationDuration: "500ms",
        animationFillMode: "forwards",
        animationName: "slideInFromLeft",
      },
    },
    right: {
      ...baseStyles,
      insetBlock: 0,
      right: 0,
      height: "100%",
      width: "75%",
      borderLeft: "1px solid hsl(var(--border))",
      "@media (min-width: 640px)": {
        maxWidth: "24rem",
      },
      "&[data-state='closed']": {
        animationDuration: "300ms",
        animationFillMode: "forwards",
        animationName: "slideOutToRight",
      },
      "&[data-state='open']": {
        animationDuration: "500ms",
        animationFillMode: "forwards",
        animationName: "slideInFromRight",
      },
    },
  };

  return variants[side || "right"];
};

const StyledSheetContent = styled(SheetPrimitive.Content)<SheetContentProps>`
  ${(props) => getSheetContentStyles(props.side)}

  @keyframes slideOutToTop {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-100%);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideOutToBottom {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideOutToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-100%);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideOutToRight {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(100%);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
`;

const StyledCloseButton = styled(SheetPrimitive.Close)`
  position: absolute;
  right: 1rem;
  top: 1rem;
  border-radius: calc(var(--radius) - 2px);
  opacity: 0.7;
  ring-offset-color: hsl(var(--background));
  transition: opacity 150ms ease-in-out;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
  }

  &[data-state="open"] {
    background-color: hsl(var(--secondary));
  }

  & svg {
    height: 1rem;
    width: 1rem;
  }
`;

const StyledScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const StyledSheetHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const StyledSheetFooter = styled.div`
  display: flex;
  flex-direction: column-reverse;

  @media (min-width: 640px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: 0.5rem;
  }
`;

const StyledSheetTitle = styled(SheetPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  color: hsl(var(--foreground));
`;

const StyledSheetDescription = styled(SheetPrimitive.Description)`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ ...props }, ref) => <StyledSheetOverlay {...props} ref={ref} />);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> {
  side?: "top" | "right" | "bottom" | "left";
}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = "right", children, ...props }, ref) => (
  <SheetPortal>
    <SheetOverlay />
    <StyledSheetContent ref={ref} side={side} {...props}>
      {children}
      <StyledCloseButton>
        <X />
        <StyledScreenReaderText>Close</StyledScreenReaderText>
      </StyledCloseButton>
    </StyledSheetContent>
  </SheetPortal>
));
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <StyledSheetHeader ref={ref} {...props} />);
SheetHeader.displayName = "SheetHeader";

const SheetFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <StyledSheetFooter ref={ref} {...props} />);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ ...props }, ref) => <StyledSheetTitle ref={ref} {...props} />);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ ...props }, ref) => <StyledSheetDescription ref={ref} {...props} />);
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
};
