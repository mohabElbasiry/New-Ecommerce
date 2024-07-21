"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function DropdownMenuRadioGroupSelect({
  list = [],
  defaultSelected = "",
  handleChange = () => {},
}) {
  const [position, setPosition] = useState("");
  
  useEffect(() => {
    handleChange(position, defaultSelected);
  }, [position]);
  return (
    <DropdownMenu id={'Grouped'}>
      <DropdownMenuTrigger asChild>
        <Button
          className="  h-[25px] text-sm  
             hover:bg-white text-black  bg-[#eee] w-[100px]"
          type="button"
        >
          {position === "" ? defaultSelected : position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          {/* <DropdownMenuRadioItem value={""}>
            {defaultSelected}
          </DropdownMenuRadioItem> */}

          {list?.map((item) => {
            return (
              <DropdownMenuRadioItem key={item} value={item}>
                {item}
              </DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
