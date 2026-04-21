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
        query: `
        query {
        categories {
        id
        name
      }
      }
      `,
      }),
    })
    } catch (error) {

    }
}