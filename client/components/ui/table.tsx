import * as React from "react";
import styled from "@emotion/styled";

const TableWrapper = styled.div`
  position: relative;
  width: 100%;
  overflow: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  caption-side: bottom;
  font-size: 0.875rem;
`;

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ ...props }, ref) => (
  <TableWrapper>
    <StyledTable ref={ref} {...props} />
  </TableWrapper>
));
Table.displayName = "Table";

const StyledTableHeader = styled.thead`
  tr {
    border-bottom: 1px solid hsl(var(--border));
  }
`;

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => <StyledTableHeader ref={ref} {...props} />);
TableHeader.displayName = "TableHeader";

const StyledTableBody = styled.tbody`
  tr:last-child {
    border-bottom: 0;
  }
`;

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => <StyledTableBody ref={ref} {...props} />);
TableBody.displayName = "TableBody";

const StyledTableFooter = styled.tfoot`
  border-top: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.5);
  font-weight: 500;

  tr:last-child {
    border-bottom: 0;
  }
`;

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ ...props }, ref) => <StyledTableFooter ref={ref} {...props} />);
TableFooter.displayName = "TableFooter";

const StyledTableRow = styled.tr`
  border-bottom: 1px solid hsl(var(--border));
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  &:hover {
    background-color: hsl(var(--muted) / 0.5);
  }

  &[data-state="selected"] {
    background-color: hsl(var(--muted));
  }
`;

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ ...props }, ref) => <StyledTableRow ref={ref} {...props} />);
TableRow.displayName = "TableRow";

const StyledTableHead = styled.th`
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  text-align: left;
  vertical-align: middle;
  font-weight: 500;
  color: hsl(var(--muted-foreground));

  &:has([role="checkbox"]) {
    padding-right: 0;
  }
`;

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ ...props }, ref) => <StyledTableHead ref={ref} {...props} />);
TableHead.displayName = "TableHead";

const StyledTableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;

  &:has([role="checkbox"]) {
    padding-right: 0;
  }
`;

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ ...props }, ref) => <StyledTableCell ref={ref} {...props} />);
TableCell.displayName = "TableCell";

const StyledTableCaption = styled.caption`
  margin-top: 1rem;
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
`;

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ ...props }, ref) => <StyledTableCaption ref={ref} {...props} />);
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
