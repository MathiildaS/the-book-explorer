export function getFiltering(searchParameters) {  
  const bookLimit = Number(searchParameters.bookLimit) || 12;
  const pageIndex = Number(searchParameters.pageIndex) || 0;
  const bookTitleFilter = searchParameters.bookTitle || "";
  const authorNameFilter = searchParameters.authorName || "";
  const categoryNameFilter = searchParameters.categoryName || "";
  const publisherNameFilter = searchParameters.publisherName || "";

  const filter = {
    title: bookTitleFilter || undefined,
    author: authorNameFilter || undefined,
    category: categoryNameFilter || undefined,
    publisher: publisherNameFilter || undefined,
  };

  const formFilter = {
  bookTitle: bookTitleFilter,
  authorName: authorNameFilter,
  categoryName: categoryNameFilter,
  publisherName: publisherNameFilter,
  limit: bookLimit,
};
  return { bookLimit, pageIndex, filter, formFilter };
}