import { HandleKeysAndValues } from "./Handlersfunctions/handlekeysAndvalues";
import { HandleList } from "./Handlersfunctions/handleList";

export const actionHandlers = {
  ...HandleList,
  ...HandleKeysAndValues,
};
