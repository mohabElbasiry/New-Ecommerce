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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="w-fit h-[25px] text-sm bg-[#eee] mb-2 hover:bg-white text-black"
          type="button"
        >
          {position === "" ? defaultSelected : position}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value={""}>
            {defaultSelected}
          </DropdownMenuRadioItem>

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
