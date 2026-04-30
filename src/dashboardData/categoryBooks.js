import { getCookie } from "./jwtCookie";

export async function getBooksInCategory(categoryBookPageData) {
  try {
    const { categoryId, numberOfBooks, bookIndex } = categoryBookPageData;
    const jwtToken = await getCookie();

    if (!jwtToken) {
      return { authError: true };
    }

    const API_URL =
      process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

    const getCategoryBooks = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ($booksPerPage: Int, $currentBookIndex: Int, $categoryId: ID) {
            books(
              booksPerPage: $booksPerPage
              currentBookIndex: $currentBookIndex
              categoryId: $categoryId
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
          categoryId: categoryId,
        },
      }),
    });

    const categoryBooksData = await getCategoryBooks.json();

    if (
      getCategoryBooks.status === 401 ||
      categoryBooksData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    if (
      !categoryBooksData ||
      !categoryBooksData.data ||
      !categoryBooksData.data.books
    ) {
      throw new Error("Failed to retrieve books within category");
    }

    const categoryBooksObject = {
      authError: false,
      data: categoryBooksData.data.books,
    };

    return categoryBooksObject;
  } catch (error) {
    const getCategoryBooksError = {
      authError: false,
      fetchError: true,
    };

    return getCategoryBooksError;
  }
}
