import Link from "next/link";

export default function FilteringForm({ filter, categories }) {
  const { bookTitle, authorName, categoryName, publisherName, limit } = filter;

  return (
    <form method="GET" className="w-full mt-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          type="text"
          name="bookTitle"
          placeholder="Book title"
          defaultValue={bookTitle}
          className="border rounded px-3 py-2"
        />

        <input
          type="text"
          name="authorName"
          placeholder="Author name"
          defaultValue={authorName}
          className="border rounded px-3 py-2"
        />

        <select
          name="categoryName"
          defaultValue=""
          className="border rounded px-3 py-2"
        >
          <option value="">Select category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="publisherName"
          placeholder="Publisher name"
          defaultValue={publisherName}
          className="border rounded px-3 py-2"
        />
      </div>

      <div className="flex gap-4 items-center">
        <select
          name="bookLimit"
          defaultValue={limit}
          className="border rounded px-3 py-2"
        >
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>

        <input type="hidden" name="pageIndex" value="0" />

        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Filter
        </button>

        <Link href="/dashboard" className="border px-4 py-2 rounded">
          Clear
        </Link>
      </div>
    </form>
  );
}
