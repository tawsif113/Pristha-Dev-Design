import type { ReactNode } from "react";
import { AppShell } from "@/src/components/layout/app-shell";

export default function PlatformLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <AppShell>{children}</AppShell>
    </>
  );
}
