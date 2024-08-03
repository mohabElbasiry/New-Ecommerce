import { uid } from "uid";

export function shapeData(combinedTexts, variants) {
  let data = [];

  variants[0].values.forEach((valueGroup, idx) => {
    console.log(valueGroup, "valueGroupvalueGroup ");
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
      console.log(valueItem, "valueItem");

      if (check) {
        valueItem.values.forEach((value) => {
          str += value.value_en + "/";
        });
        obj.values.push({
          ...valueItem,
          itemIndex: `${idx + 1}${indx + 1}`,
          val: str.trim(),
          options: valueItem?.values,
        });
      }
    });
    let qty = 0;

    obj.values.reduce((acc, value) => {
      return (qty += +value.quantity);
    }, qty);

    obj.quantity = qty;

    data.push(obj);
  });

  return data.map((item) => {
    return { ...item, valuesL: item.values.flatMap((item) => item?.values)?.length };
  });
}
