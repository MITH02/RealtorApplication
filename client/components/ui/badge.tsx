import * as React from "react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

interface BadgeVariantProps {
  variant?: "default" | "secondary" | "destructive" | "outline";
}

const getVariantStyles = (variant: BadgeVariantProps["variant"]): CSSObject => {
  const variants = {
    default: {
      border: "1px solid transparent",
      backgroundColor: "hsl(var(--primary))",
      color: "hsl(var(--primary-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--primary) / 0.8)",
      },
    },
    secondary: {
      border: "1px solid transparent",
      backgroundColor: "hsl(var(--secondary))",
      color: "hsl(var(--secondary-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--secondary) / 0.8)",
      },
    },
    destructive: {
      border: "1px solid transparent",
      backgroundColor: "hsl(var(--destructive))",
      color: "hsl(var(--destructive-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--destructive) / 0.8)",
      },
    },
    outline: {
      color: "hsl(var(--foreground))",
    },
  };

  return variants[variant || "default"] || variants.default;
};

const StyledBadge = styled.div<BadgeVariantProps>`
  display: inline-flex;
  align-items: center;
  border-radius: 9999px;
  border: 1px solid;
  padding-left: 0.625rem;
  padding-right: 0.625rem;
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
  font-size: 0.75rem;
  font-weight: 600;
  transition-property:
    color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:focus {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  ${(props) => getVariantStyles(props.variant)}
`;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BadgeVariantProps {}

function Badge({ variant = "default", ...props }: BadgeProps) {
  return <StyledBadge variant={variant} {...props} />;
}

export { Badge };
