import type { RatingSummary, Review } from "@/src/types/domain";

export const initialBookReviews: Review[] = [
  {
    id: "review-1",
    bookId: "chithi",
    readerName: "মেহরিন সুলতানা",
    readerInitial: "মে",
    rating: 5,
    title: "চিঠিগুলো যেন শহরের স্মৃতি",
    body:
      "গল্পটি খুব ধীরে দরজা খোলে, কিন্তু একবার ভেতরে ঢুকলে চরিত্রগুলোর নীরবতা আর পুরোনো ঢাকার আবহ সহজে ছেড়ে যায় না।",
    dateLabel: "২ দিন আগে",
    helpfulCount: 42,
    verified: true,
  },
  {
    id: "review-2",
    bookId: "chithi",
    readerName: "আরিফ চৌধুরী",
    readerInitial: "আ",
    rating: 4,
    title: "সংযত, সুন্দর, একটু ধীর",
    body:
      "ভাষা ও পরিবেশ অসাধারণ। মাঝের অংশে গতি কিছুটা কম মনে হয়েছে, তবে চতুর্থ অধ্যায়ের শেষটি আমাকে পরের অধ্যায়ে নিয়ে গেছে।",
    dateLabel: "৫ দিন আগে",
    helpfulCount: 27,
    verified: true,
  },
  {
    id: "review-3",
    bookId: "chithi",
    readerName: "নাবিলা রহমান",
    readerInitial: "না",
    rating: 5,
    title: "শেষ প্রকাশটি দারুণ",
    body:
      "এই রিভিউতে গল্পের একটি গুরুত্বপূর্ণ পারিবারিক প্রকাশ নিয়ে আলোচনা আছে।",
    dateLabel: "১ সপ্তাহ আগে",
    helpfulCount: 19,
    verified: true,
    spoiler: true,
  },
];

export const chithiRatingSummary: RatingSummary = {
  average: 4.8,
  count: 1240,
  distribution: {
    1: 1,
    2: 1,
    3: 6,
    4: 18,
    5: 74,
  },
};
