/**
 * @file Creates the error page component to display an error message when an unexpected error occurs, along with a link to navigate back to the home page.
 * @module app/error/page.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */
import Link from "next/link";

/**
 * Component to display the error page with an error message and a link to navigate back to the home page.
 *
 * @returns {JSX.Element} The error page component.
 */
export default async function Errors({ searchParams }) {
  const searchParamsValue = await searchParams;
  const errorMessage =
    searchParamsValue.message || "An unexpected error occurred.";
  return (
    <div
      className="min-h-screen flex justify-center pt-24 px-6"
      style={{ background: "var(--background)" }}
    >
      <main className="w-full max-w-[700px]">
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
            Something went wrong.. {errorMessage}
          </p>

          <div className="mt-10">
            <Link href="/" className="clear-button">
              Go back to Home Page
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
