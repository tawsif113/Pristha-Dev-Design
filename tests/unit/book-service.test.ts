import { describe, expect, it } from "vitest";
import { mockBookService } from "@/src/services/mock/mock-book-service";

describe("mock book service", () => {
  it("returns a typed book and its chapter", async () => {
    const book = await mockBookService.getBookById("chithi");
    const chapter = await mockBookService.getChapter(
      "chithi",
      "chithi-04",
    );
    expect(book?.title).toBe("চিঠি");
    expect(chapter?.title).toBe("দেরি");
  });

  it("filters and paginates discover results", async () => {
    const result = await mockBookService.searchBooks({
      genre: "Mystery",
      page: 1,
      pageSize: 1,
    });
    expect(result.items).toHaveLength(1);
    expect(result.total).toBeGreaterThanOrEqual(1);
    expect(result.items[0]?.tags.some((tag) => tag.label === "Mystery")).toBe(
      true,
    );
  });
});
