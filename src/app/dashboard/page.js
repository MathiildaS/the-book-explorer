import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import TopAuthorChart from "../../clientComponents/topAuthorChart.js";

/**
 *
 * @returns
 */
export default async function Dashboard() {
  const testdata = [
    { id: 1, name: "Author 1", amountOfBooks: 5 },
    { id: 2, name: "Author 2", amountOfBooks: 3 },
    { id: 3, name: "Author 3", amountOfBooks: 8 },
  ];

  const allBooksResult = await getBooks();

  if (allBooksResult.authError) {
    return redirect("/api/user");
  }

  const { books } = allBooksResult.data;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Dashboard</h1>
        <TopAuthorChart authors={testdata} />

        <p>List of Books: {books.length}</p>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              <h2>Title: {book.title}</h2>
              <p>Description: {book.description}</p>
              <p>Price: ${book.price}</p>
              <p>Publish Month: {book.publishMonth}</p>
              <p>Publish Year: {book.publishYear}</p>
              <p>Publisher: {book.publisher.name}</p>
              <p>
                Authors: {book.authors.map((author) => author.name).join(", ")}
              </p>
              <p>
                Categories:{" "}
                {book.categories.map((category) => category.name).join(", ")}
              </p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/**
 *
 * @returns
 */
async function getBooks() {
  try {
    const jwtToken = await getCookie();

    const allBooks = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: `
      query ($booksPerPage: Int, $currentBookIndex: Int){
      books(
        booksPerPage: $booksPerPage
        currentBookIndex: $currentBookIndex
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
          booksPerPage: 15,
          currentBookIndex: 0,
        },
      }),
    });

    const allBooksData = await allBooks.json();

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
    const authError = {
      authError: true,
    };

    return authError;
  }
}
