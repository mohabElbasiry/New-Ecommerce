import { CollapseViewHandlers } from "./Handlersfunctions/collapseView";
import { CreateVariationHandler } from "./Handlersfunctions/createVariations";
import { HandleKeysAndValues } from "./Handlersfunctions/handlekeysAndvalues";
import { HandleUpdateList } from "./Handlersfunctions/handleList";
import { ProductDataHandlers } from "./Handlersfunctions/ProductDetailsHandler";
import { Settings } from "./Handlersfunctions/Settings";

export const actionHandlers = {
  ...CreateVariationHandler,
  ...HandleUpdateList,
  ...HandleKeysAndValues,
  ...ProductDataHandlers,
  ...Settings,
  ...CollapseViewHandlers
};
