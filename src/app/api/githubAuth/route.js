export async function GET() {
  const clientID = process.env.CLIENT_ID;
  const redirectURI = process.env.REDIRECT_URL;
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=read:user`;
  return Response.redirect(githubAuthURL);
}
