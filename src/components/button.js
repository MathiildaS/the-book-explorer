export default function Button({children, onClick, type = "button"}) {
    return (
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={onClick} type={type}>
            {children}
        </button>
    )
}