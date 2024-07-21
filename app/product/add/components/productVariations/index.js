import { memo, useEffect, useState } from "react";
import CreateVariation from "./createVariations";
import {
  useMotionValue,
  Reorder,
  useDragControls,
  motion,
} from "framer-motion";
import { ReorderIcon } from "../drageControl";
import VariationTable from "./variationTables";
import CollapseView from "./collapseView";
import { produce } from "immer";
import { shapeData } from "./collapseView/functions/datashape";
import { generateQualities } from "./collapseView/functions/GenerateQualities";

const ProductVariation = ({
  setVarients = () => {},
  productVarients = {},
  refrenceVarient = [],
  data = {
    Data: [],
    BeforeFilterData: [],
  },
  setData = () => {},
}) => {
  const dragControls = useDragControls();
  const handleReorder = (newVariants) => {
    setVarients(
      produce((draft) => {
        draft.productvaritions.variants = newVariants;
        draft.productvaritions.varitionsValues = shapeData(
          generateQualities(
            draft.productvaritions.varitionsValues?.flatMap((item) => item?.values),
            newVariants || []
          ),
          newVariants || []
        );
      })
    );
  };

  return (
    <>
      <p className="my-2 title">Add Varations</p>
      <div className="w-[100%]    ">
        {productVarients?.variants?.length ? (
          <div className="  w-[100%] pb-1  rounded-md px-2 pt-1   border box mb-2">
            <Reorder.Group
              onDragEnd={(e) => e.stopPropagation()}
              axis="y"
              values={productVarients?.variants}
              onReorder={handleReorder}
              dragListenser={false}
            >
              {productVarients?.variants?.map((item, idx) => {
                return (
                  <Reorder.Item
                    onDragEnd={(e) => e.stopPropagation()}
                    dragListenser={false}
                    dragControls={dragControls}
                    value={item}
                    key={item?.key_en}
                    as={motion.div}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    whileDrag={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                    className="my-2"
                  >
                    {item?.edit ? (
                      <CreateVariation
                        setList={setVarients}
                        listIndex={idx}
                        list={productVarients?.variants}
                        data={data}
                      />
                    ) : (
                      <div
                        onClick={() => {
                          setVarients(
                            produce((draft) => {
                              draft.productvaritions.variants =
                                draft?.productvaritions.variants?.map(
                                  (item, index) => {
                                    if (idx === index) {
                                      return {
                                        ...item,

                                        edit: true,
                                      };
                                    }
                                    return item;
                                  }
                                );
                            })
                          );
                          // localStorage?.setItem("list", JSON.stringify(list));
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
              onClick={() => {
                setVarients(
                  produce((draft) => {
                    draft?.productvaritions?.variants?.push({
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
                    });
                  })
                );
              }}
            >
              {" "}
              Add Another Varient +
            </p>
          </div>
        ) : null}
        {!productVarients?.variants?.length ? (
          <p
            className="cursor-pointer text-sm lowercase"
            onClick={() => {
              setVarients(
                produce((draft) => {
                  draft?.productvaritions?.variants?.push({
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
                  });
                })
              );
            }}
          >
            {" "}
            Add Varient +
          </p>
        ) : null}
      </div>
      <CollapseView
        varitions={productVarients?.variants?.filter((item) => !item?.edit)}
        varitionsValues={productVarients?.varitionsValues}
        setVarients={setVarients}
        setData={setData}
        data={data}
        REfvariants={productVarients?.REfvariants}
      />
      {/* <VariationTable varitions={productVarients?.variants} 
          // setSubmitedData={setSubmitedData}
           /> */}
    </>
  );
};
export default memo(ProductVariation);
