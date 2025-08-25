import * as React from "react";
import styled from "@emotion/styled";

const StyledCard = styled.div`
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
`;

const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  padding: 1.5rem;
`;

const StyledCardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const StyledCardDescription = styled.p`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const StyledCardContent = styled.div`
  padding: 1.5rem;
  padding-top: 0;
`;

const StyledCardFooter = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5rem;
  padding-top: 0;
`;

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledCard ref={ref} {...props} />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledCardHeader ref={ref} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ ...props }, ref) => (
  <StyledCardTitle ref={ref} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ ...props }, ref) => (
  <StyledCardDescription ref={ref} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledCardContent ref={ref} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <StyledCardFooter ref={ref} {...props} />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
