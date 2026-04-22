export function getPagination(pageInfo, formFilter) {
  const { bookTitle, authorName, categoryName, publisherName, limit } = formFilter;
  const { currentBookIndex, booksPerPage } = pageInfo;

  const prevPage = `/dashboard?bookLimit=${limit}&pageIndex=${currentBookIndex - booksPerPage}&bookTitle=${bookTitle}&authorName=${authorName}&categoryName=${categoryName}&publisherName=${publisherName}`;
  const nextPage = `/dashboard?bookLimit=${limit}&pageIndex=${currentBookIndex + booksPerPage}&bookTitle=${bookTitle}&authorName=${authorName}&categoryName=${categoryName}&publisherName=${publisherName}`;
  return { prevPage, nextPage };
}
