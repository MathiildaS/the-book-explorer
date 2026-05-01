/**
 * @file Creates a book list component displaying books for a selected category.
 * @module clientComponents/categoryBookList.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import BookObject from "./bookList.js";

/**
 * Component to display the list of books for a selected category.
 *
 * @returns {JSX.Element} The list of books within the selected category.
 */
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