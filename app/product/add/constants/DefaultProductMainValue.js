export const ProductMainDefaultValue = {
  productvaritions: {
    variants: [],
    varitionsValues: [],
    setShapeData:[],
    referencevarients:[],
    REfvariants:[]
  },
  productDetails: {
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    images:[],
    Stock: { repositry: {}, quantity: "", sku: "" ,barcode:""},
    price: { mainPrice: "", costPerItem: "", DiscountPrice: "" },
  },
  seo: { tags: [], title: "", description: "" },
  setSubmitedData: () => {},
  submitedData: {},
  history:[]
};
