import { cn } from "@/src/lib/cn";

export function Skeleton({
  className,
  label = "Loading",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <span
      className={cn("skeleton", className)}
      role="status"
      aria-label={label}
    />
  );
}
