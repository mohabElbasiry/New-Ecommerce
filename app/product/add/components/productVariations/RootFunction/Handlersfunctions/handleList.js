import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";

export const HandleUpdateList = {
  AddVarientList: (state, action) => {
    state?.productvaritions?.variants?.push(action.payload);
  },
  handleUpdateList: (state, { payload: { listIndex } }) => {

    console.log(state.productvaritions.variants,'sadddddddddddddddddddd');
    const updatedVariants = state.productvaritions.variants.map((item, idx) => {
      if (idx === listIndex) {
        return {
          ...item,
          key_en: state?.currentOption?.option_en,
          key_ar: state?.currentOption?.option_ar,
          values: state?.currentValues?.filter(
            (valueItem) => valueItem?.value_en !== ""
          ),
          edit: false,
        };
      }
      return item;
    });

    state.productvaritions.variants = updatedVariants;
    state.productvaritions.REfvariants = updatedVariants;

    const flatValues =
      state.productvaritions.varitionsValues?.flatMap((item) => item.values) ||
      [];
    const dataShape = generateQualities(flatValues, updatedVariants);

    // Update varitionsValues using shapeData
    state.productvaritions.varitionsValues = shapeData(
      dataShape,
      updatedVariants
    );
  },
  EditVarient: (state, { payload: { idx = -1 } }) => {
    state?.productvaritions.variants?.forEach((item, index) => {
      if (idx === index) {
        item.edit = true;
      }
    });
  },

  handleReorder: (state, action) => {
    state.productvaritions.variants = action.payload;
    state.productvaritions.varitionsValues = shapeData(
      generateQualities(
        state.productvaritions.varitionsValues?.flatMap((item) => item?.values),
        action.payload || []
      ),
      action.payload || []
    );
  },
};
