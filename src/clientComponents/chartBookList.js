import BookObject from "./bookList.js";

export default function ChartBookList({ books, title }) {
  return (
    <section className="w-full mt-8">
      <h3>{title}</h3>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}