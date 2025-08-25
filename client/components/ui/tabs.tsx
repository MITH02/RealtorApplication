import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import styled from "@emotion/styled";

const Tabs = TabsPrimitive.Root;

const StyledTabsList = styled(TabsPrimitive.List)`
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  border-radius: calc(var(--radius));
  background: hsl(var(--muted));
  padding: 0.25rem;
  color: hsl(var(--muted-foreground));
`;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ ...props }, ref) => <StyledTabsList ref={ref} {...props} />);
TabsList.displayName = TabsPrimitive.List.displayName;

const StyledTabsTrigger = styled(TabsPrimitive.Trigger)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: calc(var(--radius) - 2px);
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 150ms;
  background: transparent;
  border: none;
  cursor: pointer;
  color: hsl(var(--muted-foreground));

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
    ring-offset-color: hsl(var(--background));
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &[data-state="active"] {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    box-shadow:
      0 1px 3px 0 rgb(0 0 0 / 0.1),
      0 1px 2px -1px rgb(0 0 0 / 0.1);
  }
`;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ ...props }, ref) => <StyledTabsTrigger ref={ref} {...props} />);
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const StyledTabsContent = styled(TabsPrimitive.Content)`
  margin-top: 0.5rem;

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
    ring-offset-color: hsl(var(--background));
  }
`;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ ...props }, ref) => <StyledTabsContent ref={ref} {...props} />);
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
