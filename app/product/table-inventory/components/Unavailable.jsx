import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
const defaultData = {
  name: "Unavailable inventory",
  quantity: 0,
  quantityObj: {
    damaged: { name: "damaged", qty: 0 },
    QualityControl: { name: "quality control", qty: 0 },
    SafetyStock: { name: "safety stock", qty: 0 },
    Other: { name: "Other", qty: 0 },
  },
};
export default function Unavailable({ item = defaultData }) {
  const [selectedItem, setSelectedItem] = useState();

  return (
    <div className="w-full flex justify-end">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {" "}
            {item.quantity} <ChevronDown />{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          {selectedItem ? (
            <div className="grid gap-4">
              <InputQtyUnavailable item={selectedItem} />
              <div className="flex justify-end items-center gap-4">
                <Button className=""  >save</Button>
                <Button variant="outline">close </Button>
              </div>
            </div>
          ) : (
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">{item.name}</h4>
              </div>
              <div className="grid gap-2">
                {Object.entries(item.quantityObj).map(([key, value], index) => (
                  <div
                    key={index + [key]}
                    className="flex justify-between items-center   "
                  >
                    <div>{value.name}</div>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex gap-4">{value.qty} <ChevronDown /></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() => setSelectedItem({ [key]: value })}
                        >
                          Add inventory
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setSelectedItem({ [key]: value })}
                        >
                          Add inventory
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
}

const InputQtyUnavailable = ({ item }) => {
    console.log(item);
    return(
  <div className="grid grid-cols-3 items-center gap-4 text-black">
    <label htmlFor="height">{Object.values(item)?.[0]?.name}</label>
    <input
      id="height"
      defaultValue={Object.values(item)?.[0]?.qty}
      type="number"
      //   onChange={}

      className="col-span-2 h-8 border rounded-xl pl-3 pr-1"
    />
  </div>
);}
