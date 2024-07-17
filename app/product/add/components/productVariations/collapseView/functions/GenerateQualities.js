export function generateQualities(prev, attributes,changeShapeData,callback) {
    const qualities = [];
  
    function generateCombinations(currentCombination, depth) {
      if (depth === attributes.length) {
        qualities.push({
          values: currentCombination,
          quantity: 1,
          price: 0,
          image: [],
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
  
    const AdjustArray = qualities
      .map((item, index) => {
        const Founded = prev.find((item, idx) => idx === index);
        if (Founded) {
          return {
            ...item,
            values: item.values,
            price: Founded.price,
            quantity: Founded.quantity,
            image: Founded?.image,
          };
        }
        return item;
      })
      .map((item, idx) => ({ ...item, itemIndex: idx }));
      if(changeShapeData) return callback(AdjustArray,attributes);
    return AdjustArray;
  }
  