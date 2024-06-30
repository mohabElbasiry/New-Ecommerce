import { useEffect, useState } from "react";
import CreateVariation from "./createVariations";
import { useMotionValue, Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "../drageControl";
import VariationTable from "./variationTables";

export const ProductVariation = () => {
  const [list, setList] = useState([]);
  const dragControls = useDragControls();

  useEffect(() => {
    if (localStorage?.getItem("list")) {
      const list = JSON.parse(localStorage?.getItem("list"));
      if (list?.length) {
        setList(list);
      }
    }
  },[]);

  return (
    <>
      <div className="w-[70%] ">
        <p className="my-2 ">Add Varations</p>
        {list?.length ? (
          <div className="border w-[100%] pb-3 px-0 rounded-md shadow">
            <Reorder.Group
              values={list}
              onReorder={setList}
              as="ol"
              axis="y"
              dragListener={false}
              dragControls={dragControls}
            >
              {list?.map((item, idx) => {
                return (
                  <Reorder.Item value={item} key={item?.key_ar + idx}>
                    {item?.edit ? (
                      <CreateVariation
                        setList={setList}
                        listIndex={idx}
                        list={list}
                      />
                    ) : (
                      <div
                        onClick={() => {
                          setList((prev) => {
                            return prev?.map((item, index) => {
                              if (idx === index) {
                                return {
                                  ...item,

                                  edit: true,
                                };
                              }
                              return item;
                            });
                          });
                          localStorage?.setItem("list", JSON.stringify(list));
                        }}
                      >
                        <div className="flex items-start gap-2 p-3 w-[100%] hover:bg-[#eee]">
                          <div className="mt-3  p-2 flex flex-col gap-3 px-2 hover:bg-[#eee] cursor-pointer">
                            <ReorderIcon dragControls={dragControls} />
                          </div>
                          <div className="   ">
                            <p>{item?.key_en}</p>
                            <ul className="w-[100%] flex gap-3 flex-wrap">
                              {item?.values?.map((CurrentValueitem) => {
                                return (
                                  <li className="bg-[#ddd] px-3 rounded-md text-sm ">
                                    {CurrentValueitem?.value_en}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>
            <p
              className="cursor-pointer text-sm lowercase border-t p-2 px-2"
              onClick={() =>
                setList([
                  ...list,
                  {
                    isColor: "",
                    key_ar: "",
                    key_en: "",
                    values: [
                      {
                        value_ar: "",
                        value_en: "",
                        color: "",
                      },
                    ],
                    edit: true,
                  },
                ])
              }
            >
              {" "}
              Add Another Varient +
            </p>
          </div>
        ) : null}

        {!list?.length ? (
          <p
            className="cursor-pointer text-sm lowercase"
            onClick={() =>
              setList([
                ...list,
                {
                  isColor: "",

                  key_en: "",
                  key_ar: "",

                  values: [
                    {
                      value_ar: "",
                      value_en: "",
                      color: "",
                    },
                  ],
                  edit: true,
                },
              ])
            }
          >
            {" "}
            Add Varient +
          </p>
        ) : null}
        <VariationTable varitions={list} />
      </div>
    </>
  );
};
