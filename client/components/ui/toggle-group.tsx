import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
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

const StyledToggleGroup = styled(ToggleGroupPrimitive.Root)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
`;

const StyledToggleGroupItem = styled(
  ToggleGroupPrimitive.Item,
)<ToggleVariantProps>`
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

const ToggleGroupContext = React.createContext<ToggleVariantProps>({
  size: "default",
  variant: "default",
});

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    ToggleVariantProps
>(({ variant = "default", size = "default", children, ...props }, ref) => (
  <StyledToggleGroup ref={ref} {...props}>
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </StyledToggleGroup>
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    ToggleVariantProps
>(({ children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext);

  return (
    <StyledToggleGroupItem
      ref={ref}
      variant={context.variant || variant}
      size={context.size || size}
      {...props}
    >
      {children}
    </StyledToggleGroupItem>
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
