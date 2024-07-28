import { useState } from "react";

import { Button } from "@/components/ui/button";
import { DropdownMenu ,DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

const MultiSelect = ({ values,selectedItems, setSelectedItems }) => {
 
  const handleSelectChange = (value) => {
    
    if (!selectedItems.includes(value)) {
      setSelectedItems((prev) => values.filter(item => prev.includes(item)|| item==value));
    } else {
      const referencedArray = [...selectedItems];
      const indexOfItemToBeRemoved = referencedArray.indexOf(value);
      referencedArray.splice(indexOfItemToBeRemoved, 1);
      setSelectedItems(referencedArray);
    }
  };

  const isOptionSelected = (value) => {
    return selectedItems.includes(value) ? true : false;
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex gap-2 font-bold">
            <span>Select Keys : {selectedItems.length}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuLabel>Select Keys</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {values.map((value, index) => {
            return (
              <DropdownMenuCheckboxItem
                onSelect={(e) => e.preventDefault()}
                key={index}
                checked={isOptionSelected(value)}
                onCheckedChange={() => handleSelectChange(value)}
              >
                {value}
              </DropdownMenuCheckboxItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MultiSelect;