export function getAuthorBooksPagination(pageInfo, searchParameters) {
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPageParams = new URLSearchParams(searchParameters.toString());
  prevPageParams.set("authorBookPage", String(currentBookIndex - booksPerPage));

  const nextPageParams = new URLSearchParams(searchParameters.toString());
  nextPageParams.set("authorBookPage", String(currentBookIndex + booksPerPage));

  return {
    prevPage: `/dashboard?${prevPageParams.toString()}`,
    nextPage: `/dashboard?${nextPageParams.toString()}`,
  };
}