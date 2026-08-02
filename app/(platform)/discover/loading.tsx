import { Skeleton } from "@/src/components/feedback/skeleton";

export default function DiscoverLoading() {
  return (
    <div className="product-page discover-page loading-page">
      <Skeleton className="skeleton-title" label="Loading Discover" />
      <Skeleton className="skeleton-control" />
      <div className="discover-results-grid" aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <Skeleton className="skeleton-book" key={index} />
        ))}
      </div>
    </div>
  );
}
