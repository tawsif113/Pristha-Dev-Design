import { Button } from "@/src/components/ui/button";

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: {
  title?: string;
  description: string;
  onRetry?: () => void;
}) {
  return (
    <section className="error-state" role="alert">
      <span className="eyebrow">Unable to load</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {onRetry && <Button onClick={onRetry}>Try again</Button>}
    </section>
  );
}
