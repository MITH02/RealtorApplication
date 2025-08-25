import { describe, it, expect } from "vitest";
import { cn, mergeStyles, clsx, createVariant, combineStyles } from "./utils";

describe("utils", () => {
  describe("cn (legacy class utility)", () => {
    it("should merge classes correctly", () => {
      expect(cn("text-red-500", "bg-blue-500")).toBe(
        "text-red-500 bg-blue-500",
      );
    });

    it("should handle conditional classes", () => {
      const isActive = true;
      expect(cn("base-class", isActive && "active-class")).toBe(
        "base-class active-class",
      );
    });

    it("should filter out falsy values", () => {
      const isActive = false;
      expect(cn("base-class", isActive && "active-class", null)).toBe(
        "base-class",
      );
    });

    it("should work with object notation", () => {
      expect(cn("base", { conditional: true, "not-included": false })).toBe(
        "base conditional",
      );
    });
  });

  describe("mergeStyles (Emotion CSS utility)", () => {
    it("should merge CSS objects correctly", () => {
      const style1 = { color: "red", fontSize: "16px" };
      const style2 = { backgroundColor: "blue", fontSize: "18px" };
      const result = mergeStyles(style1, style2);

      expect(result).toEqual({
        color: "red",
        fontSize: "18px", // Should override
        backgroundColor: "blue",
      });
    });

    it("should filter out falsy values", () => {
      const style1 = { color: "red" };
      const result = mergeStyles(style1, null, undefined, false);

      expect(result).toEqual({ color: "red" });
    });
  });

  describe("clsx", () => {
    it("should join class names", () => {
      expect(clsx("class1", "class2", "class3")).toBe("class1 class2 class3");
    });

    it("should filter out falsy values", () => {
      expect(clsx("class1", null, undefined, false, "class2")).toBe(
        "class1 class2",
      );
    });
  });

  describe("createVariant", () => {
    it("should create variant function", () => {
      const variants = {
        primary: { backgroundColor: "blue", color: "white" },
        secondary: { backgroundColor: "gray", color: "black" },
      };

      const getVariant = createVariant(variants);

      expect(getVariant("primary")).toEqual(variants.primary);
      expect(getVariant("secondary")).toEqual(variants.secondary);
    });

    it("should return empty object for unknown variant", () => {
      const variants = { primary: { color: "blue" } };
      const getVariant = createVariant(variants);

      expect(getVariant("unknown" as any)).toEqual({});
    });
  });

  describe("combineStyles", () => {
    it("should combine base, variant and override styles", () => {
      const base = { padding: "8px", margin: "4px" };
      const variant = { backgroundColor: "blue", padding: "16px" };
      const override = { color: "white" };

      const result = combineStyles(base, variant, override);

      expect(result).toEqual({
        padding: "16px", // Overridden by variant
        margin: "4px",
        backgroundColor: "blue",
        color: "white",
      });
    });
  });
});
