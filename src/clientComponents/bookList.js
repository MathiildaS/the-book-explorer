export default function BookObject({ book }) {
  const {
    title,
    description,
    publishMonth,
    publishYear,
    publisher,
    authors,
    categories,
  } = book;

  return (
    <div
      className="group cursor-pointer rounded-xl p-5 transition hover:scale-[1.01]"
      style={{
        background: "var(--background)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h4 className="mb-2">{title}</h4>
      <p
        className="mb-4 text-sm"
        style={{
          color: "var(--accent-dark)",
          maxWidth: "none",
        }}
      >
        <strong>Authors: </strong> {authors.map((a) => a.name).join(", ")}
        <strong> | Publisher: </strong>
        {publisher.name} , {publishMonth}/{publishYear}
        <strong> | Categories:</strong>{" "}
        {categories.map((c) => c.name).join(", ")}
      </p>

      <div className="mt-3 max-h-0 overflow-hidden group-hover:max-h-40 transition-all duration-300">
        <p style={{ maxWidth: "none" }}>{description}</p>
      </div>
    </div>
  );
}
