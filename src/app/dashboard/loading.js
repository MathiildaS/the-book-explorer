/**
 * @file Creates the loading page component to display a loading message while the application is fetching data and loading.
 * @module app/dashboard/loading.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Component to display the loading page with a loading message.
 *
 * @returns {JSX.Element} The loading page component.
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "var(--background)" }}
    >
      <p
        style={{
          color: "var(--accent-dark)",
          letterSpacing: "2px",
          textTransform: "uppercase",
          fontSize: "12px",
        }}
      >
        Loading... Please wait.
      </p>
    </div>
  );
}
