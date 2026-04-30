# the-book-explorer

This is a Next.js web appliction that allows users to explore and visualize a large dataset of books and built as frontend for the book-graphql-api.

Users can browse through a paginated list of books, filter books by title, author, publisher and category and also view details such as publishing date and description. The application also provides an interactive chart displaying the top 10 authors based on amount of written books and top 10 categories based on the number of books in each category.

The application is deployed at: https://cu3236.camp.lnu.se

## Tech Stack

- Next.js: A React framework for building server-rendered applications.
- React: A JavaScript library for building user interfaces.
- Chart.js: A JavaScript library for creating interactive charts.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- GitHub OAuth: Used for authentication to access the book-graphql-api.

## Features

When visiting the application, users land on a login page where they can authenticate using GitHub OAuth. Upon successful login, the user is redirected to the dashboard.
On the dashboard, users can:

- Filter books by title, author, publisher or category and select how many books to display per page
- Navigate between pages using pagination links
- Hover over book cards to reveal the description of each book
- View a Top 10 chart of authors (by number of books written) or categories (by number of books within each category)
- Click on a bar in the chart to display all books by that author or within that category, with its own pagination

## Setup and Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MathiildaS/the-book-explorer.git
   ```

2. Navigate to the project directory:

   ```bash
   cd the-book-explorer
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root of the project and add these variables:

   ```bash
   NEXT_PUBLIC_API_URL=https://cu3236.camp.lnu.se/graphql
   REDIRECT_URL=https://cu3236.camp.lnu.se/api/githubAuth/callback
   CLIENT_ID=your_github_client_id
   CLIENT_SECRET=your_github_client_secret
   APP_URL=https://cu3236.camp.lnu.se
   ```

5. Build and start the application:

   ```bash
   npm run build
   npm run dev
   ```

## Design Decisions

### Data Fetching

Data is fetched on the server side before rendering the page is sent to the client. Avoids client-side loading states and enhances the perfomance.

### Authentication

GitHub OAuth is implemented using Next.js API route handlers. When a user logs in:

1. The user is redirected to GitHub's authorization page
2. GitHub redirects back with a temporary code
3. The code is exchanged for an access token, which is used to fetch the user's GitHub profile
4. The profile is sent to the books-graphql-api, which registers or logs in the user and returns a JWT
5. The JWT is stored as an httpOnly cookie with sameSite: "none" and secure: true, making it inaccessible to JavaScript and resilient across cross-site redirects
6. The token expires after 2 hours, balancing security and usability

### Error handling

The application includes error handling for various scenarios:

- Authentication flow: Expected errors (missing code, failed token exchange) are caught in route handlers using try/catch and redirect the user to a custom error page with a descriptive message, rather than crashing the application
- Data fetching: Each server-side fetching function returns a structured result object ({ authError, fetchError, data }) instead of throwing directly. This allows the dashboard to handle authentication errors (redirect to login) and fetch errors (show error UI) independently and gracefully
- Rendering: Unexpected errors during rendering are caught by Next.js error boundaries (error.js), which provide fallback UI and prevent the entire application from crashing

### Performance

Books are loaded using database-level pagination with SQL `LIMIT` and `OFFSET`, meaning that the application only requests the books needed for the current page instead of loading the entire dataset at once.

Filtering is also handled on the server side. Search parameters such as title, author, publisher and category are applied directly in the database query using SQL `WHERE` conditions.

The toplists for authors and categories are generated through server-side aggregation. This means that the API calculates the top authors and categories before sending the result to the client, reducing the amount of data that needs to be processed in the browser.

The application also includes a loading page to provide feedback during longer navigation or fetching operations.

### Clean Code

- Clear and separated components which allows for better readability and maintainability
- Consistent naming conventions and code formatting
- Use of comments to explain complex logic and design decisions
- Reusable logic to follow DRY principles and reduce code duplication
- Client components separated from server components to clearly distinguish between data fetching and UI rendering responsibilities
- Structured error handling to manage different error scenarios without crashing the application

## Acknowledgements

- books-graphql-api — the GraphQL API this application is built on
- GitHub OAuth documentation
- Next.js documentation
- React documentation
- Chart.js documentation
- Course materials and lectures from 1DV027 at Linneaus University
- AI tools for some guidance and styling suggestions
