import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const accordionAnimations = css`
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

const Accordion = AccordionPrimitive.Root;

const StyledAccordionItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid hsl(var(--border));
`;

const StyledAccordionHeader = styled(AccordionPrimitive.Header)`
  display: flex;
`;

const StyledAccordionTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  padding-bottom: 1rem;
  font-weight: 500;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }

  &[data-state="open"] > svg {
    transform: rotate(180deg);
  }

  & svg {
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
    transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

const StyledAccordionContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 0.875rem;
  transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &[data-state="closed"] {
    animation: accordion-up 0.2s ease-out;
  }

  &[data-state="open"] {
    animation: accordion-down 0.2s ease-out;
  }
`;

const StyledAccordionContentInner = styled.div`
  padding-bottom: 1rem;
  padding-top: 0;
`;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => <StyledAccordionItem ref={ref} {...props} />);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ children, ...props }, ref) => (
  <>
    <Global styles={accordionAnimations} />
    <StyledAccordionHeader>
      <StyledAccordionTrigger ref={ref} {...props}>
        {children}
        <ChevronDown />
      </StyledAccordionTrigger>
    </StyledAccordionHeader>
  </>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ children, ...props }, ref) => (
  <StyledAccordionContent ref={ref} {...props}>
    <StyledAccordionContentInner>{children}</StyledAccordionContentInner>
  </StyledAccordionContent>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
