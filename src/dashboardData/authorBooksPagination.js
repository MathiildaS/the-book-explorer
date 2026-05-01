/**
 * @file Handles pagination logic for displaying books written by an author.
 * @module dashboardData/authorBooksPagination.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Creates pagination URLs for pages of books writen by an authorbased on the current page information and search parameters.
 * 
 * @param {object} pageInfo - The current info of the page such as the index of the first book to display and the number of books per page.
 * @param {object} searchParameters - URLSearchParams object containing the current search parameters.
 * @returns {object} An object containing the URLs for the previous and next pages of books written by the author.
 */
export function getAuthorBooksPagination(pageInfo, searchParameters) {
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPageParams = new URLSearchParams(searchParameters);
  prevPageParams.set("authorBookPage", String(currentBookIndex - booksPerPage));

  const nextPageParams = new URLSearchParams(searchParameters);
  nextPageParams.set("authorBookPage", String(currentBookIndex + booksPerPage));

  const prevPage = `/dashboard?${prevPageParams.toString()}`;
  const nextPage = `/dashboard?${nextPageParams.toString()}`;

  return { prevPage, nextPage };
}
