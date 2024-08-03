export function updatePropertyParent(data, itemIndex, newPrice,property) {
    return data.map((item) => {
      console.log(item,'dassssssssssssss');
      if (item.itemIndex === itemIndex) {
        return {
          ...item,
          values: item.values.map((value) => ({
            ...value,
            [property]: newPrice,
          })),
        };
      }
      return item;
    });
  }