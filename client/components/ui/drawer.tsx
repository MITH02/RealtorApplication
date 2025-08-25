import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import styled from "@emotion/styled";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const StyledDrawerOverlay = styled(DrawerPrimitive.Overlay)`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: rgb(0 0 0 / 0.8);
`;

const StyledDrawerContent = styled(DrawerPrimitive.Content)`
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 50;
  margin-top: 6rem;
  display: flex;
  height: auto;
  flex-direction: column;
  border-radius: 10px 10px 0 0;
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
`;

const StyledDrawerHandle = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  height: 0.5rem;
  width: 100px;
  border-radius: 9999px;
  background-color: hsl(var(--muted));
`;

const StyledDrawerHeader = styled.div`
  display: grid;
  gap: 0.375rem;
  padding: 1rem;
  text-align: center;

  @media (min-width: 640px) {
    text-align: left;
  }
`;

const StyledDrawerFooter = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
`;

const StyledDrawerTitle = styled(DrawerPrimitive.Title)`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.025em;
`;

const StyledDrawerDescription = styled(DrawerPrimitive.Description)`
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ ...props }, ref) => <StyledDrawerOverlay ref={ref} {...props} />);
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <StyledDrawerContent ref={ref} {...props}>
      <StyledDrawerHandle />
      {children}
    </StyledDrawerContent>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <StyledDrawerHeader ref={ref} {...props} />);
DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => <StyledDrawerFooter ref={ref} {...props} />);
DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ ...props }, ref) => <StyledDrawerTitle ref={ref} {...props} />);
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ ...props }, ref) => <StyledDrawerDescription ref={ref} {...props} />);
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
};
