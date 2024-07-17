"use client";

import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxD({ setState, text = "", infoText = "" }) {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" onChange={setState} />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {text}
        </label>
      </div>
      <div className="text-sm m-2 ml-4">{infoText}</div>
    </div>
  );
}
