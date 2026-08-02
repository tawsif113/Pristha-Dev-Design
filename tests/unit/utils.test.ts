import { describe, expect, it } from "vitest";
import { routes, isPathActive, workspaceForPath } from "@/src/config/routes";
import { withSearchParams } from "@/src/lib/search-params";
import { calculateAverageRating } from "@/src/utils/rating";
import { countWords } from "@/src/utils/word-count";

describe("route helpers", () => {
  it("builds encoded dynamic routes", () => {
    expect(routes.reader("চিঠি", "chapter 1")).toBe(
      "/read/%E0%A6%9A%E0%A6%BF%E0%A6%A0%E0%A6%BF/chapter%201",
    );
  });

  it("matches route families without marking home active globally", () => {
    expect(isPathActive("/studio/books/chithi", "/studio")).toBe(true);
    expect(isPathActive("/discover", "/")).toBe(false);
    expect(workspaceForPath("/house/catalogue")).toBe("house");
  });

  it("omits empty search parameters", () => {
    expect(
      withSearchParams("/discover", {
        q: "letters",
        genre: undefined,
        page: 2,
      }),
    ).toBe("/discover?q=letters&page=2");
  });
});

describe("pure content utilities", () => {
  it("counts Bengali and English words", () => {
    expect(countWords("একটি calm writing room")).toBe(4);
    expect(countWords("   ")).toBe(0);
  });

  it("calculates a one-decimal average", () => {
    expect(calculateAverageRating([5, 4, 5])).toBe(4.7);
    expect(calculateAverageRating([])).toBe(0);
  });
});
