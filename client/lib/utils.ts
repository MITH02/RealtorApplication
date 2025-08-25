import { CSSObject } from '@emotion/react';

// Utility function to merge emotion styles
export function mergeStyles(...styles: (CSSObject | undefined | null | false)[]): CSSObject {
  return Object.assign({}, ...styles.filter(Boolean));
}

// Utility function to conditionally merge styles 
export function cn(...styles: (CSSObject | undefined | null | false)[]): CSSObject {
  return mergeStyles(...styles);
}

// Helper for handling class names (for cases where we still need className)
export function clsx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
