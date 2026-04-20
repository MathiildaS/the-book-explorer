import { getBooks } from "../../dashboardData/getBooks.js";
import { getTopAuthors } from "../../dashboardData/getAuthorToplist.js";
import { redirect } from "next/navigation";
import TopAuthorChart from "../../clientComponents/topAuthorChart.js";
import Link from "next/link.js";

/**
 *
 * @returns
 */
export default async function Dashboard({ searchParams }) {
  const searchParameters = await searchParams;
  const bookLimit = Number(searchParameters.bookLimit) || 12;
  const pageIndex = Number(searchParameters.pageIndex) || 0;

  const allBooksResult = await getBooks(bookLimit, pageIndex);
  const authorToplistResult = await getTopAuthors(20);

  if (allBooksResult.authError || authorToplistResult.authError) {
    return redirect("/api/user");
  }

  const { books, pageInfo } = allBooksResult.data;
  const authors = authorToplistResult.data;

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Dashboard</h1>
        <TopAuthorChart authors={authors} />

        <p className="mt-4">List of Books: {books.length}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md p-5 hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold mb-2">{book.title}</h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {book.description}
              </p>

              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Price:</span> ${book.price}
                </p>
                <p>
                  <span className="font-medium">Published:</span>{" "}
                  {book.publishMonth}/{book.publishYear}
                </p>
                <p>
                  <span className="font-medium">Publisher:</span>{" "}
                  {book.publisher.name}
                </p>
              </div>

              <div className="mt-3 text-sm">
                <p>
                  <span className="font-medium">Authors:</span>{" "}
                  {book.authors.map((a) => a.name).join(", ")}
                </p>

                <p>
                  <span className="font-medium">Categories:</span>{" "}
                  {book.categories.map((c) => c.name).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div>
          {pageInfo.prevPage && (
            <Link
              href={`/dashboard?bookLimit=${bookLimit}&pageIndex=${pageInfo.currentBookIndex - pageInfo.booksPerPage}`}
            >
              Previous Page
            </Link>
          )}
          {pageInfo.nextPage && (
            <Link
              href={`/dashboard?bookLimit=${bookLimit}&pageIndex=${pageInfo.currentBookIndex + pageInfo.booksPerPage}`}
            >
              Next Page
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
