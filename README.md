The Book Explorer

## Performance
The application is designed to remain responsive when working with a large dataset.

Books are loaded using database-level pagination with SQL `LIMIT` and `OFFSET`, meaning that the application only requests the books needed for the current page instead of loading the entire dataset at once.

Filtering is also handled on the server side. Search parameters such as title, author, publisher, and category are applied directly in the database query using SQL `WHERE` conditions.

The toplists for authors and categories are generated through server-side aggregation. This means that the API calculates the top authors and categories before sending the result to the client, reducing the amount of data that needs to be processed in the browser.

The application also includes a loading page to provide feedback during longer navigation or data-fetching operations.