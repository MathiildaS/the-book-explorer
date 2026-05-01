/**
 * @file Creates the list for the chart component displaying books for a selected author or category.
 * @module clientComponents/chartBookList.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import BookObject from "./bookList.js";

/**
 * Component to display the list of books for a selected author or category in the chart component.
 *
 * @returns {JSX.Element} The list of books.
 */
export default function ChartBookList({ books, title }) {
  return (
    <section className="w-full mt-8">
      <h3 className="uppercase">{title}</h3>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}