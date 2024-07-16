export function createIndexMap(data) {
  const indexMap = new Map();
  data.forEach(parentItem => {
    parentItem.values.forEach(childItem => {
      const key = `${parentItem.itemIndex}-${childItem.itemIndex}`;
      indexMap.set(key, { parentItem, childItem });
    });
  });
   return indexMap;
}

export function updatePropertyChild(data, parentIndex, itemIndex, property, newValue, indexMap) {
  const key = `${parentIndex}-${itemIndex}`;
  const mapEntry = indexMap.get(key);
   if (mapEntry) {
    const { parentItem, childItem } = mapEntry;
    // Create a shallow copy to maintain immutability
    const updatedChildItem = { ...childItem, [property]: newValue };
     return data.map(parent => {
      if (parent.itemIndex === parentIndex) {
        return {
          ...parent,
          values: parent.values.map(value => 
            value.itemIndex === itemIndex ? updatedChildItem : value
          ),
        };
      }
      return parent;
    });
  }
  
  return data;
}
