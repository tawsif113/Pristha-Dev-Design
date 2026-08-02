import { cn } from "@/src/lib/cn";
import type { BookTone } from "@/src/types/domain";

export function BookCover({
  label,
  title = "PRISTHA",
  tone,
  size = "standard",
  isNew = false,
}: {
  label: string;
  title?: string;
  tone: BookTone;
  size?: "standard" | "large";
  isNew?: boolean;
}) {
  return (
    <span
      className={cn(
        "discovery-cover",
        "book-tone-" + tone,
        size === "large" && "large",
      )}
      aria-hidden="true"
    >
      {isNew && <i>New</i>}
      <b lang="bn">{label}</b>
      <small>{title}</small>
    </span>
  );
}
