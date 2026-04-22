import { getCookie } from "./jwtCookie.js";

/**
 *
 * @returns
 */
export async function getBooks(numberOfBooks, bookIndex, filter) {
  try {
    const jwtToken = await getCookie();

    const allBooks = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: `
      query ($booksPerPage: Int, 
      $currentBookIndex: Int, 
      $title: String,
            $authorName: String,
            $categoryName: String,
            $publisherName: String){
      books(
        booksPerPage: $booksPerPage
        currentBookIndex: $currentBookIndex
              title: $title
              authorName: $authorName
              categoryName: $categoryName
              publisherName: $publisherName
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
  name
}

categories {
  name
}
    }
    }
    }
  `,
        variables: {
          booksPerPage: numberOfBooks,
          currentBookIndex: bookIndex,
          title: filter.title,
          authorName: filter.author,
          categoryName: filter.category,
          publisherName: filter.publisher,
        },
      }),
    });

    const allBooksData = await allBooks.json();

    if (allBooksData.errors) {
  console.log("GraphQL errors:", allBooksData.errors);

  return {
    authError: false,
    fetchError: true,
  };
}

    if (
      allBooks.status === 401 ||
      allBooksData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    if (!allBooksData) {
      throw new Error("Failed to retrieve books data from API");
    }

    const bookObject = {
      authError: false,
      data: allBooksData.data.books,
    };

    return bookObject;
  } catch (error) {
    const getBooksError = {
      authError: false,
      fetchError: true
    };

    return getBooksError;
  }
}
