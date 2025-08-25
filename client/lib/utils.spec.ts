import { describe, it, expect } from "vitest";
import { cn, clsx, mergeStyles } from "./utils";

describe("cn function", () => {
  it("should join classes correctly", () => {
    expect(cn("base-class", "another-class")).toBe("base-class another-class");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    expect(cn("base-class", isActive && "active-class")).toBe(
      "base-class active-class",
    );
  });

  it("should handle false and null conditions", () => {
    const isActive = false;
    expect(cn("base-class", isActive && "active-class", null)).toBe(
      "base-class",
    );
  });

  it("should filter out falsy values", () => {
    expect(cn("class1", "", undefined, "class2", null, false)).toBe(
      "class1 class2",
    );
  });
});

describe("clsx function", () => {
  it("should join classes correctly", () => {
    expect(clsx("class1", "class2")).toBe("class1 class2");
  });

  it("should handle conditional classes", () => {
    const condition = true;
    expect(clsx("base", condition && "conditional")).toBe("base conditional");
  });

  it("should filter out falsy values", () => {
    expect(clsx("class1", "", undefined, "class2", null, false)).toBe(
      "class1 class2",
    );
  });
});

describe("mergeStyles function", () => {
  it("should merge CSS objects correctly", () => {
    const style1 = { color: "red", fontSize: "16px" };
    const style2 = { backgroundColor: "blue", fontSize: "18px" };

    const result = mergeStyles(style1, style2);

    expect(result).toEqual({
      color: "red",
      fontSize: "18px", // Later styles should override earlier ones
      backgroundColor: "blue",
    });
  });

  it("should handle falsy values", () => {
    const style1 = { color: "red" };

    const result = mergeStyles(style1, null, undefined, false);

    expect(result).toEqual({ color: "red" });
  });

  it("should return empty object when no styles provided", () => {
    const result = mergeStyles();
    expect(result).toEqual({});
  });
});
