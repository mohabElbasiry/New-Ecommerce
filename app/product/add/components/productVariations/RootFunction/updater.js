import { produce } from "immer";
import { actionHandlers } from "./handler";
import { HandleUpdateList } from "./Handlersfunctions/handleList";
const whiteList = [...Object.keys(HandleUpdateList)];

export const updateState = (action, setState, afterwares) => {
  setState((prevState) =>
    produce(prevState, (draft) => {
      const handler = actionHandlers[action.type];
      if (handler) {
        handler(draft, action);
      }
      afterwares.forEach((afterware) =>
        afterware(draft, setState, action, whiteList)
      );
    })
  );
};
