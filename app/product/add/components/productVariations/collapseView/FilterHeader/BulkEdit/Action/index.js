import { BulkEditArray } from "@/app/product/add/constants/BulkeditArray";
import { CustomDialoge } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { produce } from "immer";
import { useState } from "react";
const defaultValues = {
  isOpen: false,
  action: "",
  property: "",
  isNumber: false,
  value: "",
};
export const Actions = ({ checkedArray = [], setVarients = () => {} }) => {
  const [openModal, setOpenModal] = useState(defaultValues);
  const [action, setAction] = useState("");
  const SetPropertyValues = (property, value) => {
    setVarients(
      produce((draft) => {
        const checkedMap = new Map(
          checkedArray.map((item) => [item.key, item])
        );
        const updatedDraft=draft.productvaritions.varitionsValues.map((item) => {
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
        });
        console.log(updatedDraft,'updatedDraft');
        draft.productvaritions.varitionsValues =updatedDraft;
    }) 
  
  );

          
  
  };
  const HandleAction = (action, actionType, property, isNumber = false) => {
    if (actionType === "modal") {
      setOpenModal(
        produce((draft) => {
          draft.isOpen = true;
          draft.action = action;
          draft.property = property;
          if (isNumber) {
            draft.isNumber = true;
          }
        })
      );
    }
    if (actionType === "delete") {
    }

    if (actionType === "singleAction") {
    }
  };

  return (
    <>
      {" "}
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

          <div className=" p-2">
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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-1 h-[30px] shadow">
            <img src="/edit.svg" height={"20px"} width={"20px"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onChange={(e) => {
            console.log(e, "dassssssssss");
          }}
        >
          {BulkEditArray.map((item) => {
            return (
              <DropdownMenuItem
                key={item?.name}
                disabled={item?.disabled}
                className={` ${item?.css} cursor-pointer`}
                onClick={() => {
                  HandleAction(
                    item?.name,
                    item?.updateType,
                    item?.property,
                    item?.isNumber
                  );
                }}
              >
                {item?.name}
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
