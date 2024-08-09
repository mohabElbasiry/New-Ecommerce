export const Settings = {
  UpdateHistory: (state) => {
    const { history, ...other } = state;
    state.history.push(other ?? {});
  },
};
