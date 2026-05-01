/**
 * @file Handles the retreival of and checking of cookie.
 * @module dashboardData/jwtCookie.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { cookies } from "next/headers";

/**
 * Gets the value from cookie named "jwt-token".
 *
 * @returns {string | null} - The value of the cookie or null if not found.
 */
export async function getCookie() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (!jwtToken) {
    return null
  }
  return jwtToken.value;
}