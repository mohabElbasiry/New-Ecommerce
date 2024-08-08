"use server";
import { serversOperations } from "@/lib/apiUtilsServer";

export async function handleCreateCategory(bodyData) {
  return await serversOperations({
    endpoint: "/categories",
    payload: {
      method: "POST",
      data: bodyData,
      headers: {
        token: true,
      },
    },
    revalidation: {
      tag: "Category",
    },
  });
}
