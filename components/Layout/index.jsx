import React from "react";
import SideMenu from "./sidemenu";
import RootSignal from "./RootSignal";

export default function CustomLayout({ children }) {
  return (
    <>
      <RootSignal />
      <div className="flex w-full">
        <SideMenu />
        <div className="flex-1">{children}</div>
      </div>
    </>
  );
}
