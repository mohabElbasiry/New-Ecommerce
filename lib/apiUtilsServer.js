export const getOperationServer = async (endpoint, reqOptions) => {
  try {
    let tempReqOptions = { ...reqOptions };
    if (reqOptions?.headers?.token) {
      tempReqOptions = {
        ...tempReqOptions,
        headers: {
          ...tempReqOptions?.headers,
          authorization: process.env.TOKEN,
        },
      };
      delete reqOptions.headers.token;
    }
    console.log("tempReqOptions", tempReqOptions);
    const res = await fetch(process.env.BASE_URL + endpoint, tempReqOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return { fetchError: `Failed to fetch data from the server` };
  }
};
