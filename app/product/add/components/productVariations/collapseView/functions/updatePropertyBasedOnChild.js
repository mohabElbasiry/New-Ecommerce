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

export function updatePropertyChild(
  draft,
  property,
  newValue,
  itemValue,
  parentname
) {
  draft.productvaritions.varitionsValues.forEach((item) => {
    if (draft.productvaritions.varientLookup.get(parentname)) {
      item.values.forEach((itemv, idx) => {
        if (itemv.itemIndex === itemValue) {
          itemv[property] = newValue;
        }
      });
    }
  });
}
