import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

interface ToggleVariantProps {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
}

const getToggleVariantStyles = (
  variant: ToggleVariantProps["variant"],
): CSSObject => {
  const variants = {
    default: {
      backgroundColor: "transparent",
    },
    outline: {
      border: "1px solid hsl(var(--input))",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
    },
  };

  return variants[variant || "default"] || variants.default;
};

const getToggleSizeStyles = (size: ToggleVariantProps["size"]): CSSObject => {
  const sizes = {
    default: {
      height: "2.5rem",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    },
    sm: {
      height: "2.25rem",
      paddingLeft: "0.625rem",
      paddingRight: "0.625rem",
    },
    lg: {
      height: "2.75rem",
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
    },
  };

  return sizes[size || "default"] || sizes.default;
};

const StyledToggle = styled(TogglePrimitive.Root)<ToggleVariantProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition-property: color, background-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: hsl(var(--muted));
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="on"] {
    background-color: hsl(var(--accent));
    color: hsl(var(--accent-foreground));
  }

  ${(props) => getToggleVariantStyles(props.variant)}
  ${(props) => getToggleSizeStyles(props.size)}
`;

export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    ToggleVariantProps {}

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ variant = "default", size = "default", ...props }, ref) => (
  <StyledToggle variant={variant} size={size} ref={ref} {...props} />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle };
