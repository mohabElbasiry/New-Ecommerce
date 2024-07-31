import { BulkEditArray } from "@/app/product/add/constants/BulkeditArray";
import { CustomDialoge } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { produce } from "immer";
import { memo, useEffect, useState } from "react";
import MultibleValues from "./multibleValuesEdit";
import { defaultValues } from "./defaultValues";
import { SinglePropertyValue } from "./SinglePropertyValue.js";

const Actions = ({
  checkedArray = [],
  varitionsValues = [],
  setVarients = () => {},
  variants,
}) => {
  console.log(varitionsValues, "varitionsValues");
  const [openModal, setOpenModal] = useState(defaultValues);

  const [BulkArray, setBulkArray] = useState(BulkEditArray);
  useEffect(() => {
    if (varitionsValues?.length && checkedArray?.length) {
      const checkedMap = new Map(checkedArray.map((item) => [item.key, item]));
      varitionsValues.forEach((item) => {
        const checkedItem = checkedMap.get(item?.key);
        if (checkedItem) {
          item?.values.forEach((itemv, idx) => {
            if (checkedItem?.SelectedItems?.includes(idx)) {
              if (itemv.continue_out_stock) {
                setBulkArray((prev) => {
                  return prev.map((item) => {
                    if (item?.name === "stop Selling When Out Of Stock") {
                      return {
                        ...item,
                        disabled: false,
                        value: false,
                      };
                    }
                    return item;
                  });
                });
              } else {
                setBulkArray((prev) => {
                  return prev.map((item) => {
                    if (item?.name === "stop Selling When Out Of Stock") {
                      return {
                        ...item,
                        disabled: true,
                        value: true,
                      };
                    }
                    return item;
                  });
                });
              }

              if (itemv?.image.length) {
                setBulkArray((prev) => {
                  return prev.map((item) => {
                    if (item?.name === "Remove Images") {
                      return {
                        ...item,
                        disabled: false,
                      };
                    }
                    return item;
                  });
                });
              } else {
                setBulkArray((prev) => {
                  return prev.map((item) => {
                    if (item?.name === "Remove Images") {
                      return {
                        ...item,
                        disabled: true,
                      };
                    }
                    return item;
                  });
                });
              }
            }
          });
        }
      });
      console.log(varitionsValues, "varitionsValuesvaritionsValues");
    }
  }, [varitionsValues, checkedArray]);

  const [action, setAction] = useState("");
  const SetPropertyValues = (property, value) => {
    setVarients(
      produce((draft) => {
        const checkedMap = new Map(
          checkedArray.map((item) => [item.key, item])
        );
        const updatedDraft = draft.productvaritions.varitionsValues.map(
          (item) => {
            const checkedItem = checkedMap.get(item?.key);
            if (checkedItem) {
              const values = item?.values?.map((itemv, idx) => {
                if (checkedItem?.SelectedItems?.includes(idx)) {
                  return {
                    ...itemv,
                    [property]: value,
                  };
                }
                return itemv;
              });
              return {
                ...item,
                values,
              };
            }
            return item;
          }
        );
        draft.productvaritions.varitionsValues = updatedDraft;
      })
    );
  };

  const HandleAction = (
    action,
    actionType,
    property,
    isNumber = false,
    type = "single",
    value = true
  ) => {
    if (actionType === "modal") {
      const checkedMap = new Map(checkedArray.map((item) => [item.key, item]));
      const SelectedVarient = varitionsValues
        ?.map((item) => {
          const GettingItem = checkedMap.get(item?.key);
          if (GettingItem) {
            const values = item?.values?.filter((itemv, idx) => {
              return GettingItem?.SelectedItems?.includes(idx);
            });
            return {
              ...item,
              values,
            };
          } else {
            return null;
          }
        })
        .filter(Boolean);
      setOpenModal(
        produce((draft) => {
          draft.isOpen = true;
          draft.action = action;
          draft.property = property;
          if (isNumber) {
            draft.isNumber = true;
          }
          draft.selectedVarients = type !== "single" ? SelectedVarient : [];
        })
      );
    }
    if (actionType === "delete") {
      // if (item?.values?.length === 1) {
      //   const values = item?.values?.map((itemv, idx) => {
      //     const value = Checked?.SelectedItems?.includes(idx);
      //     if(value){

      //     }

      //   });
      // }
      if (action === "Delete Varients") {
        // if(openModal?.action==="delete"){
        //   setVarients(
        //     produce((draft) => {
        //       const activeVariantsMap = new Map();
        //       varitionsValues.forEach((item) => {
        //         item.values.forEach((variant) => {
        //           if (!variant.deleted) {
        //             variant.values.forEach((v) => {
        //               if (!activeVariantsMap.has(v.key_en)) {
        //                 activeVariantsMap.set(v.key_en, new Set());
        //               }
        //               activeVariantsMap.get(v.key_en).add(v.value_en);
        //             });
        //           }
        //         });
        //       });
        //       const updatedOptions = variants
        //         .map((option) => {
        //           const activeValues =
        //             activeVariantsMap.get(option.key_en) || new Set();
        //           return {
        //             ...option,
        //             values: option.values.filter((value) =>
        //               activeValues.has(value.value_en)
        //             ),
        //           };
        //         })
        //         .filter((item) => item?.values.length);

        //       console.log(updatedOptions, "updatedOptions");
        //       draft.productvaritions.variants = updatedOptions;
        //       // draft.productvaritions.REfvariants = updatedOptions;
        //     })
        //   );
        // }
        setVarients(
          produce((draft) => {
            const checkedMap = new Map(
              checkedArray.map((item) => [item.key, item])
            );

            const updatedValuesAfterDelete =
              draft.productvaritions.varitionsValues
                .map((item) => {
                  const Checked = checkedMap.get(item?.key);
                  if (Checked) {
                    const values = item?.values?.map((itemv, idx) => {
                      const value = Checked?.SelectedItems?.includes(idx);
                      if (value) {
                        return {
                          ...itemv,
                          deleted: true,
                        };
                      }

                      return itemv;
                    });

                    return {
                      ...item,
                      values,
                    };
                  }
                  return item;
                })
                .filter((item) => {
                  if (item?.values?.length === 1) {
                    return item?.values.some((item) => !item?.deleted);
                  }

                  return !item.values.every((variant) => variant.deleted);
                });
            draft.productvaritions.varitionsValues = updatedValuesAfterDelete;

            const activeVariantsMap = new Map();

            // Populate the activeVariantsMap with non-deleted variants
            updatedValuesAfterDelete.forEach((item) => {
              item.values.forEach((variant) => {
                if (!variant.deleted) {
                  variant.values.forEach((v) => {
                    if (!activeVariantsMap.has(v.key_en)) {
                      activeVariantsMap.set(v.key_en, new Set());
                    }
                    activeVariantsMap.get(v.key_en).add(v.value_en);
                  });
                }
              });
            });

            const updatedOptions = draft.productvaritions.variants
              .map((option) => {
                const activeValues =
                  activeVariantsMap.get(option.key_en) || new Set();
                return {
                  ...option,
                  values: option.values.filter((value) =>
                    activeValues.has(value.value_en)
                  ),
                };
              })
              .filter((item) => item?.values.length);

            draft.productvaritions.variants = updatedOptions;
            draft.productvaritions.REfvariants = updatedOptions;
          })
        );
      }
    }

    if (actionType === "singleAction") {
      console.log(property, "property");
      SetPropertyValues(property, value);
    }
  };

  // varients

  // Function to mark a variant as deleted
  // const deleteVariant = (variantIndex) => {
  //   const updatedVariants = variants.map((variant) => {
  //     if (variant.itemIndex === variantIndex) {
  //       return { ...variant, deleted: true };
  //     }
  //     return variant;
  //   });

  //   setVariants(updatedVariants);
  // };

  // Dynamically update options based on current variants

  // varients
  return (
    <>
      {openModal?.selectedVarients?.length ? (
        <MultibleValues
          action={openModal?.action}
          SelectedArray={openModal?.selectedVarients?.flatMap(
            (item) => item?.values
          )}
          open={openModal?.isOpen}
          property={openModal?.property}
          setOpenModal={setOpenModal}
          value={openModal?.value}
          setVarients={setVarients}
        />
      ) : (
        <SinglePropertyValue
          openModal={openModal}
          setOpenModal={setOpenModal}
          setVarients={setVarients}
          checkedArray={checkedArray}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-1 h-[30px] shadow">
            <img src="/edit.svg" height={"20px"} width={"20px"} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onChange={(e) => {
            console.log(e, "dassssssssss");
          }}
        >
          {BulkArray.map((item) => {
            return (
              <DropdownMenuItem
                key={item?.name}
                disabled={item?.disabled}
                className={` ${item?.css} cursor-pointer`}
                onClick={() => {
                  HandleAction(
                    item?.name,
                    item?.updateType,
                    item?.property,
                    item?.isNumber,
                    item?.type,
                    item?.value
                  );
                }}
              >
                {item?.name}
                {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default memo(Actions);
