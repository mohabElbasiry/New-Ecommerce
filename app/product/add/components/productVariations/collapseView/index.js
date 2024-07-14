"use client";
import { useMemo, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  ChevronDown,
} from "@/components/ui/accordion";
import { UpdateFeildActionFunction } from "../variationTables/Update/updateFields.js";
import { InputWithLabelComponent } from "@/components/inputcomponent.js";
import { SelectedArrayCheckBox } from "../variationTables/Update/selectedArray.js";
import { UpdateQualityImages } from "../variationTables/Update/updateImages.js";
export const CollapseView = ({ varitions = [] }) => {
  const [data, setData] = useState([]);
  function generateQualities(prev, attributes) {
    const qualities = [];

    function generateCombinations(currentCombination, depth) {
      if (depth === attributes.length) {
        qualities.push({
          values: currentCombination,
          quantity: 0,
          price: 0,
          image: [],
        });
        return;
      }

      attributes[depth].values.forEach((value) => {
        const newCombination = currentCombination.slice();
        newCombination.push({
          key_en: attributes[depth].key_en,
          key_ar: attributes[depth].key_ar,
          value_en: value.value_en,
          value_ar: value.value_ar,
          color: value.color,
        });
        generateCombinations(newCombination, depth + 1);
      });
    }

    generateCombinations([], 0);

    const AdjustArray = qualities
      .map((item, index) => {
        const Founded = prev.find((item, idx) => idx === index);
        if (Founded) {
          return {
            ...item,
            values: item.values,
            price: Founded.price,
            quantity: Founded.quantity,
            image: Founded?.image,
          };
        }
        return item;
      })
      .map((item, idx) => ({ ...item, itemIndex: idx }));

    return AdjustArray;
  }

  function shapeData(combinedTexts, collapse, callback) {
    let data = [];

    varitions?.[0].values.forEach((valueGroup, idx) => {
      let obj = {
        key: valueGroup.value_en,
        value: [],
        itemIndex: idx + 1,
        quantity: 0,
        sku: "",
        continue_selling: true,
        price: 0,
        compare_to_price: 0,
        barcode: "",
        images: [],
      };

      combinedTexts.forEach((valueItem, indx) => {
        let check = valueItem.values.some(
          (value) =>
            value.value_en === valueGroup.value_en &&
            value.key_en === varitions[0].key_en
        );

        if (check) {
          let str = "";

          valueItem.values.forEach((value) => {
            // if (value.value_en !== valueGroup.value_en) {
            str += value.value_en + "/";
            // }
          });

          obj.value.push({
            itemIndex: `${idx + 1}${indx + 1}`,
            val: str.trim(),
            quantity: valueItem.quantity,
            sku: "",
            continue_selling: true,
            price: 0,
            compare_to_price: 0,
            barcode: "",
            images: [],
          });
        }
      });
      let qty = 0;
      obj.value.map((value) => (qty += value.quantity));
      obj.quantity = qty;
      data.push(obj);
    });

    return data;
  }

  useMemo(() => {
    const combinedTexts = generateQualities([], varitions);

    if (combinedTexts?.length) {
      setData(shapeData(combinedTexts));
    }
  }, [JSON.stringify(varitions)]);
  console.log(data, "adssssssssss31421");

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {data?.map((item, idx) => {
          return (
            <AccordionItem key={item?.key} value={item?.key}>
              <AccordionTrigger
                className="flex 
              items-center w-full justify-between
              border-[#ddd] border-b"
              >
                <div className="flex items-center gap-3">
                  <SelectedArrayCheckBox
                    all={false}
                    // setCheckedElements={setCheckedElements}
                    idx={idx}
                    // autoGenerate={autoGenerate}
                    // checkedElements={checkedElements}
                  />
                  <UpdateQualityImages
                    // setAutoGenerate={setAutoGenerate}
                    // setBeforeFiltered={setBeforeFiltered}
                    index={idx}
                    item={item}
                  />
                </div>
                <div>
                  <p> {item?.key}</p>
                  <p className="pl-5">
                    {item?.value?.length}
                    varients
                  </p>
                </div>
                <div className="flex gap-1 items-center">
                  <InputWithLabelComponent
                    // label="compare To Price"
                    PlaceHolder="Add product price"
                    Input
                    inputType="number"
                    // register={{ ...register("price") }}
                    price
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    inputCss="max-w-[150px] h-[35px]"
                  />

                  <UpdateFeildActionFunction
                    // checkedElements={checkedElements}
                    item
                    idx={idx}
                    property={"quantity"}
                    // setAutoGenerate={setAutoGenerate}
                    // setBeforeFiltered={setBeforeFiltered}
                    inputCss={
                      "max-w-[100px]  h-[35px] text-left p-2 !bg-[#eee]"
                    }
                    disabled
                    value={item?.quantity}
                    itemValue={item}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </div>
              </AccordionTrigger>
              {item?.value?.map((valueItem, idx) => {
                return (
                  <AccordionContent>
                    <div className="flex items-center justify-between pl-10  border-[#ddd] border-b">
                      <div className="flex items-center gap-3   ">
                        <SelectedArrayCheckBox
                          all={false}
                          // setCheckedElements={setCheckedElements}
                          idx={idx}
                          // autoGenerate={autoGenerate}
                          // checkedElements={checkedElements}
                        />
                        <UpdateQualityImages
                          // setAutoGenerate={setAutoGenerate}
                          // setBeforeFiltered={setBeforeFiltered}
                          index={idx}
                          item={valueItem}
                        />
                      </div>
                      <div>
                        <p> {valueItem?.val}</p>
                      </div>
                      <div className="flex gap-1 items-center">
                        <InputWithLabelComponent
                          // label="compare To Price"
                          PlaceHolder="Add product price"
                          Input
                          inputType="number"
                          // register={{ ...register("price") }}
                          price
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          inputCss="max-w-[150px] h-[35px]"
                        />

                        <UpdateFeildActionFunction
                          // checkedElements={checkedElements}
                          item
                          idx={idx}
                          property={"quantity"}
                          // setAutoGenerate={setAutoGenerate}
                          // setBeforeFiltered={setBeforeFiltered}
                          inputCss={
                            "max-w-[100px]  h-[35px] text-left p-2 !bg-[#eee]"
                          }
                          disabled
                          value={valueItem?.quantity}
                          itemValue={valueItem}
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        />
                      </div>
                    </div>
                  </AccordionContent>
                );
              })}
            </AccordionItem>
          );
        })}
      </Accordion>
    </>
  );
};
