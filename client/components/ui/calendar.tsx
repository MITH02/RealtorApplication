import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";

const StyledCalendarWrapper = styled.div`
  padding: 0.75rem;
`;

const calendarGlobalStyles = css`
  .rdp {
    /* Months container */
    .rdp-months {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 640px) {
        flex-direction: row;
        gap: 1rem;
      }
    }

    /* Individual month */
    .rdp-month {
      gap: 1rem;
    }

    /* Caption (month/year header) */
    .rdp-caption {
      display: flex;
      justify-content: center;
      padding-top: 0.25rem;
      position: relative;
      align-items: center;
    }

    .rdp-caption_label {
      font-size: 0.875rem;
      font-weight: 500;
    }

    /* Navigation */
    .rdp-nav {
      gap: 0.25rem;
      display: flex;
      align-items: center;
    }

    .rdp-nav_button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: calc(var(--radius) - 2px);
      font-size: 0.875rem;
      font-weight: 500;
      transition-property: color, background-color, border-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      border: 1px solid hsl(var(--input));
      background-color: hsl(var(--background));
      cursor: pointer;
      height: 1.75rem;
      width: 1.75rem;
      background: transparent;
      padding: 0;
      opacity: 0.5;

      &:hover {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
        opacity: 1;
      }

      &:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px hsl(var(--ring));
      }

      &:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      & svg {
        height: 1rem;
        width: 1rem;
      }
    }

    .rdp-nav_button_previous {
      position: absolute;
      left: 0.25rem;
    }

    .rdp-nav_button_next {
      position: absolute;
      right: 0.25rem;
    }

    /* Table */
    .rdp-table {
      width: 100%;
      border-collapse: collapse;
      gap: 0.25rem;
    }

    .rdp-head_row {
      display: flex;
    }

    .rdp-head_cell {
      color: hsl(var(--muted-foreground));
      border-radius: calc(var(--radius) - 2px);
      width: 2.25rem;
      font-weight: 400;
      font-size: 0.8rem;
    }

    .rdp-row {
      display: flex;
      width: 100%;
      margin-top: 0.5rem;
    }

    .rdp-cell {
      height: 2.25rem;
      width: 2.25rem;
      text-align: center;
      font-size: 0.875rem;
      padding: 0;
      position: relative;

      &:has([aria-selected].rdp-day_range_end) {
        border-top-right-radius: calc(var(--radius) - 2px);
        border-bottom-right-radius: calc(var(--radius) - 2px);
      }

      &:has([aria-selected].rdp-day_outside) {
        background-color: hsl(var(--accent) / 0.5);
      }

      &:has([aria-selected]) {
        background-color: hsl(var(--accent));
      }

      &:first-child:has([aria-selected]) {
        border-top-left-radius: calc(var(--radius) - 2px);
        border-bottom-left-radius: calc(var(--radius) - 2px);
      }

      &:last-child:has([aria-selected]) {
        border-top-right-radius: calc(var(--radius) - 2px);
        border-bottom-right-radius: calc(var(--radius) - 2px);
      }

      &:focus-within {
        position: relative;
        z-index: 20;
      }
    }

    /* Day buttons */
    .rdp-day {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      white-space: nowrap;
      border-radius: calc(var(--radius) - 2px);
      font-size: 0.875rem;
      font-weight: 500;
      transition-property: color, background-color;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 150ms;
      border: none;
      background: transparent;
      cursor: pointer;
      height: 2.25rem;
      width: 2.25rem;
      padding: 0;
      font-weight: 400;

      &:hover {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }

      &:focus-visible {
        outline: 2px solid transparent;
        outline-offset: 2px;
        box-shadow: 0 0 0 2px hsl(var(--ring));
      }

      &:disabled {
        pointer-events: none;
        opacity: 0.5;
      }

      &[aria-selected] {
        opacity: 1;
      }
    }

    .rdp-day_selected {
      background-color: hsl(var(--primary));
      color: hsl(var(--primary-foreground));

      &:hover {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }

      &:focus {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
    }

    .rdp-day_today {
      background-color: hsl(var(--accent));
      color: hsl(var(--accent-foreground));
    }

    .rdp-day_outside {
      color: hsl(var(--muted-foreground));
      opacity: 0.5;

      &[aria-selected] {
        background-color: hsl(var(--accent) / 0.5);
        color: hsl(var(--muted-foreground));
        opacity: 0.3;
      }
    }

    .rdp-day_disabled {
      color: hsl(var(--muted-foreground));
      opacity: 0.5;
    }

    .rdp-day_range_middle {
      &[aria-selected] {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }
    }

    .rdp-day_hidden {
      visibility: hidden;
    }
  }
`;

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <>
      <Global styles={calendarGlobalStyles} />
      <StyledCalendarWrapper className={className}>
        <DayPicker
          showOutsideDays={showOutsideDays}
          classNames={{
            months: "rdp-months",
            month: "rdp-month",
            caption: "rdp-caption",
            caption_label: "rdp-caption_label",
            nav: "rdp-nav",
            nav_button: "rdp-nav_button",
            nav_button_previous: "rdp-nav_button_previous",
            nav_button_next: "rdp-nav_button_next",
            table: "rdp-table",
            head_row: "rdp-head_row",
            head_cell: "rdp-head_cell",
            row: "rdp-row",
            cell: "rdp-cell",
            day: "rdp-day",
            day_range_end: "rdp-day_range_end",
            day_selected: "rdp-day_selected",
            day_today: "rdp-day_today",
            day_outside: "rdp-day_outside",
            day_disabled: "rdp-day_disabled",
            day_range_middle: "rdp-day_range_middle",
            day_hidden: "rdp-day_hidden",
            ...classNames,
          }}
          components={{
            Chevron: (props) => {
              if (props.orientation === "left") {
                return <ChevronLeft />;
              }
              return <ChevronRight />;
            },
          }}
          {...props}
        />
      </StyledCalendarWrapper>
    </>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
