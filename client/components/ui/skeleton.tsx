import * as React from "react";
import styled from "@emotion/styled";

const StyledSkeleton = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: calc(var(--radius) - 2px);
  background-color: hsl(var(--muted));

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
`;

function Skeleton({ ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <StyledSkeleton {...props} />;
}

export { Skeleton };
