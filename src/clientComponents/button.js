/**
 * @file Creates a button component.
 * @module clientComponents/button.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Component to display a button that triggers an action on click.
 *
 * @returns {JSX.Element} The button component.
 */
export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button onClick={onClick} type={type} className={`flex items-center gap-2 ${className}`}>
      {children}
    </button>
  );
}
