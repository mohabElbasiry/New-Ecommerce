import { CustomDialoge } from "@/components/Modal";
import { produce } from "immer";
import { memo, useCallback, useMemo, useState } from "react";
import { defaultValues } from "../defaultValues";

const MultibleValues = ({
  SelectedArray,
  action = "",
  open,
  setOpenModal,
  value,
  property,
  setVarients,
}) => {
        console.log('adssssss123231321')
  const [EditingValues, SetEditingValues] = useState(SelectedArray);
  useMemo(() => {
    console.log(SelectedArray, "SelectedArraySelectedArray");
    SetEditingValues(SelectedArray);
  }, [SelectedArray]);

  const SetPropertyValues =
    (property) => {
      setVarients(
        produce((draft) => {
          draft.productvaritions.varitionsValues =
            draft?.productvaritions?.varitionsValues.map((item) => {
              return {
                ...item,
                values: item?.values?.map((itemv) => {
                  const Founded = EditingValues?.find(
                    (itemF) => itemF.val === itemv?.val
                  );
                  if (Founded) {
                    return {
                      ...itemv,
                      [property]: Founded[property],
                    };
                  }
                  return itemv;
                }),
              };
            });
        })
      )
      setOpenModal(defaultValues);

      }
  

  return (
    <CustomDialoge
      open={open}
      setOpen={() =>
        setOpenModal(
          produce((draft) => {
            draft.isOpen = !draft?.isOpen;
          })
        )
      }
    >
      <div className=" p-2 flex flex-col bg-white shadow-xl text-black gap-4 w-[600px]">
        <p className="text-black p-3">{action}</p>
        {SelectedArray?.map((item) => {
          return (
            <div
              key={item?.key}
              className="flex items-center justify-between gap-4"
            >
              <label>{item?.val}</label>
              <input
                placeholder={action}
                className="border rounded-md p-2 w-[300px] text-black"
                defaultValue={item?.[property]}
                name={item?.itemIndex}
                onChange={(event) => {
                  const { value, name } = event.target;
                  SetEditingValues((prev) => {
                     return prev?.map((itemV) => {
                      if (itemV?.itemIndex === item?.itemIndex) {
                        return {
                          ...itemV,
                          [property]: event.target.value,
                        };
                      }
                      return itemV;
                    });
                  });
                }}
              />
            </div>
          );
        })}
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
              SetPropertyValues(property);
            }}
          >
            save
          </button>
        </div>
      </div>
    </CustomDialoge>
  );
};
export default MultibleValues;
