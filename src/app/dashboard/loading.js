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
