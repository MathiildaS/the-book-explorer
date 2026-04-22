import { getBooks } from "../../dashboardData/getBooks.js";
import { getTopAuthors } from "../../dashboardData/getAuthorToplist.js";
import { redirect } from "next/navigation";
import TopAuthorChart from "../../clientComponents/topAuthorChart.js";
import Link from "next/link.js";
import FilteringForm from "../../clientComponents/filteringForm.js";
import { getFiltering } from "../../dashboardData/getFiltering.js";
import BookObject from "../../clientComponents/bookList.js";
import { getPagination } from "../../dashboardData/getPagination.js";
import { getAllCategories } from "../../dashboardData/getCategories.js";

/**
 *
 * @returns
 */
export default async function Dashboard({ searchParams }) {
  const searchParameters = await searchParams;

  const { bookLimit, pageIndex, filter, formFilter } =
    getFiltering(searchParameters);

  const allBooksResult = await getBooks(bookLimit, pageIndex, filter);
  const authorToplistResult = await getTopAuthors(20);
  const allCategoriesResult = await getAllCategories();

  if (
    allBooksResult.authError ||
    authorToplistResult.authError ||
    allCategoriesResult.authError
  ) {
    return redirect("/api/user");
  }

  if (allBooksResult.fetchError || !allBooksResult.data) {
    throw new Error("Could not fetch books");
  }

  if (authorToplistResult.fetchError || !authorToplistResult.data) {
    throw new Error("Could not fetch top authors");
  }

  if (allCategoriesResult.fetchError || !allCategoriesResult.data) {
    throw new Error("Could not fetch categories");
  }

  const { books, pageInfo } = allBooksResult.data;
  const authors = authorToplistResult.data;
  const categories = allCategoriesResult.data;

  const { prevPage, nextPage } = getPagination(pageInfo, formFilter);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Dashboard</h1>
        <TopAuthorChart authors={authors} />

        <FilteringForm filter={formFilter} categories={categories}/>

        <p className="mt-4">List of Books: {books.length}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {books.map((book) => (
            <BookObject key={book.id} book={book} />
          ))}
        </div>

        <div>
          {pageInfo.prevPage && <Link href={prevPage}>Previous Page</Link>}
          {pageInfo.nextPage && <Link href={nextPage}>Next Page</Link>}
        </div>
      </main>
    </div>
  );
}
