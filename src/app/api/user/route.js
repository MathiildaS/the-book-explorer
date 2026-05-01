/**
 * @file Handles user logout logic. Removes JWT token from cookie and redirects to home page or error page based on success or failure.
 * @module app/api/user/route.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Handles the POST request for logging out a user and clears the jwt cookie and redirects the user tothe home page.
 *
 * @param {Request} req - the POST request object from the client.
 * @returns {Response} the response object with a redirect to the home page if ok or error page if error.
 */
export async function POST(req) {
  try {
    await emptyCookie();
  } catch (error) {
    const message = "Could not log out user, please try again.";
    return errorHandling(req, message);
  }
  return NextResponse.redirect(new URL("/", process.env.APP_URL));
}

/**
 * Handles the GET request for logging out a user.
 * Clears the jwt cookie and redirects the user to the error page with a message that the session has expired and they need to log in again.
 *
 * @param {Request} req - the GET request object from the client.
 * @returns {Response} the response object with a redirect to the error page with a message that the session has expired and they need to log in again.
 */
export async function GET(req) {
  try {
    await emptyCookie();
    return NextResponse.redirect(
      new URL(
        "/error?message=Your session has expired. Please log in again.",
        process.env.APP_URL,
      ),
    );
  } catch (error) {
    const message = "Could not clear the user session.";
    return errorHandling(req, message);
  }
}

/**
 * Removes the jwt-token cookie.
 */
async function emptyCookie() {
  const cookieStorage = await cookies();
  cookieStorage.delete("jwt-token");
}

/**
 * Handles errors by redirecting to a custom page with specific error messages.
 *
 * @param {Request} req - the req-object from request
 * @param {string} message - the error message to display pn error page.
 */
function errorHandling(req, message) {
  const url = new URL("/error", process.env.APP_URL);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url);
}
