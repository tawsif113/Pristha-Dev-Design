import { Skeleton } from "@/src/components/feedback/skeleton";

export default function ApplicationLoading() {
  return (
    <main className="standalone-state" aria-label="Loading Pristha">
      <Skeleton className="skeleton-title" />
      <Skeleton className="skeleton-panel" />
    </main>
  );
}
