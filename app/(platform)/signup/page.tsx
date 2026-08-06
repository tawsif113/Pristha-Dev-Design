import type { Metadata } from "next";
import { AuthExperience } from "@/src/features/auth/components/auth-experience";

export const metadata: Metadata = {
  title: "Create Account — Pristha",
  description: "Join Pristha to read, save, and publish Bengali stories.",
  alternates: { canonical: "/signup" },
};

export default function SignupPage() {
  return <AuthExperience initialMode="signup" />;
}
