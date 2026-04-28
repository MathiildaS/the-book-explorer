export default function Button({ children, onClick, type = "button", className = "" }) {
  return (
    <button onClick={onClick} type={type} className={`flex items-center gap-2 ${className}`}>
      {children}
    </button>
  );
}
