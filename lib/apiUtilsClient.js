import { baseUrl, token } from "./baseUrl";

export const getOperationClient = async (endpoint, reqOptions) => {
  try {
    let tempReqOptions = { ...reqOptions };
    if (reqOptions?.headers?.token) {
      tempReqOptions = {
        ...tempReqOptions,
        headers: {
          ...tempReqOptions?.headers,
          Authorization: token,
        },
      };
      delete tempReqOptions.headers.token;
    }
    const res = await fetch(baseUrl + endpoint, tempReqOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return { fetchError: `Failed to fetch data from the server` };
  }
};



