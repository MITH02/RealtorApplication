import * as React from "react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

interface AlertVariantProps {
  variant?: "default" | "destructive";
}

const getVariantStyles = (variant: AlertVariantProps["variant"]): CSSObject => {
  const variants = {
    default: {
      backgroundColor: "hsl(var(--background))",
      color: "hsl(var(--foreground))",
    },
    destructive: {
      borderColor: "hsl(var(--destructive) / 0.5)",
      color: "hsl(var(--destructive))",
      "& svg": {
        color: "hsl(var(--destructive))",
      },
    },
  };

  return variants[variant || "default"] || variants.default;
};

const StyledAlert = styled.div<AlertVariantProps>`
  position: relative;
  width: 100%;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  padding: 1rem;

  & > svg ~ * {
    padding-left: 1.75rem;
  }

  & > svg + div {
    transform: translateY(-3px);
  }

  & > svg {
    position: absolute;
    left: 1rem;
    top: 1rem;
    color: hsl(var(--foreground));
  }

  ${(props) => getVariantStyles(props.variant)}
`;

const StyledAlertTitle = styled.h5`
  margin-bottom: 0.25rem;
  font-weight: 500;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const StyledAlertDescription = styled.div`
  font-size: 0.875rem;

  & p {
    line-height: 1.625;
  }
`;

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & AlertVariantProps
>(({ variant = "default", ...props }, ref) => (
  <StyledAlert ref={ref} role="alert" variant={variant} {...props} />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ ...props }, ref) => <StyledAlertTitle ref={ref} {...props} />);
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => <StyledAlertDescription ref={ref} {...props} />);
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
