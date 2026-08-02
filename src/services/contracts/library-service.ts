import type { LibraryItem } from "@/src/types/domain";

export interface LibraryService {
  getLibrary(): Promise<LibraryItem[]>;
  isSaved(bookId: string): Promise<boolean>;
}
