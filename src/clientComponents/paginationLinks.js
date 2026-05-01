/**
 * @file Creates pagination links for navigating between pages of books.
 * @module clientComponents/paginationLinks.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import Link from "next/link.js";

/**
 * Creates pagination links for navigating between pages of books.
 * 
 * @param {object} pageInfo - props containing information about the current page.
 * @param {object} pagination - props containing the URLs for the previous and next pages.
 * @returns {JSX.Element} A set of pagination links.
 */
export default function PaginationLinks({ pageInfo, pagination }) {
  if (!pageInfo) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-between">
      {pageInfo.prevPage ? (
        <Link href={pagination.prevPage}>Previous Page</Link>
      ) : (
        <span />
      )}

      {pageInfo.nextPage && (
        <Link href={pagination.nextPage}>Next Page</Link>
      )}
    </div>
  );
}