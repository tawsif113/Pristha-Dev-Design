import { Skeleton } from "@/src/components/feedback/skeleton";

export default function StudioLoading() {
  return (
    <div className="studio-page loading-page">
      <Skeleton className="skeleton-title" label="Loading Studio" />
      <div className="metric-strip" aria-hidden="true">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton className="skeleton-metric" key={index} />
        ))}
      </div>
      <Skeleton className="skeleton-panel" />
    </div>
  );
}
