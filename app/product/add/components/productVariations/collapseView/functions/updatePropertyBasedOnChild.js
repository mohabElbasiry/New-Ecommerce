export function createIndexMap(data) {
  const indexMap = new Map();
  data.forEach((parentItem) => {
    parentItem.values.forEach((childItem) => {
      const key = `${parentItem.itemIndex}-${childItem.itemIndex}`;
      indexMap.set(key, { parentItem, childItem });
    });
  });
  return indexMap;
}

export function updatePropertyChild(draft, property, newValue,itemValue) {
  draft.productvaritions.varitionsValues.forEach((item) => {
    if (draft.productvaritions.varientLookup.get(item.key)) {
      item.values.forEach((itemv, index) => {
        console.log(itemv.itemIndex === itemValue.itemIndex,'dsaaaaaaaaaa')
        if (itemv.itemIndex === itemValue.itemIndex) {
          itemv[property] = newValue;
        }
      });
    }
  });
}
