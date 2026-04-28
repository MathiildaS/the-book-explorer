import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (jwtToken) {
    redirect("/dashboard");
  }

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
          <p
            style={{
              color: "var(--accent)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              fontSize: "11px",
              maxWidth: "none",
            }}
          >
            The Book Explorer
          </p>

          <h2 className="mt-4">Step into a world of books</h2>

          <p
            className="mx-auto mt-6"
            style={{
              color: "#6B4F3A",
              fontSize: "15px",
              maxWidth: "520px",
            }}
          >
            Search for books, explore authors, browse top categories and discover
            what others are reading right now.
          </p>

          <div className="mt-10">
            <a href="/api/githubAuth" className="clear-button">
              Login with GitHub
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
