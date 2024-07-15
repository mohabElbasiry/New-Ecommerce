export function updatePropertyChild(data, parentIndex, itemIndex, property, newValue) {
    return data.map((item) => {
      if (item.itemIndex === parentIndex) {
        console.log(data, parentIndex, itemIndex, property, newValue,'adss134213dsadsa');

        return {
          ...item,
          values: item.values.map((valueItem) => {
            if (valueItem.itemIndex === itemIndex) {
              return {
                ...valueItem,
                [property]: newValue,
              };
            }
            return valueItem;
          }),
        };
      }
      return item;
    });
  }