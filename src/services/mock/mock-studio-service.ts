import { initialStudioBooks } from "@/src/mocks/studio";
import type { StudioService } from "@/src/services/contracts/studio-service";

export const mockStudioService: StudioService = {
  async getBooks() {
    return initialStudioBooks;
  },

  async getBook(bookId) {
    return initialStudioBooks.find((book) => book.id === bookId) ?? null;
  },

  async getDraft(selection) {
    const book = initialStudioBooks.find(
      (item) => item.id === selection.bookId,
    );
    const chapter = book?.chapters.find(
      (item) => item.id === selection.chapterId,
    );
    if (!chapter) return "";
    return (
      "নদীর ওপারের আলো সন্ধ্যার আগেই জ্বলে উঠেছিল।\n\n" +
      "রাইসা জানত, আজকের চিঠিটা তাকে এমন একটি ঠিকানায় নিয়ে যাবে " +
      "যা কোনো মানচিত্রে নেই।"
    );
  },
};
