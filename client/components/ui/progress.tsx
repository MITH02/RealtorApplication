import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import styled from "@emotion/styled";

const StyledProgressRoot = styled(ProgressPrimitive.Root)`
  position: relative;
  height: 1rem;
  width: 100%;
  overflow: hidden;
  border-radius: 9999px;
  background-color: hsl(var(--secondary));
`;

const StyledProgressIndicator = styled(ProgressPrimitive.Indicator)<{
  value?: number;
}>`
  height: 100%;
  width: 100%;
  flex: 1;
  background-color: hsl(var(--primary));
  transition: all 150ms ease-in-out;
  transform: ${({ value }) => `translateX(-${100 - (value || 0)}%)`};
`;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ value, ...props }, ref) => (
  <StyledProgressRoot ref={ref} {...props}>
    <StyledProgressIndicator value={value} />
  </StyledProgressRoot>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
