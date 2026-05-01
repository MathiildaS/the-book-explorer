/**
 * @file Creates a book list component displaying books written by a selected author.
 * @module clientComponents/authorBookList.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import BookObject from "./bookList.js";

/**
 * Component to display the list of books for a selected author.
 *
 * @returns {JSX.Element} The list of books written by the selected author.
 */
export default function AuthorBooksList({ books }) {
  return (
    <section className="w-full mt-8">
      <h2>Books by selected author</h2>

      <div className="mt-6 space-y-6">
        {books.map((book) => (
          <BookObject key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}