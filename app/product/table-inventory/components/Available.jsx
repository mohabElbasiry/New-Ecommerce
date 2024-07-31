import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import React from "react";
const defaultData = {
    name: "Available",
    quantity: 0,
    quantityObj: {
      AdjustBy: { name: "Adjust by", qty: 0 },
      New: { name: "New", qty: 0 },
    },
  };
export default function Available({ item = defaultData}) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">
            {" "}
            {item.quantity} <ChevronDown />{" "}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
            <div className="grid gap-6">
            <div className="flex gap-4 items-center">
                <InputQtyAvailable   item={item?.quantityObj.AdjustBy}/>
                <InputQtyAvailable   item={item?.quantityObj.New}/>
            </div>

            <div className="flex justify-end items-center gap-4">
                <Button className=""  >save</Button>
                <Button variant="outline">close </Button>
              </div>
            </div>
  
        </PopoverContent>
      </Popover>
    </div>
  );
}

const InputQtyAvailable = ({ item }) => {
    
    return(
  <div className="grid  items-center gap-4 text-black">
    <label htmlFor="height">{item.name}</label>
    <input
      id="height"
      defaultValue={item?.qty}
      type="number"
      //   onChange={}

      className=" h-8 border rounded-xl pl-3 pr-1 w-32"
    />
  </div>
);}
