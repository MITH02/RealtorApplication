import { CSSObject } from "@emotion/react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Legacy utility function for remaining TailwindCSS components
// This will be removed once all components are converted to Emotion CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to merge emotion styles
export function mergeStyles(
  ...styles: (CSSObject | undefined | null | false)[]
): CSSObject {
  return Object.assign({}, ...styles.filter(Boolean));
}

// Helper for handling class names (for cases where we still need className)
export function clsxUtil(
  ...classes: (string | undefined | null | false)[]
): string {
  return classes.filter(Boolean).join(" ");
}

// Utility function for conditional rendering
export function when<T>(condition: boolean, value: T): T | undefined {
  return condition ? value : undefined;
}

// Utility function to create variant styles
export function createVariant<T extends Record<string, CSSObject>>(
  variants: T
): (variant: keyof T) => CSSObject {
  return (variant) => variants[variant] || {};
}

// Utility function to combine base styles with variant styles
export function combineStyles(
  base: CSSObject,
  variant?: CSSObject,
  override?: CSSObject
): CSSObject {
  return mergeStyles(base, variant, override);
}
