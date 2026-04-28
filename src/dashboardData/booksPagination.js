export function getPagination(pageInfo, searchParameters) {
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPageParams = new URLSearchParams(searchParameters);
  prevPageParams.set("bookPage", String(currentBookIndex - booksPerPage));

  const nextPageParams = new URLSearchParams(searchParameters);
  nextPageParams.set("bookPage", String(currentBookIndex + booksPerPage));

  const prevPage = `/dashboard?${prevPageParams.toString()}`;
  const nextPage = `/dashboard?${nextPageParams.toString()}`;

  return { prevPage, nextPage };
}