export const DefaultValues = (property, array, comparedTo) => {
    return array?.reduce((acc, item, index) => {
      const checked = comparedTo?.[index];
      if (checked) {
        return acc + (+item?.[property] || 0);
      }
      return acc;
    }, 0);
  };