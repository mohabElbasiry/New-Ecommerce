import { useState } from "react";
import CreateVariation from "./createVariations";

export const ProductVariation = () => {
  const [list, setList] = useState([]);
  const [edit, setdit] = useState(false);

  return (
    <>
      <div className="w-[60%]">
        {list?.length ? (
          <div>
            {list?.map((item, idx) => {
              return (
                <>
                  {item?.edit ? (
                    <CreateVariation
                      setList={setList}
                      listIndex={idx}
                      setdit={setdit}
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

                        console.log("object",list);

                      }}
                    >
                      "dasads"
                    </div>
                  )}
                </>
              );
            })}
            <p
              className="cursor-pointer text-sm lowercase"
              onClick={() =>
                setList([
                  ...list,
                  {
                    isColor: "",
                    optionname: {
                      option_en: "",
                      option_ar: "",
                    },
                    currentValues: [
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
                  optionname: {
                    option_en: "",
                    option_ar: "",
                  },
                  currentValues: [
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
      </div>
    </>
  );
};
