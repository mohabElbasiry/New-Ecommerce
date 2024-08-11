export const ProductDataHandlers = {
  UpdatePropertyByNameAndValue: (state, { payload, target }) => {
    console.log(payload,'payload');
    if (!target) {
      state[payload.name] = payload.value;
    }
    if (typeof payload === "object" && state?.[target]) {
      state[target][payload.name] = payload?.value;
    }
    if (Array.isArray(payload) && state[target]) {
      payload?.forEach((payloadItem) => {
        state[target][payloadItem?.name] = payloadItem?.value;
      });
    }
  },
};
