import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import styled from "@emotion/styled";

const StyledAvatarRoot = styled(AvatarPrimitive.Root)`
  position: relative;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
`;

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ ...props }, ref) => (
  <StyledAvatarRoot ref={ref} {...props} />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const StyledAvatarImage = styled(AvatarPrimitive.Image)`
  aspect-ratio: 1;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ ...props }, ref) => (
  <StyledAvatarImage ref={ref} {...props} />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const StyledAvatarFallback = styled(AvatarPrimitive.Fallback)`
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  font-weight: 500;
`;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ ...props }, ref) => (
  <StyledAvatarFallback ref={ref} {...props} />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
