export default function Button({children, onClick}) {
    return (
        <button className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700" onClick={onClick}>{children}</button>
    )
}