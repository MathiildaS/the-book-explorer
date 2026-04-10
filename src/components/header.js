"use client";

import Button from "./button.js";

/**
 * Component to display the header on all pages of the app.
 * @returns The header component.
 */
export default function Header() {
  function loginBtn() {
    window.location.href = "/api/githubAuth";
  }
  return (
    <header className="w-full h-16 bg-gray-800 text-white flex items-center justify-center">
      <h1 className="text-xl font-bold">WT Assignment Dashboard</h1>
      <nav>
        <Button onClick={loginBtn}>Login with GitHub</Button>
      </nav>
    </header>
  );
}
