"use server";

import { serversOperations } from "@/lib/apiUtilsServer";

export async function CreateLocationAction(formData) {
  console.log(formData, "formData");

  const CreateLocation = await serversOperations({
    endpoint: "/locations",
    payload: {
      method: "POST",
      data: formData,
    },
  });

  return CreateLocation;
}
