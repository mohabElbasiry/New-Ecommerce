export function generateQualities(attributes) {
    const qualities = [];
  
    function generateCombinations(currentCombination, depth) {
      if (depth === attributes.length) {
        qualities.push({
          values: currentCombination,
          quantity: 0,
          price: 0,
          image: []
        });
        return;
      }
  
      attributes[depth].values.forEach(value => {
        const newCombination = currentCombination.slice();
        newCombination.push({
          key_en: attributes[depth].key_en,
          key_ar: attributes[depth].key_ar,
          value_en: value.value_en,
          value_ar: value.value_ar,
          color: value.color
        });
        generateCombinations(newCombination, depth + 1);
      });
    }
  
    generateCombinations([], 0);
  
    return qualities;
  }
  