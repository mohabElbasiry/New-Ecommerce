"use server";

import { serversOperations } from "@/lib/apiUtilsServer";

export async function SetSubmittedForm( formData) {
 
  try {
    const CreateLocation = await serversOperations({
      endpoint: "/locations",
      payload: {
        method: "POST",
        data: formData 
      },
    });

    console.log(CreateLocation,'CreateLocation');
  } catch (err) {}
  return "adssdadsaads"
}
