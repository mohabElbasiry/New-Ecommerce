import DrawerComponent from "@/components/GlobalUi/Drawer";
import VariantDetails from "@/components/VariantDetails";
import { useMemo, useState } from "react";

export const BulkEditButton = ({ variants, varitionsValues, checkedArray ,setVarients}) => {
  const [open, setOpen] = useState(false);
  const findSimilarItems = useMemo(() => {
    if (!open && !checkedArray?.length) {
      return [];
    } else {
      return checkedArray
        .map((selected) => {
          const dataItem = varitionsValues.find(
            (item) => item.key === selected.key
          );
          if (dataItem) {
            const matchedValues = selected.SelectedItems.map(
              (index) => dataItem.values[index]
            ).filter((value) => value !== undefined);
            return { key: selected.key, values: matchedValues };
          } else {
            return { key: selected.key, values: [] };
          }
        })
        .filter((item) => item?.key && item?.values?.length);
    }
  }, [checkedArray, varitionsValues, open]);

  return (
  <>
    <button className="box text-sm p-1   " type="button" onClick={()=>setOpen(true)}>
              Bulk Edit
            </button>
    <DrawerComponent open={open} setOpen={setOpen}>
      <VariantDetails data={variants} similarItems={findSimilarItems} />
    </DrawerComponent>
  </>
  );
};
