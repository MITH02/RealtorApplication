import * as React from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { Slot } from "@radix-ui/react-slot";
import styled from "@emotion/styled";

const StyledBreadcrumbNav = styled.nav`
  & > ol {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.375rem;
    break-word: break-all;
    font-size: 0.875rem;
    color: hsl(var(--muted-foreground));

    @media (min-width: 640px) {
      gap: 0.625rem;
    }
  }
`;

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ComponentType<any>;
  }
>(({ ...props }, ref) => (
  <StyledBreadcrumbNav ref={ref} aria-label="breadcrumb" {...props} />
));
Breadcrumb.displayName = "Breadcrumb";

const StyledBreadcrumbList = styled.ol`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ ...props }, ref) => <StyledBreadcrumbList ref={ref} {...props} />);
BreadcrumbList.displayName = "BreadcrumbList";

const StyledBreadcrumbItem = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
`;

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ ...props }, ref) => <StyledBreadcrumbItem ref={ref} {...props} />);
BreadcrumbItem.displayName = "BreadcrumbItem";

const StyledBreadcrumbLink = styled.a`
  transition: colors 150ms;
  color: hsl(var(--foreground));
  text-decoration: none;

  &:hover {
    color: hsl(var(--foreground));
  }
`;

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return <StyledBreadcrumbLink as={Comp} ref={ref} {...props} />;
});
BreadcrumbLink.displayName = "BreadcrumbLink";

const StyledBreadcrumbPage = styled.span`
  font-weight: normal;
  color: hsl(var(--foreground));
`;

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ ...props }, ref) => (
  <StyledBreadcrumbPage
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    {...props}
  />
));
BreadcrumbPage.displayName = "BreadcrumbPage";

const StyledBreadcrumbSeparator = styled.li`
  & > svg {
    width: 0.875rem;
    height: 0.875rem;
  }
`;

const BreadcrumbSeparator = ({
  children,
  ...props
}: React.ComponentProps<"li">) => (
  <StyledBreadcrumbSeparator role="presentation" aria-hidden="true" {...props}>
    {children ?? <ChevronRight />}
  </StyledBreadcrumbSeparator>
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

const StyledBreadcrumbEllipsis = styled.span`
  display: flex;
  height: 2.25rem;
  width: 2.25rem;
  align-items: center;
  justify-content: center;

  & > svg {
    width: 1rem;
    height: 1rem;
  }
`;

const BreadcrumbEllipsis = ({ ...props }: React.ComponentProps<"span">) => (
  <StyledBreadcrumbEllipsis role="presentation" aria-hidden="true" {...props}>
    <MoreHorizontal />
    <span
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: 0,
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: 0,
      }}
    >
      More
    </span>
  </StyledBreadcrumbEllipsis>
);
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
