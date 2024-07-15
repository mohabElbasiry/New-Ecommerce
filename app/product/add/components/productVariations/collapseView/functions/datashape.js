export function shapeData(combinedTexts, variants) {
  console.log(combinedTexts, variants, "dasdsaasdsadasdsdadas");
  let data = [];

  variants[0].values.forEach((valueGroup, idx) => {
    console.log(valueGroup, "valueGroupvalueGroupvalueGroup");
    let obj = {
      key: valueGroup.value_en,
      itemIndex: idx + 1,
      quantity: 0,
      min_price: 0,
      max_price: 0,
      values: [],
    };
    combinedTexts.forEach((valueItem, indx) => {
      let str = "";
      let check = valueItem.values.some(
        (value) =>
          value.value_en === valueGroup.value_en &&
          value.key_en === variants[0].key_en
      );

      if (check) {

      valueItem.values.forEach((value) => {
        str += value.value_en + "/";
      });

      obj.values.push({
        itemIndex: `${idx + 1}${indx + 1}`,
        val: str.trim(),
        quantity: +valueItem.quantity || 0,
        sku: valueItem.sku || "",
        continue_selling: valueItem?.continue_selling || false,
        price: valueItem?.price || 0,
        compare_to_price: valueItem?.compare_to_price || 0,
        barcode: valueItem?.barcode || "",
        image: valueItem?.image || [],
      });
    }
    }
  
  );
    let qty = 0;
 
    obj.values.reduce((acc, value) => {
      return (qty += +value.quantity);
    }, qty);
 
     obj.quantity = qty;
     
    data.push(obj);
  }
);
  return data;
}
