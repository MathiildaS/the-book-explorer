import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (!jwtToken) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

async function getBooks() {}
