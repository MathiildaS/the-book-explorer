import BookObject from "./bookList.js";

export default function CategoryBooksList({ books }) {
  return (
    <section className="w-full mt-8">
      <h2>Books by selected category</h2>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}