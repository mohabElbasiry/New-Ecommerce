export const HandleList = {
  UpdateVarientList: (state, action) => {
    state?.productvaritions?.variants?.push(action.payload);
  },
};
