import { revalidatePath, revalidateTag } from "next/cache";

export const getOperationServer = async (endpoint, reqOptions) => {

  try {
    let tempReqOptions = { ...reqOptions };
    if (reqOptions?.headers?.token) {
      tempReqOptions = {
        ...tempReqOptions,
        headers: {
          ...tempReqOptions?.headers,
          Authorization: process.env.TOKEN,
        },
      };
      delete reqOptions.headers.token;
    }
    const res = await fetch(process.env.BASE_URL + endpoint, tempReqOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return { fetchError: `Failed to fetch data from the server` };
  }
};

export const serversOperations = async ({
  endpoint,
  payload,
  revalidation,
}) => {
  try {
    let tempOptions = {
      headers: {
        "Content-Type": payload?.headers?.["Content-Type"]
          ? payload?.headers["Content-Type"]
          : "application/json",
      },
      method: payload?.method,
      body: JSON.stringify(payload?.data),
    };
    // if (payload?.headers?.token) {
      tempOptions.headers = {
        ...tempOptions.headers,
        Authorization: process.env.TOKEN,
      };
      // delete tempOptions.headers.token;
    // }
     const response = await fetch(process.env.BASE_URL + endpoint, {
      ...tempOptions,
    });
    console.log('555555555555555555555555', tempOptions);
    const data = await response.json();
    if (revalidation) {
      if (revalidation?.path) {
        revalidatePath(revalidation.path);
      }
      if (revalidation?.tag) {
        revalidateTag(revalidation.tag);
      }
    }
    console.log("data oasssdiasg duasfdytasf dtyasf td fastd", data);
    return data;
  } catch (error) {
    return error;
  }
};
