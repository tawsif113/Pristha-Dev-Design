import { discoverBooks } from "./books";
import type {
  CatalogueItem,
  Submission,
  TeamMember,
} from "@/src/types/domain";

export const catalogueItems: CatalogueItem[] = discoverBooks
  .slice(0, 5)
  .map((book, index) => ({
    book,
    status: index === 3 ? "in-review" : "live",
    reads: [18240, 24100, 15870, 0, 9640][index],
    revenue: [38900, 61200, 41050, 0, 18700][index],
  }));

export const submissions: Submission[] = [
  {
    id: "submission-1",
    title: "অন্য শহর",
    authorName: "Nadia Sultana",
    status: "new",
    submittedAt: "Today",
  },
  {
    id: "submission-2",
    title: "The Weather Room",
    authorName: "Asif Rahman",
    status: "shortlisted",
    submittedAt: "Yesterday",
  },
  {
    id: "submission-3",
    title: "ঘুমন্ত নদী",
    authorName: "মাহিন কবির",
    status: "reading",
    submittedAt: "3 days ago",
  },
];

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    username: "farhana-islam",
    name: "Farhana Islam",
    role: "Editorial Director",
    status: "active",
  },
  {
    id: "team-2",
    username: "sabbir-hossain",
    name: "Sabbir Hossain",
    role: "Managing Editor",
    status: "active",
  },
  {
    id: "team-3",
    username: "maya-sen",
    name: "Maya Sen",
    role: "Cover Designer",
    status: "invited",
  },
];
