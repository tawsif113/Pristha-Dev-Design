"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="standalone-state" role="alert">
          <h1>Pristha could not start.</h1>
          <p>Please try once more. Your saved work is unchanged.</p>
          <button onClick={reset}>Reload Pristha</button>
        </main>
      </body>
    </html>
  );
}
