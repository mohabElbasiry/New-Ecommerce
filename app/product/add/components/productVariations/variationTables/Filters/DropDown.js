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
  list=[],
  defaultSelected="",
  handleChange=()=>{},
}) {
  const [position, setPosition] =  useState("bottom");

  useEffect(() => {
    handleChange(position, defaultSelected);
  }, [position]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" >
          {position == "" ? defaultSelected : position}

          
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
              <DropdownMenuRadioItem value={item}>{item}</DropdownMenuRadioItem>
            );
          })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
