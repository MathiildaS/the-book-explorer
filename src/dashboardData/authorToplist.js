/**
 * @file Handles the fetching of the top authors based on number of books written.
 * @module dashboardData/authorToplist.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { getCookie } from "./jwtCookie";

/**
 * Fetches the top authors based on the number of books written.
 *
 * @param {number} limit - The number of top authors to fetch.
 * @returns {object} An object with the fetched authors or an error object.
 */
export async function getTopAuthors(limit) {
  try {
    const jwtToken = await getCookie();

    if (!jwtToken) {
      return { authError: true };
    }

    const API_URL =
      process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

    const getAuthors = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ($limit: Int) {
            authorToplist(limit: $limit) {
              id
              name
              amountOfBooks
            }
          }
        `,
        variables: {
          limit,
        },
      }),
    });

    const authorsData = await getAuthors.json();

    if (
      getAuthors.status === 401 ||
      authorsData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    if (!authorsData || !authorsData.data || !authorsData.data.authorToplist) {
      throw new Error("Failed to retrieve toplist of authors");
    }

    const authorsObject = {
      authError: false,
      data: authorsData.data.authorToplist,
    };

    return authorsObject;
  } catch (error) {
    const getAuthorsError = {
      authError: false,
      fetchError: true,
    };

    return getAuthorsError;
  }
}
