import { InputWithLabelComponent } from "@/components/inputcomponent";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SubCategoriesSelect({ register, error }) {
  const [categories, setCategories] = useState([]);
  const [collectionName, setCollectionName] = useState("collections");
  const [loading, Setloading] = useState(false);
  const [collection, setCollection] = useState([]);
  const FetchDAta = async (query, callback) => {
    try {
      const data = await fetch(`${query}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer  `,
        },
      });
      const res = await data?.json();
      // Setloading(false)

      console.log(res, "asdddddddddd");
      if (res?.data?.length) {
        callback(res?.data);
      }
    } catch (err) {
      // Setloading(false)

      console.log(err, "adsssssssssssssssssss");
    }
  };
  useEffect(() => {
    // Setloading(true)
    (async () => {
      try {
        const data = await fetch("http://localhost:3001/api/v1/categories", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer  `,
          },
        });
        const res = await data?.json();
        // Setloading(false)
        if (res?.data?.length) {
          setCategories(res?.data);
        }
      } catch (err) {
        // Setloading(false)

        console.log(err);
      }
    })();
  }, []);
  console.log(categories, loading, "adsssssssssssscategories");

  const refetch = (category) => {
    console.log(category, "refetch");
    FetchDAta(
      `http://localhost:3001/api/v1/subCategories/forSpecificCategory/${category?._id}`,
      (data) => {
        const Updateddata = data?.map((item) => {
          return {
            ...item,
            parentCategory: item,
          };
        });

        setCategories(Updateddata)

      }
    );
  };
  return (
    <div className=" grid   gap-2">
      <p>{collectionName}</p>

      <div className="relative">
        <input type="text" className="border p-2 w-full rounded" />
        <ul className="ul border rounded-xl shadow-xl border-t-0   absolute top-[50px] left-0 w-[100%] bg-[#ffff] z-[1000] ">
          <button
            type="button"
            className="text-lg flex gap-3 p-3 hover:bg-[#eee]  w-full   "
          >
            <Image src={"/leftarrow.svg"} width={25} height={25} />
            <p>collections</p>
          </button>
          {categories?.length &&
            categories?.map((item) => {
              return (
                <>
                  {item?.subCategoriesCount ? (
                    <li
                      onClick={() => {
                        refetch(item);
                      }}
                      className="p-3 border-b border-[#eee]   border-t rounded flex items-center justify-between px-3 
          cursor-pointer hover:bg-[#eee] "
                    >
                      {item?.name_en}
                      <Image src={"/rightArrow.svg"} width={25} height={25} />
                    </li>
                  ) : (
                    <li
                      className="p-3 border-b border-[#eee]   border-t rounded flex items-center justify-between px-3 
         cursor-pointer hover:bg-[#eee] "
                    >
                      {item?.name_en}
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
      </div>
    </div>
  );
}
{
  /* <InputWithLabelComponent
Input={false}
selectArray={["hello", "dummy"]}
label="Parent Category "
PlaceHolder="Add product name"
 register={{ ...register("category") }}
isError={error?.category}
message={error?.category?.message}
/>
{/* <hr className="w-[100px]  bg-black" /> */
}

{
  /* <InputWithLabelComponent
Input={false}
selectArray={["hello", "dummy"]}
label="Category"
PlaceHolder="Add product name"
/> */
}

{
  /* <hr className="w-[100px]  bg-black" /> */
}
{
  /* <InputWithLabelComponent
Input={false}
selectArray={["hello", "dummy"]}
label="Sub Category"
PlaceHolder="Add product name"
inputCss="w-[100%]"
/> */
}
