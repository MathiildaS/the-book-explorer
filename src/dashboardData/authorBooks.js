/**
 * @file Handles the fetching of books written by a specific author.
 * @module dashboardData/authorBooks.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { getCookie } from "./jwtCookie";

/**
 * Fetches books written by a specific author based on the provided page data.
 *
 * @param {object} authorBookPageData - Data containing author ID and pagination information.
 * @returns {object} An object with the fetched books or an error object.
 */
export async function getBooksOfAuthor(authorBookPageData) {
  try {
    const { authorId, numberOfBooks, bookIndex } = authorBookPageData;
    const jwtToken = await getCookie();

    if (!jwtToken) {
      return { authError: true };
    }

    const API_URL =
      process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

    const getAuthorBooks = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ($booksPerPage: Int, $currentBookIndex: Int, $authorId: ID) {
            books(
              booksPerPage: $booksPerPage
              currentBookIndex: $currentBookIndex
              authorId: $authorId
            ) {
              pageInfo {
                totalBooks
                booksPerPage
                currentBookIndex
                nextPage
                prevPage
              }
              books {
                id
                title
                description
                price
                publishMonth
                publishYear
                publisher {
                  name
                }
                authors {
                  id
                  name
                }
                categories {
                  id
                  name
                }
              }
            }
          }
        `,
        variables: {
          booksPerPage: numberOfBooks,
          currentBookIndex: bookIndex,
          authorId: authorId,
        },
      }),
    });

    const authorBooksData = await getAuthorBooks.json();

    if (
      getAuthorBooks.status === 401 ||
      authorBooksData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    if (
      !authorBooksData ||
      !authorBooksData.data ||
      !authorBooksData.data.books
    ) {
      throw new Error("Failed to retrieve books of author");
    }

    const authorBooksObject = {
      authError: false,
      data: authorBooksData.data.books,
    };

    return authorBooksObject;
  } catch (error) {
    const getAuthorBooksError = {
      authError: false,
      fetchError: true,
    };

    return getAuthorBooksError;
  }
}
