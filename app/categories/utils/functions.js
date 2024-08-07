"use server";
import { getOperationServer } from "@/lib/apiUtilsServer";
export const categoryHandler = {
  creation: async (data) => {
    return await getOperationServer(`/categories`, {
      method: "POST",
      headers: {
        token: true,
      },
      body: data,
    });
  },
  updating: () => {},
  deleting: () => {},
};
