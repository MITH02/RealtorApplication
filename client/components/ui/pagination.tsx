import * as React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import styled from "@emotion/styled";
import { CSSObject } from "@emotion/react";

interface PaginationLinkVariantProps {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
}

const getButtonVariantStyles = (
  variant: "outline" | "ghost",
  isActive?: boolean,
): CSSObject => {
  const variants = {
    outline: {
      border: "1px solid hsl(var(--input))",
      backgroundColor: "hsl(var(--background))",
      "&:hover": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
    },
    ghost: {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "hsl(var(--accent))",
        color: "hsl(var(--accent-foreground))",
      },
    },
  };

  return variants[isActive ? "outline" : "ghost"] || variants.ghost;
};

const getButtonSizeStyles = (size: PaginationLinkVariantProps["size"]): CSSObject => {
  const sizes = {
    default: {
      height: "2.5rem",
      paddingLeft: "1rem",
      paddingRight: "1rem",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
    },
    sm: {
      height: "2.25rem",
      borderRadius: "calc(var(--radius) - 2px)",
      paddingLeft: "0.75rem",
      paddingRight: "0.75rem",
    },
    lg: {
      height: "2.75rem",
      borderRadius: "calc(var(--radius) - 2px)",
      paddingLeft: "2rem",
      paddingRight: "2rem",
    },
    icon: {
      height: "2.5rem",
      width: "2.5rem",
    },
  };

  return sizes[size || "default"] || sizes.default;
};

const StyledPagination = styled.nav`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const StyledPaginationContent = styled.ul`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const StyledPaginationItem = styled.li`
  /* Empty base styles for list item */
`;

const StyledPaginationLink = styled.a<PaginationLinkVariantProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  border-radius: calc(var(--radius) - 2px);
  font-size: 0.875rem;
  font-weight: 500;
  ring-offset-color: hsl(var(--background));
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
    box-shadow: 0 0 0 2px hsl(var(--ring));
    ring-offset-width: 2px;
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  & svg {
    pointer-events: none;
    height: 1rem;
    width: 1rem;
    flex-shrink: 0;
  }

  ${(props) => getButtonVariantStyles(props.isActive ? "outline" : "ghost", props.isActive)}
  ${(props) => getButtonSizeStyles(props.size)}
`;

const StyledPaginationPrevious = styled(StyledPaginationLink)`
  gap: 0.25rem;
  padding-left: 0.625rem;
`;

const StyledPaginationNext = styled(StyledPaginationLink)`
  gap: 0.25rem;
  padding-right: 0.625rem;
`;

const StyledPaginationEllipsis = styled.span`
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;
  
  & svg {
    height: 1rem;
    width: 1rem;
  }
`;

const StyledScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const Pagination = React.forwardRef<
  HTMLElement,
  React.ComponentProps<"nav">
>(({ ...props }, ref) => (
  <StyledPagination
    ref={ref}
    role="navigation"
    aria-label="pagination"
    {...props}
  />
));
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ ...props }, ref) => (
  <StyledPaginationContent ref={ref} {...props} />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => (
  <StyledPaginationItem ref={ref} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  size?: "default" | "sm" | "lg" | "icon";
} & React.ComponentProps<"a">;

const PaginationLink = React.forwardRef<
  HTMLAnchorElement,
  PaginationLinkProps
>(({ isActive, size = "icon", ...props }, ref) => (
  <StyledPaginationLink
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    isActive={isActive}
    size={size}
    {...props}
  />
));
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ ...props }, ref) => (
  <StyledPaginationPrevious
    ref={ref}
    aria-label="Go to previous page"
    size="default"
    {...props}
  >
    <ChevronLeft />
    <span>Previous</span>
  </StyledPaginationPrevious>
));
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<typeof PaginationLink>
>(({ ...props }, ref) => (
  <StyledPaginationNext
    ref={ref}
    aria-label="Go to next page"
    size="default"
    {...props}
  >
    <span>Next</span>
    <ChevronRight />
  </StyledPaginationNext>
));
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = React.forwardRef<
  HTMLSpanElement,
  React.ComponentProps<"span">
>(({ ...props }, ref) => (
  <StyledPaginationEllipsis ref={ref} aria-hidden {...props}>
    <MoreHorizontal />
    <StyledScreenReaderText>More pages</StyledScreenReaderText>
  </StyledPaginationEllipsis>
));
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
