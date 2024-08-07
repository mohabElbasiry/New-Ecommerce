export const HandleKeysAndValues = {
  updatePropertyParent(state, action) {
    console.log(action, state, "actionactionaction");
    const { itemIndex = -1, newValue, property } = action?.payload;
    state?.productvaritions.varitionsValues.forEach((item) => {
      if (item.itemIndex === itemIndex) {
        item.values.forEach((itemv) => {
          itemv[property] = newValue;
        });
      }
    });
  },
  updatePropertyChild(
    state,
    { payload: { property, newValue, itemIndex, parentname } }
  ) {
    console.log(newValue, itemIndex, parentname, "adsssssssssssssssssssssss");
    state.productvaritions.varitionsValues.forEach((item) => {
      if (state.productvaritions.varientLookup.get(parentname)) {
        item.values.forEach((itemv, idx) => {
          if (itemv.itemIndex === itemIndex) {
            itemv[property] = newValue;
          }
        });
      }
    });
  },
};