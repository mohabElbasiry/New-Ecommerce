// import { operationsServer } from "@/lib/api/apiutls";
// import toast from "react-hot-toast";
import { number, object, string } from "yup";

export const BasicFormValidation = (lang) => {
  return object({
    title_en: string().required(lang === "en" ? " required" : "مطلوب"),
    title_ar: string().required(lang === "en" ? "required" : " مطلوب"),
    description_en: string().required(lang === "en" ? "required" : " مطلوب"),
    description_ar: string().required(lang === "en" ? "required" : " مطلوب"),
    category: string().required(lang === "en" ? "required" : " مطلوب"),
    Quantity: number()
      .min(1)
      .required(lang === "en" ? "required" : " مطلوب"),
    price: number()
      .min(1)
      .required(lang === "en" ? "required" : " مطلوب"),
    CosTPeRItem: number()
      .min(1)
      .required(lang === "en" ? "required" : " مطلوب"),
  });
};

// export const onSubmitConatact = async (payload, lang, resetForm) => {
//   try {
//     const { firstName, lastName, ...restPayload } = payload;
//     const res = await operationsServer({
//       endpoint: `/contacts`,
//       payload: {
//         method: "POST",
//         data: {
//           ...restPayload,
//           name: `${firstName} ${lastName}`,
//         },
//       },
//     });

//     if (res.status == "success") {
//       toast.success(res?.[`success_${lang}`]);
//       resetForm();
//     } else {
//       toast.error(res?.[`error_${lang}`]);
//     }
//     console.log("contact response ?", res);
//   } catch (error) {
//     console.log("Contact Error", error);
//   }
// };
