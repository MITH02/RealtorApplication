import { CSSObject } from "@emotion/react";

// Utility function to merge emotion styles
export function mergeStyles(
  ...styles: (CSSObject | undefined | null | false)[]
): CSSObject {
  return Object.assign({}, ...styles.filter(Boolean));
}

// Simple className concatenation utility
// This is a temporary utility for components that haven't been converted to Emotion yet
// It simply joins class names without any Tailwind-specific logic
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// Helper for handling class names
export function clsx(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}
