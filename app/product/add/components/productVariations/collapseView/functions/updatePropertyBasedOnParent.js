export function updatePropertyParent(data, itemIndex, newPrice,property) {
    return data.map((item) => {
      if (item.itemIndex === itemIndex) {
        console.log(item.itemIndex,itemIndex,'dassssssssssssss');

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