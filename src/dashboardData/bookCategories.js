import { getCookie } from "./jwtCookie";

export async function getAllCategories() {
  try {
    const jwtToken = await getCookie();

    const getCategories = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: /* GraphQL */ `
          query {
            categories {
              id
              name
            }
          }
        `,
      }),
    });

    const categoriesData = await getCategories.json();

    if (
      !categoriesData ||
      !categoriesData.data ||
      !categoriesData.data.categories
    ) {
      throw new Error("Failed to retrieve all categories");
    }

    if (
      getCategories.status === 401 ||
      categoriesData.errors?.[0]?.message === "Unauthorized"
    ) {
      const authError = {
        authError: true,
      };

      return authError;
    }

    const categoriesObject = {
      authError: false,
      data: categoriesData.data.categories,
    };

    return categoriesObject;
  } catch (error) {
    const getCategoriesError = {
      authError: false,
      fetchError: true,
    };

    return getCategoriesError;
  }
}
