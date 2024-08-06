import { produce } from "immer";
import { actionHandlers } from "./handler";

export const updateState = (action, setState) => {
  console.log(setState, "setStatesetState");
  setState((prevState) =>
    produce(prevState, (draft) => {
      const handler = actionHandlers[action.type];
      if (handler) {
        handler(draft, action);
      }
    })
  );
};
