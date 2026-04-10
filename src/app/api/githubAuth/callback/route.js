/**
 * Collects the code from the query paramters and calls getAccessToken to exchange it for the access token from GitHub.
 *
 * @param {Request} req - the request object from github with the code to exchange.
 * @returns {Response} the response object with the access token or error message.
 */
export async function GET(req) {
  try {
    const githubCode = req.nextUrl.searchParams.get("code");

    if (!githubCode) {
      const error = new Error("No GitHub code provided");
      error.status = 400;
      throw error;
    }

    const response = await getAccessToken(githubCode);
    return Response.json(response);
  } catch (error) {
    return Response.json({ error: error.message }, { status: error.status });
  }
}

/**
 * Exchanges code from GitHub for access token and then fetches user name and email with the access token.
 *
 * @param {string} githubCode - the code from GitHub to exchange.
 * @returns {Response} the response object with the access token or error message.
 */
async function getAccessToken(githubCode) {
  try {
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

    return {
      accessToken: githubAccessToken,
      userData: { email: githubEmail, name: githubName },
    };
  } catch (error) {
    return Response.json({ error: error.message }, { status: error.status });
  }
}
