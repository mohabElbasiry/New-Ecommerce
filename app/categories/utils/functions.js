"use server";
import { serversOperations } from "@/lib/apiUtilsServer";

export async function handleCategoryOperations(bodyData, editedById = false) {
  return await serversOperations({
    endpoint: `/categories${editedById ? `/${editedById}` : ""}`,
    payload: {
      method: editedById ? "PUT" : "POST",
      data: bodyData,
      headers: {
        token: true,
      },
    },
    revalidation: {
      tag: ["Category"],
    },
  });
}

export async function handleDeleteCategory(itemId) {
  return await serversOperations({
    endpoint: `/categories/${itemId}`,
    payload: {
      method: "DELETE",
      headers: {
        token: true,
      },
    },
    revalidation: {
      tag: ["Category"],
    },
  });
}
