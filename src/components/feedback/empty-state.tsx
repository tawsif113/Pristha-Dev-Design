import type { ReactNode } from "react";

export function EmptyState({
  eyebrow = "Nothing here yet",
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="empty-state" aria-live="polite">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      {action && <div>{action}</div>}
    </section>
  );
}
