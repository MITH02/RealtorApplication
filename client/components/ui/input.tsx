import * as React from "react";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  display: flex;
  height: 2.5rem;
  width: 100%;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  font-size: 1rem;
  ring-offset-color: hsl(var(--background));
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &::file-selector-button {
    border: 0;
    background-color: transparent;
    font-size: 0.875rem;
    font-weight: 500;
    color: hsl(var(--foreground));
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  @media (min-width: 768px) {
    font-size: 0.875rem;
  }
`;

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ type, ...props }, ref) => {
    return (
      <StyledInput
        type={type}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
