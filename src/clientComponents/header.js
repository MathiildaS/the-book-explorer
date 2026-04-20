import { cookies } from "next/headers";
import Button from "./button.js";

/**
 * Component to display the header on all pages of the app.
 * @returns The header component.
 */
export default async function Header() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  const isUserLoggedIn = !!jwtToken;

  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <h1 className="text-xl font-bold">WT Assignment Dashboard</h1>
      <nav>
        {isUserLoggedIn ? (
          <form action="/api/user" method="post">
            <Button type="submit">Logout</Button>
          </form>
        ) : (
          <a href="/api/githubAuth">
            <Button>Login with GitHub</Button>
          </a>
        )}
      </nav>
    </header>
  );
}
