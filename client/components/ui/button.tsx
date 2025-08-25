import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

interface ButtonVariantProps {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const getVariantStyles = (
  variant: ButtonVariantProps["variant"],
): CSSObject => {
  const variants = {
    default: {
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--primary) / 0.9)",
      },
    },
    destructive: {
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--destructive) / 0.9)",
      },
    },
    outline: {
      border: "1px solid hsl(var(--input))",
      backgroundColor: "hsl(var(--background))",
      "&:hover": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
    },
    secondary: {
      backgroundColor: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--secondary) / 0.8)",
      },
    },
    ghost: {
      "&:hover": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
    },
    link: {
      color: "hsl(var(--primary))",
      textDecoration: "underline",
      textUnderlineOffset: "4px",
      "&:hover": {
        textDecoration: "underline",
      },
    },
  };

  return variants[variant || "default"] || variants.default;
};

const getSizeStyles = (size: ButtonVariantProps["size"]): CSSObject => {
  const sizes = {
    default: {
      height: "2.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
    },
    sm: {
      height: "2.25rem",
      borderRadius: "calc(var(--radius) - 2px)",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    },
    lg: {
      height: "2.75rem",
      borderRadius: "calc(var(--radius) - 2px)",
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
    icon: {
      height: "2.5rem",
      width: "2.5rem",
    },
  };

  return sizes[size || "default"] || sizes.default;
};

const StyledButton = styled.button<ButtonVariantProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: none;
  cursor: pointer;

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }

  ${(props) => getVariantStyles(props.variant)}
  ${(props) => getSizeStyles(props.size)}
`;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ButtonVariantProps {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "default", size = "default", asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : StyledButton;
    return <Comp variant={variant} size={size} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button };
