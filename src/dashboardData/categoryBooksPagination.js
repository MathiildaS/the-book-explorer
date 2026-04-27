export function getCategoryBooksPagination(pageInfo, searchParameters) {
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPageParams = new URLSearchParams(searchParameters);
  prevPageParams.set("categoryBookPage", String(currentBookIndex - booksPerPage));

  const nextPageParams = new URLSearchParams(searchParameters);
  nextPageParams.set("categoryBookPage", String(currentBookIndex + booksPerPage));

  const prevPage = `/dashboard?${prevPageParams.toString()}`;
  const nextPage = `/dashboard?${nextPageParams.toString()}`;

  return { prevPage, nextPage };
}