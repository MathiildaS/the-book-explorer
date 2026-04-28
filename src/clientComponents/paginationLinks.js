import Link from "next/link.js";

export default function PaginationLinks({ pageInfo, pagination }) {
  if (!pageInfo) {
    return null;
  }

  return (
    <div className="mt-6 flex justify-between">
      {pageInfo.prevPage ? (
        <Link href={pagination.prevPage}>Previous Page</Link>
      ) : (
        <span />
      )}

      {pageInfo.nextPage && (
        <Link href={pagination.nextPage}>Next Page</Link>
      )}
    </div>
  );
}