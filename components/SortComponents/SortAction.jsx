"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
export const SortActionComponent = ({
  label,
  icon,
  menu = [
    {
      label: "",
      icon: "",
      src: "",
      disabled: false,
    },
  ],
  handleValueChange = () => {},
  sortMethods = [
    {
      method: "",
      img: "",
    },
  ],
}) => {
  const [sort, setSort] = useState({ sortBy: "", sortMethod: "", open: false });
  useEffect(() => {
    if (document && open) {
      const searchIcon = document.getElementById("action-component");

      const handleCloseOutside = (e) => {
        if (!searchIcon?.contains(e.target)) {
          setSort((prev) => ({ ...prev, open: false }));
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          setSort((prev) => ({ ...prev, open: false }));
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [sort?.open]);
  return (
    <div className="relative  z-[30] h-fit" id="action-component">
      <div className="inline-flex items-center overflow-hidden rounded-md  p-3  ">
        <button
          onClick={() => setSort((prev) => ({ ...prev, open: !prev?.open }))}
          className="flex items-center capitalize gap-2"
        >
          {icon ? icon : label}

          {!icon ? (
            <img
              src="/sort/sort-svgrepo-com.svg"
              height={"15px"}
              width={"15px"}
            />
          ) : null}
        </button>
      </div>
      {sort?.open ? (
        <div
          class="absolute start-0 end-auto lg:start-auto lg:end-0  
          z-10 mt-2 w-56 rounded-xl  border border-gray-100 
          bg-white shadow-md  h sdtg   overflow-auto gap-3 text-lg

          p-3"
          role="menu"
        >
          <p className="text-[15px] capitalize my-4 ">
            {icon ? icon : label} By
          </p>

          <RadioGroup
            defaultValue=""
            onValueChange={(value) =>
              setSort((prev) => ({ ...prev, sortBy: value }))
            }
            value={sort?.sortBy}
          >
            {menu?.map((menuItem, idx) => {
              return (
                <div className="flex items-center space-x-2  text-lg  ">
                  <RadioGroupItem
                    value={menuItem?.label}
                    id={menuItem?.label + idx}
                  />
                  <Label
                    htmlFor={menuItem?.label + idx}
                    className=" text-lg  text-[#333]"
                  >
                    {menuItem?.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          <div className="border-b my-3"></div>
          <div className="SortMethod">
            {sortMethods && sortMethods?.length > 1 ? (
              <>
                {sortMethods?.map((item) => {
                  return (
                    <div
                      onClick={() => {
                        handleValueChange("asc", sort?.sortBy);
                        setSort({
                          ...sort,
                          sortMethod: item?.method,
                          open: false,
                        });
                      }}
                      className="  text-lg  pb-1 border-b 
               flex justify-between items-center hover:bg-[#eee] p-3 rounded-xl font-semibold  cursor-pointer "
                    >
                      <p>{item?.method}</p>
                      <img
                        src={item?.img}
                        width={"18px"}
                        height={"18px"}
                      />{" "}
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                <div
                  onClick={() => {
                    handleValueChange("asc", sort?.sortBy);
                    setSort((prev) => ({
                      ...prev,
                      sortMethod: "asc",
                      open: false,
                    }));
                  }}
                  className={`  text-lg  pb-1 border-b 
                 flex justify-between items-center hover:bg-[#eee] p-3 rounded-xl font-semibold 
                 
                 cursor-pointer ${
                   sort?.sortMethod === "asc" ? "bg-[#eee]" : ""
                 }  `}
                >
                  <p>sort asc</p>
                  <img
                    src="/sort/arrow-up-svgrepo-com.svg"
                    width={"18px"}
                    height={"18px"}
                  />{" "}
                </div>
                <div
                  onClick={() => {
                    handleValueChange("desc", sort?.sortBy);
                    setSort((prev) => ({
                      ...prev,
                      sortMethod: "desc",
                      open: false,
                    }));
                  }}
                  className={` 
                   text-lg  flex justify-between items-center my-2 hover:bg-[#eee] p-3 
                   rounded-xl font-semibold  cursor-pointer 
                   ${sort?.sortMethod === "desc" ? "bg-[#eee]" : ""}
                   `}
                >
                  <p>sort desc</p>

                  <img
                    src="/sort/arrow-down-svgrepo-com.svg"
                    width={"18px"}
                    height={"18px"}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
