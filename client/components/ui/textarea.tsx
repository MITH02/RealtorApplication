import * as React from "react";
import styled from "@emotion/styled";

const StyledTextarea = styled.textarea`
  display: flex;
  min-height: 5rem;
  width: 100%;
  border-radius: calc(var(--radius));
  border: 1px solid hsl(var(--input));
  background: hsl(var(--background));
  padding: 0.75rem;
  font-size: 0.875rem;
  color: hsl(var(--foreground));
  transition: colors 150ms;
  resize: vertical;

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
    ring-offset-color: hsl(var(--background));
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentPropsWithoutRef<"textarea">
>(({ ...props }, ref) => {
  return <StyledTextarea ref={ref} {...props} />;
});
Textarea.displayName = "Textarea";

export { Textarea };
