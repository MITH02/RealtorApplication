import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styled from "@emotion/styled";

const Accordion = AccordionPrimitive.Root;

const StyledAccordionItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid hsl(var(--border));
`;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => (
  <StyledAccordionItem ref={ref} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const StyledAccordionTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
  font-weight: 500;
  transition: all 150ms;
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--foreground));
  width: 100%;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }

  &[data-state="open"] svg {
    transform: rotate(180deg);
  }

  svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
    transition: transform 200ms;
  }
`;

const AccordionTriggerHeader = styled(AccordionPrimitive.Header)`
  display: flex;
`;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <AccordionTriggerHeader>
    <StyledAccordionTrigger ref={ref} {...props}>
      {children}
      <ChevronDown />
    </StyledAccordionTrigger>
  </AccordionTriggerHeader>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const StyledAccordionContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 0.875rem;
  transition: all 150ms;

  &[data-state="closed"] {
    animation: accordion-up 150ms ease-out;
  }

  &[data-state="open"] {
    animation: accordion-down 150ms ease-out;
  }

  @keyframes accordion-down {
    from {
      height: 0;
    }
    to {
      height: var(--radix-accordion-content-height);
    }
  }

  @keyframes accordion-up {
    from {
      height: var(--radix-accordion-content-height);
    }
    to {
      height: 0;
    }
  }
`;

const AccordionContentInner = styled.div`
  padding-bottom: 1rem;
  padding-top: 0;
`;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
  <StyledAccordionContent ref={ref} {...props}>
    <AccordionContentInner>{children}</AccordionContentInner>
  </StyledAccordionContent>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
