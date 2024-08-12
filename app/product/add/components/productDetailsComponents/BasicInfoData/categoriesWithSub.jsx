import { InputWithLabelComponent } from "@/components/inputcomponent";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SubCategoriesSelect({ register, error }) {
  const [categories, setCategories] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState({});
  const [loading, Setloading] = useState(false);
  const [open, setOpen] = useState(false);
  const [collection, setCollection] = useState([]);

  console.log(choosenCategory, "choosenCategorychoosenCategory");
  const FetchDAta = async (query, callback) => {
    Setloading(true);
    try {
      const data = await fetch(`${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  `,
        },
      });
      const res = await data?.json();
      Setloading(false);

      if (res?.data?.length) {
        callback(res?.data);
      }
    } catch (err) {
      Setloading(false);
    }
  };
  useEffect(() => {
    (async () => {
      Setloading(true);

      try {
        const data = await fetch("http://localhost:3001/api/v1/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  `,
          },
        });
        const res = await data?.json();
        Setloading(false);
        if (res?.data?.length) {
          setCategories(
            res?.data?.map((item) => {
              return {
                ...item,
                FetchCat: "subCategories",
              };
            })
          );
        }
      } catch (err) {
        Setloading(false);

        console.log(err);
      }
    })();
  }, []);
  useEffect(() => {
    if (document && open) {
      const searchIcon = document.querySelector(".action-component");
      console.log("dasdsa1423321");
      const handleCloseOutside = (e) => {
        if (!searchIcon?.contains(e.target)) {
          setOpen(false);
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [open]);
  const refetch = (category, FetchCat) => {
    let query = "";
    let customQuery = undefined;
    if (FetchCat === "category") {
      query = "categories";
      customQuery = undefined;
      setChoosenCategory({});
    }
    if (FetchCat === "subCategories") {
      query = "subCategories/forSpecificCategory";
      console.log("hellodsaaaaaaaaaaa", category);

      customQuery = undefined;
    }
    if (FetchCat === "subSubCategories") {
      customQuery = `http://localhost:3001/api/v1/subSubCategories?subCategory=${category?._id}`;
    }

    FetchDAta(
      customQuery
        ? customQuery
        : `http://localhost:3001/api/v1/${query}/${
            category?._id ? category?._id : ""
          }`,
      (data) => {
        const Updateddata = data?.map((item) => {
          return {
            ...item,
            parentCategory: item,
            FetchCat,
          };
        });

        console.log(Updateddata, "Updateddata");
        setCategories(Updateddata);
      }
    );
  };
  return (
    <div className=" grid   gap-2">
      <p>collections</p>

      <div className="relative">
        <div className="inputTag relative">
          <input
            type="text"
            className="border p-2 w-full rounded"
            placeholder={
              Object.keys(choosenCategory)?.length ? "" : "Seclect Collection"
            }
            onClick={(e) => {
              setOpen(true);
            }}
          />
          {!Object.keys(choosenCategory)?.length ? null : (
            <p
              className="text-sm bg-[#333] cursor-pointer text-white p-1 w-fit rounded absolute top-2 left-1"
              onClick={(e) => setOpen(true)}
            >
              {Object?.keys(choosenCategory)?.length
                ? choosenCategory?.name_en
                : "collections"}
            </p>
          )}
        </div>
        {open ? (
          <ul className="action-component ul border rounded-xl shadow-xl border-t-0   absolute top-[50px] left-0 w-[100%] bg-[#ffff] z-[1000] ">
            <button
              type="button"
              className="text-lg flex gap-3 p-3 hover:bg-[#eee]  w-full  action-component "
              onClick={() => {
                refetch("item", "category");
              }}
            >
              {Object?.keys(choosenCategory)?.length ? (
                <Image src={"/leftarrow.svg"} width={25} height={25} />
              ) : null}

              {Object?.keys(choosenCategory)?.length
                ? choosenCategory?.name_en
                : "collections"}
            </button>
            {categories?.length &&
              categories?.map((item) => {
                return (
                  <>
                    {item?.subCategoriesCount || item?.subSubCategoriesCount ? (
                      <li
                        onClick={() => {
                          if (item?.subSubCategoriesCount) {
                            refetch(item, "subSubCategories");
                            setChoosenCategory({
                              ...item,
                              FetchCat: "subSubCategories",
                            });
                          } else {
                            refetch(item, "subCategories");
                            console.log(item, "itemitem13231");
                            setChoosenCategory({
                              ...item,
                              FetchCat: "subCategories",
                            });
                          }
                        }}
                        className="p-3 border-b border-[#eee]  
                         border-t rounded flex items-center justify-between px-3 
                         cursor-pointer   "
                      >
                        <button
                          className="w-fit hover:bg-[#eee]  px-2"
                          onClick={() => {
                            setChoosenCategory(item);
                            setOpen(false);
                          }}
                        >
                          {item?.name_en}
                        </button>
                        <Image src={"/rightArrow.svg"} width={25} height={25} />
                      </li>
                    ) : (
                      <li
                        className="p-3 border-b
                         border-[#eee]   border-t rounded 
                         flex items-center justify-between px-3 
                          cursor-pointer 
                          "
                      >
                        <button
                          className="w-fit hover:bg-[#eee]  px-2"
                          onClick={() => {
                            setChoosenCategory(item);
                            setOpen(false);
                          }}
                        >
                          {item?.name_en}
                        </button>
                      </li>
                    )}
                  </>
                );
              })}

            {/* <li
            className="p-3 border-b border-[#eee]  border-t rounded flex items-center justify-between px-3 
          cursor-pointer hover:bg-[#eee]"
          >
            test
          </li>
          <li
            className="p-3 border-b border-[#eee]  border-t rounded flex items-center justify-between px-3 
          cursor-pointer hover:bg-[#eee]"
          >
            test
          </li> */}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
