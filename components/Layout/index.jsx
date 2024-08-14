import React from "react";
import SideMenu from "./sidemenu";
import RootSignal from "./RootSignal";

export default function CustomLayout({ children }) {
  return (
    <>
      <RootSignal />
        <SideMenu  >
      <div className="flex w-full">


        <div className="flex-1">{children}</div>
      </div>
        </SideMenu>
     </>
  );
}
