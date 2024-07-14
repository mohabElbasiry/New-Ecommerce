function shapeData(combinedTexts, collapse, callback) {
  let data = [];

  varitions?.[0].values.forEach((valueGroup, idx) => {
    let obj = {
      key: valueGroup.value_en,
      value: [],
      itemIndex: idx + 1,
      quantity: 0,
      sku: "",
      continue_selling: true,
      price: 0,
      compare_to_price: 0,
      barcode: "",
      images: [],
    };

    combinedTexts.forEach((valueItem, indx) => {
      let check = valueItem.values.some(
        (value) =>
          value.value_en === valueGroup.value_en &&
          value.key_en === varitions[0].key_en
      );

      if (check) {
        let str = "";

        valueItem.values.forEach((value) => {
          // if (value.value_en !== valueGroup.value_en) {
          str += value.value_en + "/";
          // }
        });

        obj.value.push({
          itemIndex: `${idx + 1}${indx + 1}`,
          val: str.trim(),
          quantity: valueItem.quantity,
          sku: "",
          continue_selling: true,
          price: 0,
          compare_to_price: 0,
          barcode: "",
          images: [],
        });
      }
    });
    let qty = 0;
    obj.value.map((value) => (qty += value.quantity));
    obj.quantity = qty;
    data.push(obj);
  });

  return data;
}
