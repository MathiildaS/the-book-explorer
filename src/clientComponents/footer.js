/**
 * Component to display the footer on all pages of the app.
 * @returns The footer component.
 */
export default function Footer() {
  return (
    <footer
      className="w-full flex items-center justify-center"
      style={{
        background: "#3D2B1F",
        height: "80px",
      }}
    >
      <p style={{ color: "#F5EFE6" }}>WT Assignment</p>
    </footer>
  );
}
