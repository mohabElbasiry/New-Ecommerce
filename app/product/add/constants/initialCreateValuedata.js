import { uid } from "uid";

export   const initialState = {
    currentValues: [{
      // value_ar: "",
      value_en: "",
      color: "",
      id: uid(),
    }],
    currentOptions: {
      option_en: "",
      option_ar: "",
      error: false,
      ErrorMessage: "",
    },
    opencolor: { index: -1, open: false },
    GeneralErrorMessage: {
      isError: false,
      ErrorMessage: "",
      value: false,
    },
    error: [],
  };