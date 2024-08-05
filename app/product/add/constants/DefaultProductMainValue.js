export const ProductMainDefaultValue = {
  productvaritions: {
    variants: [],
    varitionsValues: [],
    setShapeData: [],
    referencevarients: [],
    REfvariants: [],
  },
  pricing: {
    price: "",
    compare_to_price: "",
    Cost_Per_Item: "",
    profit: "",
    margin: "",
  },
  shipping: {
    active: false,
    weight: "",
    type: "",
  },
  productDetails: {
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    images: [],
    Stock: { repositry: {}, quantity: "", sku: "", barcode: "" },
    price: { mainPrice: "", costPerItem: "", DiscountPrice: "" },
  },
  seo: { tags: [], title: "", description: "" },
  status: "",
  publishTime: "",
  setSubmitedData: () => {},
  submitedData: {},
  history:[]
};
