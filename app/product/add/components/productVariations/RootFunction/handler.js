 import { CreateVariationHandler } from "./Handlersfunctions/createVariations";
import { HandleKeysAndValues } from "./Handlersfunctions/handlekeysAndvalues";
import { HandleUpdateList } from "./Handlersfunctions/handleList";
import { ProductDataHandlers } from "./Handlersfunctions/ProductDetailsHandler";

export const actionHandlers = {
  ...CreateVariationHandler,
  ...HandleUpdateList,
  ...HandleKeysAndValues,
  ...ProductDataHandlers,
};
