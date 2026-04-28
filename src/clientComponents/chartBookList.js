import BookObject from "./bookList.js";

export default function ChartBookList({ books, title }) {
  return (
    <section className="w-full mt-8">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}