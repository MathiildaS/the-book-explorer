export default function BookObject({ book }) {
  const {
    title,
    description,
    price,
    publishMonth,
    publishYear,
    publisher,
    authors,
    categories
  } = book;

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-lg font-semibold mb-2">{title}</h2>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {description}
      </p>

      <div className="text-sm space-y-1">
        <p>
          <span className="font-medium">Price:</span> ${price}
        </p>
        <p>
          <span className="font-medium">Published:</span> {publishMonth}/
          {publishYear}
        </p>
        <p>
          <span className="font-medium">Publisher:</span> {publisher.name}
        </p>
      </div>

      <div className="mt-3 text-sm">
        <p>
          <span className="font-medium">Authors:</span>{" "}
          {authors.map((author) => author.name).join(", ")}
        </p>

        <p>
          <span className="font-medium">Categories:</span>{" "}
          {categories.map((category) => category.name).join(", ")}
        </p>
      </div>
    </div>
  );
}
