"use client";
import Link from "next/link";

export default function Error({ error, reset }) {
  return (
    <div
      className="min-h-screen flex justify-center pt-24 px-6"
      style={{ background: "var(--background)" }}
    >
      <main className="w-full max-w-[500px]">
        <section
          className="rounded-xl p-8 text-center"
          style={{ background: "var(--surface)" }}
        >
          <h2 className="mt-4">Error</h2>

          <p
            className="mx-auto mt-6"
            style={{
              color: "#6B4F3A",
              fontSize: "15px",
              maxWidth: "520px",
            }}
          >
            Oops! Something went wrong.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button onClick={() => unstable_retry()}>Try again</button>
            <Link href="/" className="clear-button">
              Go back to Home Page
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
