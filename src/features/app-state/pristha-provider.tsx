"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  initialDraftSelection,
  initialStudioBooks,
} from "@/src/mocks/studio";
import type {
  StudioBook,
  StudioChapter,
  StudioDraftSelection,
} from "@/src/types/domain";

interface CreateBookInput {
  title: string;
  format: string;
  language: string;
}

export type UserRole = "reader" | "author";

interface PristhaContextValue {
  studioBooks: StudioBook[];
  activeDraft: StudioDraftSelection;
  toast: string;
  userRole: UserRole;
  isAuthor: boolean;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
  completeAuthorOnboarding: () => void;
  selectDraft: (selection: StudioDraftSelection) => void;
  createStudioBook: (input: CreateBookInput) => StudioDraftSelection;
  addStudioChapter: (bookId: string) => StudioDraftSelection | null;
  showToast: (message: string) => void;
}

const PristhaContext = createContext<PristhaContextValue | null>(null);

export function PristhaProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState<UserRole>("reader");
  const [studioBooks, setStudioBooks] =
    useState<StudioBook[]>(initialStudioBooks);
  const [activeDraft, setActiveDraft] =
    useState<StudioDraftSelection>(initialDraftSelection);
  const [toast, setToast] = useState("");

  const login = useCallback(() => {
    setIsAuthenticated(true);
    setToast("স্বাগতম! সফলভাবে প্রবেশ করেছেন।");
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserRole("reader");
    setToast("সফলভাবে লগআউট করা হয়েছে।");
  }, []);

  const completeAuthorOnboarding = useCallback(() => {
    setUserRole("author");
    setToast("অভিনন্দন! আপনার লেখক আবেদন অনুমোদিত হয়েছে।");
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast(message);
  }, []);

  const selectDraft = useCallback((selection: StudioDraftSelection) => {
    setActiveDraft(selection);
  }, []);

  const createStudioBook = useCallback((input: CreateBookInput) => {
    const id = "book-" + Date.now();
    const chapterId = id + "-01";
    const newBook: StudioBook = {
      id,
      title: input.title,
      shortTitle: input.title.trim().slice(0, 1).toUpperCase() || "N",
      romanTitle: input.title.toUpperCase().slice(0, 16),
      tone: "olive",
      progress: 2,
      format: input.format,
      synopsis:
        input.language +
        " " +
        input.format.toLowerCase() +
        " · A new manuscript ready for its first scene.",
      chapters: [
        {
          id: chapterId,
          number: "01",
          title: "Untitled chapter",
          meta: "Created just now",
          words: 0,
          status: "Draft",
        },
      ],
    };
    const selection = { bookId: id, chapterId };
    setStudioBooks((current) => [...current, newBook]);
    setActiveDraft(selection);
    setToast(input.title + " is ready for its first chapter");
    return selection;
  }, []);

  const addStudioChapter = useCallback(
    (bookId: string): StudioDraftSelection | null => {
      const book = studioBooks.find((item) => item.id === bookId);
      if (!book) return null;
      const nextNumber = book.chapters.length + 1;
      const chapterId =
        bookId +
        "-" +
        String(nextNumber).padStart(2, "0") +
        "-" +
        Date.now();
      const chapter: StudioChapter = {
        id: chapterId,
        number: String(nextNumber).padStart(2, "0"),
        title: "Untitled chapter",
        meta: "Created just now",
        words: 0,
        status: "Draft",
      };
      const selection = { bookId, chapterId };
      setStudioBooks((current) =>
        current.map((item) =>
          item.id === bookId
            ? { ...item, chapters: [...item.chapters, chapter] }
            : item,
        ),
      );
      setActiveDraft(selection);
      setToast(
        "Chapter " + nextNumber + " added to " + book.title,
      );
      return selection;
    },
    [studioBooks],
  );

  const value = useMemo<PristhaContextValue>(
    () => ({
      studioBooks,
      activeDraft,
      toast,
      userRole,
      isAuthor: userRole === "author",
      isAuthenticated,
      login,
      logout,
      completeAuthorOnboarding,
      selectDraft,
      createStudioBook,
      addStudioChapter,
      showToast,
    }),
    [
      activeDraft,
      addStudioChapter,
      completeAuthorOnboarding,
      createStudioBook,
      isAuthenticated,
      login,
      logout,
      selectDraft,
      showToast,
      studioBooks,
      toast,
      userRole,
    ],
  );

  return (
    <PristhaContext.Provider value={value}>
      {children}
    </PristhaContext.Provider>
  );
}

export function usePristha(): PristhaContextValue {
  const context = useContext(PristhaContext);
  if (!context) {
    throw new Error("usePristha must be used within PristhaProvider");
  }
  return context;
}
