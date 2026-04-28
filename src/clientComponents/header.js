import { cookies } from "next/headers";
import Button from "./button.js";
import Image from "next/image";

/**
 * Component to display the header on all pages of the app.
 * @returns The header component.
 */
export default async function Header() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  const isUserLoggedIn = !!jwtToken;

  return (
    <header
      className="w-full flex items-center px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #2A1A12 0%, #3D2B1F 50%, #5A3A24 100%)",
        height: "160px",
      }}
    >
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, #C8A97E 0%, transparent 45%)",
        }}
      />

      <div className="absolute left-1/2 -translate-x-1/2 z-10 flex items-center gap-4">
        <Image
          src="/books.png"
          alt=""
          width={150}
          height={180}
          className="object-contain opacity-80"
          style={{ height: "150px", width: "auto" }}
        />

        <div className="flex flex-col items-center">
          <h1>The Book Explorer</h1>

          <p
            style={{
              marginTop: "10px",
              color: "#D8B985",
              fontSize: "14px",
              letterSpacing: "3px",
              textTransform: "uppercase",
            }}
          >
            Discover your next great read
          </p>
        </div>

        <Image
          src="/books.png"
          alt=""
          width={150}
          height={180}
          className="opacity-80"
          style={{
            height: "150px",
            width: "auto",
            transform: "scaleX(-1)",
          }}
        />
      </div>

      <nav className="absolute right-16 top-1/2 -translate-y-1/2 z-20">
        {isUserLoggedIn && (
          <form action="/api/user" method="post">
            <Button type="submit" className="large">Logout</Button>
          </form>
        )}
      </nav>
    </header>
  );
}
