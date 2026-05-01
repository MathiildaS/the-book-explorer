/**
 * @file Handles the callback from GitHub after authentication. Exchanges the code from GitHub for an access token,
 * then uses the access token to fetch user data from GitHub and then fetches user data from the API before setting a cookie with the JWT token from the API.
 * @module app/api/githubAuth/callback/route.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Collects the code from the query paramters and calls getAuthUser to exchange it for the access token from GitHub.
 *
 * @param {Request} req - the request object from github with the code to exchange.
 * @returns {Response} the response object with the access token or error message.
 */
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const githubCode = searchParams.get("code");

    if (!githubCode) {
      const error = new Error("No GitHub code provided");
      error.status = 400;
      throw error;
    }

    await getAuthUser(githubCode);
    return NextResponse.redirect(new URL("/dashboard", process.env.APP_URL));
  } catch (error) {
    return errorHandling(req, error.message);
  }
}

/**
 * Exchanges code from GitHub for access token and then fetches user name and email with the access token from GitHub before fetching user data from the API.
 *
 * @param {string} githubCode - the code from GitHub to exchange.
 * @returns {object} the access token with user data or error message.
 */
async function getAuthUser(githubCode) {
  const githubAccessToken = await fetchAccessToken(githubCode);
  const githubUserData = await fetchUserData(githubAccessToken);
  const apiUser = await fetchAPIUser(githubUserData);
  await setUserCookie(apiUser);
}

/**
 * Sets the JWT token in a cookie named jwt-token.
 *
 * @param {object} apiUser - the API response including the JWT token.
 */
async function setUserCookie(apiUser) {
  const cookieStorage = await cookies();

  cookieStorage.set("jwt-token", apiUser.data.githubLogin.token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 60 * 60 * 2, // 2 hours
  });
}

/**
 * Exchanges code from GitHub for access token by POSTing to endpoint of GitHub with client id and client secret.
 *
 * @param {string} githubCode - the code from GitHub to exchange.
 * @returns {string} the access token.
 */
async function fetchAccessToken(githubCode) {
  const result = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      code: githubCode,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
    }),
  });

  const githubResponse = await result.json();
  const githubAccessToken = githubResponse.access_token;

  if (!githubAccessToken) {
    const error = new Error("Failed to retrieve access token");
    error.status = 500;
    throw error;
  }
  return githubAccessToken;
}

/**
 * Fetches user data from GitHub user endpoint by using the access token from GitHub to authenticate the request.
 *
 * @param {string} githubAccessToken - the access token from GitHub to fetch user from GitHub user endpoint.
 * @returns {object} the user details including email, name and access token from GitHub.
 */
async function fetchUserData(githubAccessToken) {
  const githubUserResult = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `token ${githubAccessToken}`,
    },
  });

  const githubUserData = await githubUserResult.json();

  if (!githubUserData) {
    const error = new Error("Failed to retrieve user data");
    error.status = 500;
    throw error;
  }

  const githubEmail = githubUserData.email;
  const githubName = githubUserData.name;

  const githubUserDetails = { githubEmail, githubName };

  return githubUserDetails;
}

/**
 * Fetches user data from the API endpoint.
 *
 * @param {object} githubUserDetails - the user details from GitHub including access token, name and email.
 * @returns {object} the user data from the API.
 */
async function fetchAPIUser(githubUserDetails) {
  const apiUrl =
    process.env.API_INTERNAL_URL || process.env.NEXT_PUBLIC_API_URL;
  const apiUser = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: /* GraphQL */ `
        mutation GitHubLogin($githubEmail: String!, $githubName: String!) {
          githubLogin(githubEmail: $githubEmail, githubName: $githubName) {
            token
            user {
              id
              email
              createdAt
            }
          }
        }
      `,
      variables: {
        githubEmail: githubUserDetails.githubEmail,
        githubName: githubUserDetails.githubName,
      },
    }),
  });


  const apiUserData = await apiUser.json();

  if (apiUserData.errors) {
    const error = new Error("Failed to retrieve user data from API");
    console.error("GraphQL fetch failed:", error);
    error.status = 500;
    throw error;
  }

  return apiUserData;
}

/**
 * Handles errors by redirecting to a custom page with specific error messages.
 *
 * @param {object} req - the req-object from request
 * @param {string} message - the error message.
 */
function errorHandling(req, message) {
  const url = new URL("/error", process.env.APP_URL);
  url.searchParams.set("message", message);
  return NextResponse.redirect(url);
}
