import { libraryItems } from "@/src/mocks/books";
import type { LibraryService } from "@/src/services/contracts/library-service";

export const mockLibraryService: LibraryService = {
  async getLibrary() {
    return libraryItems;
  },

  async isSaved(bookId) {
    return libraryItems.some((item) => item.book.id === bookId);
  },
};
