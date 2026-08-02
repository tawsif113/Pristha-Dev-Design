import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { discoverBooks } from "@/src/mocks/books";
import { BookCard } from "@/src/features/books/components/book-card";

describe("BookCard", () => {
  it("links a visible title to its canonical book route", () => {
    const book = discoverBooks[0];
    render(<BookCard book={book} />);
    expect(screen.getByRole("link", { name: /অচেনা জানালা/u })).toHaveAttribute(
      "href",
      "/books/unknown-window",
    );
  });
});
