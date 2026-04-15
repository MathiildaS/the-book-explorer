import Link from "next/link";

export default function Errors({ searchParams }) {
  const errorMessage = searchParams.message || "An unexpected error occurred.";
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Error</h1>
        <p>{errorMessage}</p>
        <Link href="/" className="text-blue-500 hover:underline">Go back to Home Page</Link>
      </main>
    </div>
  );
}