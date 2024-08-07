import { handleError } from "../../createVariations/functions/setError";

export const CreateVariationHandler = {
  handleValueChange(state, 
    { payload: { value, index, isAr = false } }){
     const newValues = [...state?.currentValues];
    console.log(value, index, isAr ,'statestate');
      if (isAr) {
        // newValues[index] = {
        //   ...newValues[index],
        //   value_ar: event.target.value,
        //   color: "",
        // };
      } else {
        newValues[index] = {
          ...newValues[index],
          value_en:value,
          color: "",
        };
      }
      state.currentValues=newValues
      console.log(state,'dsaaaaaaaaaaaaaa');
      // setCurrentValues(newValues);

      // updateOptions(currentOption, newValues);
  },
};
