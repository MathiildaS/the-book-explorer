/**
 *
 * @returns
 */
export async function getCookie() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (!jwtToken) {
    throw new Error(
      "You are not authorized, please log in to view the dashboard.",
    );
  }
  return jwtToken.value;
}