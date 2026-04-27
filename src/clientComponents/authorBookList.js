import BookObject from "./bookList.js";

export default function AuthorBooksList({ books }) {
  return (
    <section className="w-full mt-8">
      <h2 className="text-xl font-semibold">Books by selected author</h2>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}