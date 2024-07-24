export const BulkEditArray = [
  {
    name: "Edit Prices",
    property: "price",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    isNumber:true
  },
  {
    name: "Edit Quantities",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    property: "quantity",
    isNumber:true
  },
  {
    name: "Edit Sku",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    property: "sku",
  },
  {
    name: "Edit barcodes",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    property: "barcode",
  },
  {
    name: "Edit Hs Codes",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    property: "hscode",
  },
  {
    name: "Edit weight",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
    property: "weight",
  },
  {
    name: "Add Images",
    property: "image",
    disabled: false,
    css: "text-[#333]",
    updateType: "modal",
  },
  {
    name: "Remove Images",
    property: "image",
    disabled: false,
    css: "text-red-300",
    updateType: "delete",
  },
  {
    name: "Delete Varients",
    property: "varient",
    disabled: false,
    css: "text-[#333]",
    updateType: "delete",
  },
  {
    name: "continue Selling when out of stock",
    disabled: false,
    css: "text-[#333]",
    property: "continue_out_stock",

    updateType: "singleAction",
  },
];
