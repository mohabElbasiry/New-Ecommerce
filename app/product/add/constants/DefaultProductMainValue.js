import { enableMapSet } from "immer";

// Enable support for Map and Set
enableMapSet();

  const selectImage = useSelector

export const ProductMainDefaultValue = {
  productvaritions: {
    variants: [],
    varitionsValues: [],
    setShapeData: [],
    referencevarients: [],
    REfvariants: [],
    varientLookup:new Map(),

  },
  pricing: {
    price: "",
    compare_to_price: "",
    Cost_Per_Item: "",
    profit: "",
    margin: "",
  },
  shipping: {
    active: true,
    weight: "",
    type: "",
  },
  productDetails: {
    title_ar: "",
    title_en: "",
    description_ar: "",
    description_en: "",
    images: [],
    price: { mainPrice: "", costPerItem: "", DiscountPrice: "" },
  },
  Stock: {trackQuantity:true, locations:[],sku: "", barcode: "" ,continue_out_stock:false},
  settings:{
    tags: [],
    statues:'active',
    publishTime:"",
    AllowRating:false,
    Featured:false
  },
  seo: {   title: "", description: "" },
  status: "",
   // setSubmitedData: () => {},
  // submitedData: {},
  history: [],
};
