import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import styled from "@emotion/styled";

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const StyledTooltipContent = styled(TooltipPrimitive.Content)`
  z-index: 50;
  overflow: hidden;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--popover-foreground));
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);

  &[data-state="open"] {
    animation:
      fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomIn 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-state="closed"] {
    animation:
      fadeOut 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomOut 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-side="bottom"] {
    animation:
      fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      slideInFromTop 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-side="left"] {
    animation:
      fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      slideInFromRight 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-side="right"] {
    animation:
      fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      slideInFromLeft 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  &[data-side="top"] {
    animation:
      fadeIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      zoomIn 150ms cubic-bezier(0.16, 1, 0.3, 1),
      slideInFromBottom 150ms cubic-bezier(0.16, 1, 0.3, 1);
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

  @keyframes zoomIn {
    from {
      transform: scale(0.95);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes zoomOut {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.95);
    }
  }

  @keyframes slideInFromTop {
    from {
      transform: translateY(-2px);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slideInFromRight {
    from {
      transform: translateX(2px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromLeft {
    from {
      transform: translateX(-2px);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes slideInFromBottom {
    from {
      transform: translateY(2px);
    }
    to {
      transform: translateY(0);
    }
  }
`;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ sideOffset = 4, ...props }, ref) => (
  <StyledTooltipContent ref={ref} sideOffset={sideOffset} {...props} />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
