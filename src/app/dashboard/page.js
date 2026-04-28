import { getBooks } from "../../dashboardData/books.js";
import { getTopAuthors } from "../../dashboardData/authorToplist.js";
import { redirect } from "next/navigation";
import ToplistChart from "../../clientComponents/toplistChart.js";
import FilteringForm from "../../clientComponents/filteringForm.js";
import { getFiltering } from "../../dashboardData/bookFilter.js";
import BookObject from "../../clientComponents/bookList.js";
import { getPagination } from "../../dashboardData/booksPagination.js";
import { getAllCategories } from "../../dashboardData/bookCategories.js";
import { getBooksOfAuthor } from "../../dashboardData/authorBooks.js";
import { getAuthorBooksPagination } from "../../dashboardData/authorBooksPagination.js";
import { getTopCategories } from "../../dashboardData/categoriesToplist.js";
import { getBooksInCategory } from "../../dashboardData/categoryBooks.js";
import { getCategoryBooksPagination } from "../../dashboardData/categoryBooksPagination.js";
import ChartBookList from "../../clientComponents/chartBookList.js";
import PaginationLinks from "../../clientComponents/paginationLinks.js";

/**
 *
 * @returns
 */
export default async function Dashboard({ searchParams }) {
  const searchParameters = await searchParams;

  const authorId = searchParameters.authorId;
  const categoryId = searchParameters.categoryId;

  const { bookLimit, bookPage, filter, formFilter } =
    getFiltering(searchParameters);

  const allBooksResult = await getBooks(bookLimit, bookPage, filter);
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

  const selectedAuthor = authors.find(
    (author) => String(author.id) === String(authorId),
  );

  const selectedCategory = topCategories.find(
    (category) => String(category.id) === String(categoryId),
  );

  const { prevPage, nextPage } = getPagination(pageInfo, searchParameters);
  const bookPagination = {
    prevPage,
    nextPage,
  };

  return (
    <div
      className="min-h-full px-6 py-8"
      style={{ background: "var(--background)" }}
    >
      <main className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_550px]">
        <section className="rounded-xl p-6" style={{ background: "#EDE0D0" }}>
          <h2>Books</h2>

          <FilteringForm filter={formFilter} categories={categories} />

          <p className="mt-4 text-sm" style={{ color: "#7C5C3E" }}>
            Showing {books.length} books
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6">
            {books.map((book) => (
              <BookObject key={book.id} book={book} />
            ))}
          </div>

          <PaginationLinks pageInfo={pageInfo} pagination={bookPagination} />
        </section>

        <aside>
          <section className="rounded-xl p-6" style={{ background: "#EDE0D0" }}>
            <ToplistChart authors={authors} categories={topCategories} />

            {authorId && (
              <div className="mt-8">
                <ChartBookList
                  books={authorData.books}
                  title={`Books by ${
                    selectedAuthor ? selectedAuthor.name : "selected author"
                  }`}
                />

                <PaginationLinks
                  pageInfo={authorData.pageInfo}
                  pagination={authorData.pagination}
                />
              </div>
            )}

            {categoryId && (
              <div className="mt-8">
                <ChartBookList
                  books={categoryData.books}
                  title={`Books in ${
                    selectedCategory
                      ? selectedCategory.name
                      : "selected category"
                  }`}
                />

                <PaginationLinks
                  pageInfo={categoryData.pageInfo}
                  pagination={categoryData.pagination}
                />
              </div>
            )}
          </section>
        </aside>
      </main>
    </div>
  );
}
