import { produce } from "immer";
import { applyFilters } from "../../collapseView/functions/ApplayFilters";
import { reorderArray } from "../../collapseView/functions/reorderArray";
import { generateQualities } from "../../collapseView/functions/GenerateQualities";
import { shapeData } from "../../collapseView/functions/datashape";

export const CollapseViewHandlers = {
  FilterData(
    state,
    { payload: { varitionsValues, Filters, setVarients, varitions } }
  ) {
    let Editeddata = varitionsValues;

    if (Filters?.GroupBy?.key !== "") {
      Editeddata = shapeData(
        generateQualities(
          varitionsValues?.flatMap((item) => item?.values),
          reorderArray(varitions, Filters?.GroupBy?.key) || []
        ),
        reorderArray(varitions, Filters?.GroupBy?.key) || []
      );

      
    }
    if (Filters?.FilterValues?.length) {
      Editeddata = applyFilters(Editeddata, Filters);
    }
    if (Filters?.search !== "") {
      Editeddata = Editeddata?.map((item) => {
        const values = item?.values?.filter((item) => {
          return item?.options?.some(
            (itemO) =>
              itemO?.val?.includes(Filters?.search) ||
              itemO?.key_en?.includes(Filters?.search) ||
              itemO?.value_en?.includes(Filters?.search)
          );
        });

        return { ...item, values };
      }).filter((item) => item?.values?.length);
    }

    if (Filters?.sortBy?.sortKey !== "") {
      // Editeddata = sortItemsByQuantity(
      //   Editeddata,
      //   Filters?.sortBy?.sortMethod,
      //   Filters?.sortBy?.sortKey
      // );
      Editeddata = Editeddata.map((item) => {
        const values = item?.values.sort((a, b) => {
          return Filters?.sortBy?.sortMethod === "asc"
            ? +a[Filters?.sortBy?.sortKey] - +b[Filters?.sortBy?.sortKey]
            : +a[Filters?.sortBy?.sortKey] - +b[Filters?.sortBy?.sortKey];
        });
        return {
          ...item,
          values,
        };
      });
    }
    state.data = Editeddata;
  },
};
