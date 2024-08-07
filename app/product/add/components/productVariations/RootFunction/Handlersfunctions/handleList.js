import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";

export const HandleList = {
  UpdateVarientList: (state, action) => {
    state?.productvaritions?.variants?.push(action.payload);
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
