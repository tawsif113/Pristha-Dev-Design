import type {
  StudioBook,
  StudioDraftSelection,
} from "@/src/types/domain";

export interface StudioService {
  getBooks(): Promise<StudioBook[]>;
  getBook(bookId: string): Promise<StudioBook | null>;
  getDraft(selection: StudioDraftSelection): Promise<string>;
}
