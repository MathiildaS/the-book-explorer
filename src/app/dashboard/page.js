import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Dashboard</h1>
      </main>
    </div>
  );
}

async function getCookie() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (!jwtToken) {
    redirect("/");
  }
  return jwtToken.value;
}

async function getBooks() {
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
      price
      publishYear
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

  if (!allBooksData) {
    const error = new Error("Failed to retrieve books data from API");
    error.status = 500;
    throw error;
  }

  return allBooksData.data.books;
}
