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
    { payload: { property, newValue, itemIndex, parentname, parentitemIndex } }
  ) {
    console.log( state.productvaritions.varitionsValues,'adssssssssssssssssssssssssssssssssss');
    state.productvaritions.varitionsValues.forEach((item) => {
      if (item.itemIndex === parentitemIndex) {

        item.values.forEach((itemv) => {
  
          if (itemv.itemIndex === itemIndex) {

            itemv[property] = newValue;
          }
        });
      }
    });
    //   if (state.productvaritions.varientLookup.get(parentname)) {
    //   // state.productvaritions.varientLookup
    //   //   .get(parentname)
    //   //   .values.forEach((itemv, idx) => {
    //   //     if (itemv.itemIndex === itemIndex) {
    //   //       itemv[property] = newValue;
    //   //     }
    //   //   });
    // }
  },
};
