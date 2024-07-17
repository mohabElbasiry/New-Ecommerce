export function updatePropertyParent(data, itemIndex, newPrice) {
    return data.map((item) => {
      if (item.itemIndex === itemIndex) {
        return {
          ...item,
          values: item.values.map((value) => ({
            ...value,
            price: newPrice,
          })),
        };
      }
      return item;
    });
  }