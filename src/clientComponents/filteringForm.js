/**
 * @file Creates the filtering form component.
 * @module clientComponents/filteringForm.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import Link from "next/link";

/**
 * Creates a form component for filtering books based on title, author, category and publisher with amount of books to display-option
 * 
 * @param {object} filter - props containing the current filter values for book title, author name and publisher name with selection of category and limit.
 * @param {object} categories - props containing the list of categories.
 * @returns {JSX.Element} The form component with input fields for filtering books and a clear button to reset the filters.
 */
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
        />

        <input
          type="text"
          name="authorName"
          placeholder="Author name"
          defaultValue={authorName}
        />

        <select name="categoryName" defaultValue="">
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
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <select name="bookLimit" defaultValue={limit}>
            <option value="6">6</option>
            <option value="12">12</option>
            <option value="24">24</option>
          </select>
        </div>

        <div className="flex gap-2 items-center">
          <input type="hidden" name="bookPage" value="0" />

          <button type="submit">Filter</button>

          <Link href="/dashboard" className="clear-button">
            Clear
          </Link>
        </div>
      </div>
    </form>
  );
}
