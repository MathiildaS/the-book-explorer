import { cookies } from "next/headers";

/**
 *
 * @returns
 */
export async function getCookie() {
  const cookieStorage = await cookies();
  const jwtToken = cookieStorage.get("jwt-token");

  if (!jwtToken) {
    return null
  }
  return jwtToken.value;
}