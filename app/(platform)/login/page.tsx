import type { Metadata } from "next";
import { AuthExperience } from "@/src/features/auth/components/auth-experience";

export const metadata: Metadata = {
  title: "Sign In — Pristha",
  description: "Sign in to your Pristha reader and writer account.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <AuthExperience initialMode="signin" />;
}
