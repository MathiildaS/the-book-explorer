import { getBooks } from "../../dashboardData/books.js";
import { getTopAuthors } from "../../dashboardData/authorToplist.js";
import { redirect } from "next/navigation";
import TopAuthorChart from "../../clientComponents/toplistChart.js";
import Link from "next/link.js";
import FilteringForm from "../../clientComponents/filteringForm.js";
import { getFiltering } from "../../dashboardData/bookFilter.js";
import BookObject from "../../clientComponents/bookList.js";
import { getPagination } from "../../dashboardData/booksPagination.js";
import { getAllCategories } from "../../dashboardData/bookCategories.js";
import { getBooksOfAuthor } from "../../dashboardData/authorBooks.js";
import AuthorBooksList from "../../clientComponents/authorBookList.js";
import { getAuthorBooksPagination } from "../../dashboardData/authorBooksPagination.js";
import { getTopCategories } from "../../dashboardData/categoriesToplist.js";
import { getBooksInCategory } from "../../dashboardData/categoryBooks.js";
import { getCategoryBooksPagination } from "../../dashboardData/categoryBooksPagination.js";
import CategoryBooksList from "../../clientComponents/categoryBookList.js";

/**
 *
 * @returns
 */
export default async function Dashboard({ searchParams }) {
  const searchParameters = await searchParams;

  const authorId = searchParameters.authorId;
  const categoryId = searchParameters.categoryId;

  const { bookLimit, pageIndex, filter, formFilter } =
    getFiltering(searchParameters);

  const allBooksResult = await getBooks(bookLimit, pageIndex, filter);
  const authorToplistResult = await getTopAuthors(10);
  const allCategoriesResult = await getAllCategories();
  const categoryToplistResult = await getTopCategories(10);

  if (
    allBooksResult.authError ||
    authorToplistResult.authError ||
    allCategoriesResult.authError ||
    categoryToplistResult.authError
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

  if (categoryToplistResult.fetchError || !categoryToplistResult.data) {
    throw new Error("Could not fetch top categories");
  }

  const { books, pageInfo } = allBooksResult.data;
  const authors = authorToplistResult.data;
  const categories = allCategoriesResult.data;
  const topCategories = categoryToplistResult.data;

  let authorData = {
    books: [],
    pageInfo: null,
    pagination: { prevPage: null, nextPage: null },
  };

  if (authorId) {
    const authorBookPage = Number(searchParameters.authorBookPage) || 0;

    const authorBookPageData = {
      authorId,
      numberOfBooks: 8,
      bookIndex: authorBookPage,
    };

    const result = await getBooksOfAuthor(authorBookPageData);

    if (result?.authError) return redirect("/api/user");

    if (result?.fetchError || !result?.data) {
      throw new Error("Could not fetch books of author");
    }

    const pageInfo = result.data.pageInfo;

    authorData = {
      books: result.data.books || [],
      pageInfo,
      pagination: getAuthorBooksPagination(pageInfo, searchParameters),
    };
  }

  let categoryData = {
    books: [],
    pageInfo: null,
    pagination: { prevPage: null, nextPage: null },
  };

  if (categoryId) {
    const categoryBookPage = Number(searchParameters.categoryBookPage) || 0;

    const categoryBookPageData = {
      categoryId,
      numberOfBooks: 8,
      bookIndex: categoryBookPage,
    };

    const result = await getBooksInCategory(categoryBookPageData);

    if (result?.authError) return redirect("/api/user");

    if (result?.fetchError || !result?.data) {
      throw new Error("Could not fetch books in category");
    }

    const pageInfo = result.data.pageInfo;

    categoryData = {
      books: result.data.books || [],
      pageInfo,
      pagination: getCategoryBooksPagination(pageInfo, searchParameters),
    };
  }

  const { prevPage, nextPage } = getPagination(pageInfo, formFilter);

  return (
    <div className="min-h-full bg-zinc-50 px-6 py-8 dark:bg-black">
      <main className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_500px]">
        <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
          <h1 className="text-2xl font-bold">Books</h1>

          <FilteringForm filter={formFilter} categories={topCategories} />

          <p className="mt-4 text-sm text-zinc-500">
            Showing {books.length} books
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {books.map((book) => (
              <BookObject key={book.id} book={book} />
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            {pageInfo.prevPage ? (
              <Link href={prevPage}>Previous Page</Link>
            ) : (
              <span />
            )}
            {pageInfo.nextPage && <Link href={nextPage}>Next Page</Link>}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">
              Top 10 Authors and Categories
            </h2>
            <div className="mt-4">
              <TopAuthorChart authors={authors} categories={categories} />
            </div>
          </section>

          {authorId && (
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h2 className="text-lg font-semibold">
                Books by selected author
              </h2>

              <AuthorBooksList books={authorData.books} />

              {authorData.pageInfo && (
                <div className="mt-6 flex justify-between">
                  {authorData.pageInfo.prevPage ? (
                    <Link href={authorData.pagination.prevPage}>
                      Previous Page
                    </Link>
                  ) : (
                    <span />
                  )}

                  {authorData.pageInfo.nextPage && (
                    <Link href={authorData.pagination.nextPage}>Next Page</Link>
                  )}
                </div>
              )}
            </section>
          )}

          {categoryId && (
            <section className="rounded-xl bg-white p-6 shadow-sm dark:bg-zinc-900">
              <h2 className="text-lg font-semibold">
                Books in selected category
              </h2>

              <CategoryBooksList books={categoryData.books} />

              {categoryData.pageInfo && (
                <div className="mt-6 flex justify-between">
                  {categoryData.pageInfo.prevPage ? (
                    <Link href={categoryData.pagination.prevPage}>
                      Previous Page
                    </Link>
                  ) : (
                    <span />
                  )}

                  {categoryData.pageInfo.nextPage && (
                    <Link href={categoryData.pagination.nextPage}>
                      Next Page
                    </Link>
                  )}
                </div>
              )}
            </section>
          )}
        </aside>
      </main>
    </div>
  );
}
