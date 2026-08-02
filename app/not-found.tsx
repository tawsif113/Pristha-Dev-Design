import Link from "next/link";
import { routes } from "@/src/config/routes";

export default function NotFound() {
  return (
    <main className="standalone-state">
      <span className="eyebrow">404 · Page not found</span>
      <h1>This page has slipped between the chapters.</h1>
      <p>
        The address may be outdated, or this story is no longer
        available.
      </p>
      <div>
        <Link className="primary-button" href={routes.home}>
          Return home
        </Link>
        <Link className="secondary-button" href={routes.discover}>
          Discover stories
        </Link>
      </div>
    </main>
  );
}
