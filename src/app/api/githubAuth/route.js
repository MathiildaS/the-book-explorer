/**
 * @file Handles GitHub authentication logic. Redirects the user to the GitHub authentication page.
 * @module app/api/githubAuth/route.js
 * @author Mathilda Segerlund <ms228qs@student.lnu.se>
 */

/**
 * Using the client ID and redirect URL to redirect the user to the authentication page of GitHub.
 * 
 * @returns {Response} A respone object that redirects user to the authentication page of GitHub.
 */
export async function GET() {
  const clientID = process.env.CLIENT_ID;
  const redirectURI = process.env.REDIRECT_URL;
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=read:user`;
  return Response.redirect(githubAuthURL);
}
