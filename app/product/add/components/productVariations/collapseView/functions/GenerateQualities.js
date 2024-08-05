export function generateQualities(prev, attributes) {
  const qualities = [];

  function generateCombinations(currentCombination, depth) {
    if (depth === attributes.length) {
      qualities.push({
        values: currentCombination,
        options: currentCombination,
        quantity: 0,
        price: 0,
        image: [],
        continue_out_stock: false,
        price: 0,
        compare_to_price: 0,
        Cost_Per_Item: 0,
        profit: 0,
        margin: 0,
        quantity: 0,
        sku: "",
        color: "",
        barcode: "",
        weight: "",
        deleted: false,
        trackQuantity: false,
      });
      return;
    }

    attributes[depth].values.forEach((value) => {
      const newCombination = currentCombination.slice();
      newCombination.push({
        key_en: attributes[depth].key_en,
        key_ar: attributes[depth].key_ar,
        value_en: value.value_en,
        value_ar: value.value_ar,
        color: value.color,
      });
      generateCombinations(newCombination, depth + 1);
    });
  }

  generateCombinations([], 0);
  const compareValuesArrays = (arr1, arr2) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      for (const key in arr1[i]) {
        if (arr1[i][key] !== arr2[i][key]) {
          return false;
        }
      }
    }
    return true;
  };
  let AdjustArray = [];
  if (attributes?.length === 0) {
    AdjustArray = [];
    return;
  }
  AdjustArray = qualities
    .map((item, index) => {
      const founded = prev.find((item, idx) => idx === index);
      console.log(founded, "ounded.deletedounded.deleted");

      if (founded) {
        return {
          ...item,
          continue_out_stock: founded.continue_out_stock || false,
          price: founded.price,
          compare_to_price: founded.compare_to_price || 0,
          Cost_Per_Item: founded.Cost_Per_Item || 0,
          profit: founded.profit || 0,
          margin: founded.margin || 0,
          quantity: founded.quantity || 0,
          image: founded.image || [],
          sku: founded.sku || 0,
          color: founded.color || "",
          barcode: founded.barcode || "",
          weight: index,
          itemIndex: founded.itemIndex || "",
          deleted: founded.deleted || "",
          trackQuantity: founded.trackQuantity || false,
        };
      }
      return item;
    })
    .map((item, idx) => ({ ...item, itemIndex: idx }));

  return AdjustArray;
}
