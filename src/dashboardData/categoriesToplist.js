/**
 * @file Handles the fetching of the top categories based on number of books written.
 * @module dashboardData/categoriesToplist.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { getCookie } from "./jwtCookie";

/**
 * Fetches the top categories based on the number of books written.
 *
 * @param {number} limit - The number of top categories to fetch.
 * @returns {object} An object with the fetched categories or an error object.
 */
export async function getTopCategories(limit) {
  try {
    const jwtToken = await getCookie();

    if (!jwtToken) {
      return { authError: true };
    }

    const API_URL =
      process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;

    const getCategories = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query ($limit: Int) {
            categoryToplist(limit: $limit) {
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

    const categoriesData = await getCategories.json();

    if (
      getCategories.status === 401 ||
      categoriesData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    if (
      !categoriesData ||
      !categoriesData.data ||
      !categoriesData.data.categoryToplist
    ) {
      throw new Error("Failed to retrieve toplist of categories");
    }

    const categoriesObject = {
      authError: false,
      data: categoriesData.data.categoryToplist,
    };

    return categoriesObject;
  } catch (error) {
    const getCategoriesError = {
      authError: false,
      fetchError: true,
    };

    return getCategoriesError;
  }
}
