import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * Logs out user by removing jwt token in cookie.
 *
 * @param {Request} req - the request object to log out an user
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
 * Removes token in cookie.
 */
async function emptyCookie() {
  const cookieStorage = await cookies();
  cookieStorage.delete("jwt-token");
}

/**
 * Handles errors by redirecting to a custom page with specific error messages.
 *
 * @param {Request} req - the req-object from request
 * @param {string} message - the error message.
 */
function errorHandling(req, message) {
  const url = new URL("/error", process.env.APP_URL);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url);
}
