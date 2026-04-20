import { getCookie } from "./jwtCookie";

export async function getTopAuthors(limit) {
  try {
    const jwtToken = await getCookie();

    const getAuthors = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: `
                query ($limit: Int) {
                authorToplist(limit: $limit) {
                id
                name
                amountOfBooks
                }
                }
                `,
        variables: {
          limit,
        },
      }),
    });

    const authorsData = await getAuthors.json();

    if (!authorsData || !authorsData.data || !authorsData.data.authorToplist) {
      throw new Error("Failed to retrieve toplist of authors");
    }

    if (
      authorsData.status === 401 ||
      authorsData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    const authorsObject = {
      authError: false,
      data: authorsData.data.authorToplist,
    };

    return authorsObject;
  } catch (error) {
    const authError = {
      authError: true,
    };

    return authError;
  }
}
