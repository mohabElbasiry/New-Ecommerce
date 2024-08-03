export const baseUrl = "http://localhost:3001/api/v1";
export const imageBaseUrl = "http://localhost:3001/storage";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YWUwODY5MDRkYWI0YzFhZTg5NTBkZSIsImNyZWF0ZWRBdCI6MTcyMjY4MTQ0OTE3NSwiaWF0IjoxNzIyNjgxNDQ5LCJleHAiOjE3MzA0NTc0NDl9.6iFJeldb5oMQ_xEcR27HUUHiP61VgsKm6ogfPiS8PTA";
export const getOperation = async (endpoint, reqOptions) => {
  try {
    let tempReqOptions = { ...reqOptions };
    if (reqOptions?.headers?.token) {
      tempReqOptions = {
        ...tempReqOptions,
        headers: {
          ...tempReqOptions?.headers,
          authorization: token,
        },
      };
      delete reqOptions.headers.token;
    }
    const res = await fetch(baseUrl + endpoint, tempReqOptions);
    const data = await res.json();
    return data;
  } catch (error) {
    return { fetchError: `Failed to fetch data from the server` };
  }
};
