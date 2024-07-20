export const ProductMainDefaultValue = {
  productvaritions: {
    variants: [],
    varitionsValues: [],
    setShapeData:[],
    referencevarients:[]
  },
  productDetails: {
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    Stock: { repositry: {}, quantity: "", sku: "" },
    price: { mainPrice: "", costPerItem: "", DiscountPrice: "" },
  },
  seo: { tags: [], title: "", description: "" },
  setSubmitedData: () => {},
  submitedData: {},
};
