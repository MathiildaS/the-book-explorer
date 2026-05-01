/**
 * @file Creates the footer component.
 * @module clientComponents/footer.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Component to display the footer on all pages of the app.
 *
 * @returns {JSX.Element} The footer component.
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
      <p style={{ color: "#F5EFE6" }}>Created as part of a course at Linnaeus University - WT Assignment - Created by Mathilda Segerlund</p>
    </footer>
  );
}
