 import { CreateVariationHandler } from "./Handlersfunctions/createVariations";
import { HandleKeysAndValues } from "./Handlersfunctions/handlekeysAndvalues";
import { HandleList } from "./Handlersfunctions/handleList";
import { ProductDataHandlers } from "./Handlersfunctions/ProductDetailsHandler";

export const actionHandlers = {
  ...CreateVariationHandler,
  ...HandleList,
  ...HandleKeysAndValues,
  ...ProductDataHandlers,
};
