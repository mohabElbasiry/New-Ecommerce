import { produce } from "immer";
import { shapeData } from "../../collapseView/functions/datashape";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";
import { updateOrEditVariantInPlace } from "./helper/handleUpdateDelete";

export const HandleUpdateList = {
  AddVarientList: (state, action) => {
    state?.productvaritions?.variants?.push(action.payload);
  },

  handleUpdateList(
    state,
    {
      payload: {
        listIndex,
        currentValues,
        option_en,
        option_ar,
        list,
        setGeneralErrorState,
      },
    }
  ) {
     updateOrEditVariantInPlace(
      state,
      listIndex,
      option_en,
      option_ar,
      currentValues,
      true
    );
  },
  handleDeleteList(state, { payload: { listIndex } }) {
    updateOrEditVariantInPlace(state, listIndex, "", "", [], false);
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
