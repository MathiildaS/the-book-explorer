/**
 * Collects the code from the query paramters and calls getAccessToken to exchange it for the access token from GitHub.
 *
 * @param {Request} req - the request object from github with the code to exchange.
 * @returns {Response} the response object with the access token or error message.
 */
export async function GET(req) {
  const githubCode = req.nextUrl.searchParams.get("code");
  
  if (!githubCode) {
    return new Response("No session code provided", { status: 400 });
  }

  const response = await getAccessToken(githubCode);
  return response;
}

/**
 * Exchanges a session code for an access token from GitHub.
 *
 * @param {string} githubCode - the code from GitHub to exchange.
 * @returns {Response} the response object with the access token or error message.
 */
async function getAccessToken(githubCode) {
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
    return new Response("Failed to retrieve access token", { status: 500 });
  }
  return new Response(JSON.stringify({ access_token: githubAccessToken}), { status: 200 });
}
