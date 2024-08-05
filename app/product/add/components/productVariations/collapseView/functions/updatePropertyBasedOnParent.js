export function updatePropertyParent(data, itemIndex, newPrice,property) {
  data.forEach(
    (item) => {
      if (item.itemIndex === itemIndex) {
        item.values.forEach((itemv) => {
          itemv["price"] = newPrice;
        });
      }
    }
  );
}[]