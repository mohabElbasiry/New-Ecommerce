import { AccordionContent } from "@/components/ui/accordion";
import { produce } from "immer";

export const DeletedVarient = ({ valueItem, setVarients, parentname, idx }) => {
  console.log("objectdssasssssssssss", parentname, setVarients);
  const Undo = () => {
    setVarients(
      produce((draft) => {
        draft.productvaritions.varitionsValues =
          draft.productvaritions.varitionsValues.map((item) => {
            if (item?.key === parentname) {
              const values = item?.values.map((itemv) => {
                if (itemv.itemIndex === idx) {
                  console.log("object", itemv);
                  return {
                    ...itemv,
                    deleted: false,
                  };
                }
                return itemv;
              });
              return { ...item, values };
            }
            return item;
          });
      })
    );
  };
  return (
    <div
      className={`flex items-center justify-around gap-11 pl-3 py-5 
        border-[#ddd]  mt-1 w-[100%] m-auto px-[100px]    bg-[#eee]`}
    >
      <input type="checkbox" disabled />

      <p className="line-through">{valueItem?.val}</p>

      <div className="flex gap-3">
        <p>This variant will be deleted</p>

        <button onClick={Undo} type="button" className="text-blue-400">
          undo
        </button>
      </div>
    </div>
  );
};
