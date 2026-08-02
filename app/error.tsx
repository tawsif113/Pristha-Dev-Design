"use client";

export default function ApplicationError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="standalone-state" role="alert">
      <span className="eyebrow">Unable to open this page</span>
      <h1>Pristha lost the thread for a moment.</h1>
      <p>
        Your work has not been changed. Try loading this page again.
      </p>
      <button className="primary-button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
