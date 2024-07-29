import { CustomDialoge } from "@/components/Modal";
import { produce } from "immer";
import { defaultValues } from "../defaultValues";

export const SinglePropertyValue = ({setOpenModal,checkedArray,openModal,setVarients})=> {
    const SetPropertyValues = (property, value) => {
        setVarients(
          produce((draft) => {
            const checkedMap = new Map(
              checkedArray.map((item) => [item.key, item])
            );
            const updatedDraft = draft.productvaritions.varitionsValues.map(
              (item) => {
                const checkedItem = checkedMap.get(item?.key);
                if (checkedItem) {
                  const values = item?.values?.map((itemv, idx) => {
                    if (checkedItem?.SelectedItems?.includes(idx)) {
                      return {
                        ...itemv,
                        [property]: value,
                      };
                    }
                    return itemv;
                  });
                  return {
                    ...item,
                    values,
                  };
                }
                return item;
              }
            );
            draft.productvaritions.varitionsValues = updatedDraft;
          })
        );
      };
  return (
    <CustomDialoge
      open={openModal?.isOpen}
      setOpen={() =>
        setOpenModal(
          produce((draft) => {
            draft.isOpen = !draft?.isOpen;
          })
        )
      }
    >
      <div className="gap-1 border rounded-md  bg-[#fff] shadow">
        <p className="text-black p-3">{openModal?.action}</p>

        {console.log(openModal, "openModal")}

        <div className=" p-2 flex flex-col text-black gap-4 w-[600px]">
          <input
            placeholder={openModal?.action}
            className="border rounded-md p-2 w-[600px] text-black"
            value={openModal?.value}
            onChange={(e) => {
              console.log(openModal?.isNumber, "openModal?.isNumber");
              setOpenModal(
                produce((draft) => {
                  draft.value = e.target.value;
                })
              );
              // if (openModal?.isNumber) {
              //   if (isNaN(e?.target?.value)) {

              //   }
              // }
            }}
          />
        </div>
        <div className="flex gap-1 items-center justify-end mx-2">
          <button
            onClick={() =>
              setOpenModal(
                produce((draft) => {
                  draft.isOpen = false;
                })
              )
            }
            type="button"
            className="text-[#333] 
       p-2 bg-[#eee] !my-3 rounded-md  text-center
       justify-center 
        px-2 h-[30px] flex 
        items-center  "
          >
            Discard
          </button>
          <button
            type="button"
            className="text-bwhite 
       p-2 bg-black !my-3 rounded-md  text-center
        justify-center 
        px-2 h-[30px] flex 
        items-center  text-white "
            onClick={() => {
              SetPropertyValues(openModal?.property, openModal?.value);
              setOpenModal(defaultValues);
            }}
          >
            save
          </button>
        </div>
      </div>
    </CustomDialoge>
  );
};
