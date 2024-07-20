import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Button } from "@headlessui/react";
import React from "react";

export default function DrawerComponent({ open, setOpen, children }) {
  return (
    <Drawer open={open} setOpen={setOpen} className="">
      <DrawerContent className="h-[80vh] ">
        {children}
        <DrawerFooter className={"flex justify-between items-center"}>
          <Button>Submit</Button>
          <DrawerClose asChild>
            <Button variant="outline" onClick={() => setOpen(!open)}>
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
