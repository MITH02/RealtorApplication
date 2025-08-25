import { CSSObject } from "@emotion/react";

// Basic class name utility (replacement for clsx without dependency)
function clsxBasic(...classes: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const result: string[] = [];
  
  for (const cls of classes) {
    if (!cls) continue;
    
    if (typeof cls === 'string') {
      result.push(cls);
    } else if (typeof cls === 'object') {
      for (const [key, value] of Object.entries(cls)) {
        if (value) {
          result.push(key);
        }
      }
    }
  }
  
  return result.join(' ');
}

// Legacy utility function for remaining components that haven't been converted
// This provides basic class merging without TailwindCSS dependency
export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  return clsxBasic(...inputs);
}

// Utility function to merge emotion styles
export function mergeStyles(
  ...styles: (CSSObject | undefined | null | false)[]
): CSSObject {
  return Object.assign({}, ...styles.filter(Boolean));
}

// Helper for handling class names
export function clsx(
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
