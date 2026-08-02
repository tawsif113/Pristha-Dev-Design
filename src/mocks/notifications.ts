import type { Notification } from "@/src/types/domain";

export const notifications: Notification[] = [
  {
    id: "new-readers",
    title: "৩২ জন নতুন পাঠক",
    body: "চিঠি followed your serial this week.",
    href: "/studio/audience",
    createdAtLabel: "12 min",
    read: false,
    tone: "teal",
  },
  {
    id: "editor-note",
    title: "Editor left a note",
    body: "Chapter 08 is ready for your revision.",
    href: "/studio/books/chithi/chapters/chithi-08/edit",
    createdAtLabel: "2 hr",
    read: false,
    tone: "gold",
  },
  {
    id: "rights-offer",
    title: "New print-rights offer",
    body: "Batayan sent terms for চিঠি.",
    href: "/house/submissions",
    createdAtLabel: "Yesterday",
    read: true,
    tone: "neutral",
  },
];
