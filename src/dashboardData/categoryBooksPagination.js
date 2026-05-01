/**
 * @file Handles pagination logic for displaying books in categories.
 * @module dashboardData/categoryBooksPagination.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Creates pagination URLs for pages of books in a category based on the current page information and search parameters.
 * 
 * @param {object} pageInfo - The current info of the page such as the index of the first book to display and the number of books per page.
 * @param {object} searchParameters - URLSearchParams object containing the current search parameters.
 * @returns {object} An object containing the URLs for the previous and next pages of books in the category.
 */
export function getCategoryBooksPagination(pageInfo, searchParameters) {
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPageParams = new URLSearchParams(searchParameters);
  prevPageParams.set("categoryBookPage", String(currentBookIndex - booksPerPage));

  const nextPageParams = new URLSearchParams(searchParameters);
  nextPageParams.set("categoryBookPage", String(currentBookIndex + booksPerPage));

  const prevPage = `/dashboard?${prevPageParams.toString()}`;
  const nextPage = `/dashboard?${nextPageParams.toString()}`;

  return { prevPage, nextPage };
}