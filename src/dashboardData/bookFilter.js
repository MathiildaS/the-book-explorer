/**
 * @file Handles the filtering of books based on search parameters.
 * @module dashboardData/bookFilter.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Filters books based on the provided search parameters.
 *
 * @param {object} searchParameters - The search parameters for filtering books.
 * @returns {object} An object with the filtered books or an error object.
 */
export function getFiltering(searchParameters) {
  const bookLimit = Number(searchParameters.bookLimit) || 12;
  const bookPage = Number(searchParameters.bookPage) || 0;
  const bookTitleFilter = searchParameters.bookTitle || "";
  const authorNameFilter = searchParameters.authorName || "";
  const categoryNameFilter = searchParameters.categoryName || "";
  const publisherNameFilter = searchParameters.publisherName || "";

  // Using undefined for filters that are empty strings to avoid sending empty string filters to the API
  const filter = {
    title: bookTitleFilter || undefined,
    author: authorNameFilter || undefined,
    category: categoryNameFilter || undefined,
    publisher: publisherNameFilter || undefined,
  };

  const formFilter = {
    bookTitle: bookTitleFilter,
    authorName: authorNameFilter,
    categoryName: categoryNameFilter,
    publisherName: publisherNameFilter,
    limit: bookLimit,
  };
  return { bookLimit, bookPage, filter, formFilter };
}
