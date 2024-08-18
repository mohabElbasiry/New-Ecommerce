"use client";
import GlobalDynamicTable from "@/components/GlobalUi/GlobalTable/Index";
import { getOperationClient } from "@/lib/apiUtilsClient";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { handleDeleteCategory } from "../functions";
import { toastMessagener } from "@/components/Layout/RootSignal";
import Image from "next/image";
import { imageBaseUrl } from "@/lib/baseUrl";
export default function CategoriesTable({ categories, cId = "" }) {
  
  const data = (payload) => ({
    Keys: ["fullName", "createdAt"],
    values: !payload?.length
      ? []
      : payload.map((item) => ({
          _id: item._id,
          fullName: {
            _id: item._id,
            name: item.fullName,
            isRoot: item.isRoot,
            isLeaf: item.isLeaf,
            image: item?.image?.filename,
          },
          createdAt: item.createdAt,
        })),
    customHeader: {
      OnHand: () => <>On hand</>,
    },
    customColumn: {
      fullName: ({ item }) => {
        const searchParams = useSearchParams();
        const params = new URLSearchParams(searchParams);
        const router = useRouter();
        const fetchSubCategories = async (cId) => {
          const childsData = await getOperationClient(
            `/categories/${cId}/childs`,
            {
              method: "GET",
              headers: {
                token: true,
              },
            }
          );
          params.set("c", cId);
          router.push(`/categories?${params.toString()}`);
          if (childsData?.data?.length) {
            setDataDynamic(data(childsData?.data));
          } else {
            setDataDynamic(data([]));
          }
        };
        return (
          <div>
            <button onClick={() => fetchSubCategories(item?._id)}>
              {item?.name?.en}
            </button>{" "}
            {item?.image ? (
              <Image
                src={imageBaseUrl + "/" + item.image}
                alt={item.name.en}
                height={20}
                width={20}
                className="h-[20px[ w-[20px]"
              />
            ) : null}
          </div>
        );
      },
      createdAt: ({ item }) => <div>{moment(item).format("YYYY-MM-DD")}</div>,
    },
    
    enableSelect: true,
  });
  const [dataDynamic, setDataDynamic] = useState(data(categories));
  const router = useRouter();
  const deleteCategory = (itemId) => {
    handleDeleteCategory(itemId).then((res) => {
      if (res.status === "success") {
        toastMessagener.success(res?.messages[0]?.message_en);
        const filtered = categories.filter((c) => c._id !== itemId);
        setDataDynamic(data(filtered));
      } else {
        toastMessagener.error(res?.messages[0]?.message_en);
      }
    });
  };

  return (
    <div className=" shadow w-[90%] mx-auto   grid gap-6 rounded-md">
      {/* <div className="flex items-center gap-3">
        {cId ? (
          <ArrowLeft className="cursor-pointer" onClick={() => router.back()} />
        ) : null}
        <h3 className="text-lg">Categories</h3>
      </div> */}
      <div>
        <GlobalDynamicTable
          data={dataDynamic}
          itemId={cId}
          navigations={{
            add: (itemId = "") =>
              `/categories/add${itemId ? `?c=${itemId}` : ""}`,
          }}
          isOptions={{
            edit: (itemId) => router.push(`/categories/edit?cEd=${itemId}`),
            delete: async (itemId) => deleteCategory(itemId),
          }}
          customData = {{
            headCols : [{key : "fullname",value : "fullName"  },{}]
          }}
        />
        {/* <DynamicTable
          data={dataDynamic}
          itemId={cId}
          navigations={{
            add: (itemId = "") =>
              `/categories/add${itemId ? `?c=${itemId}` : ""}`,
          }}
          isOptions={{
            edit: (itemId) => router.push(`/categories/edit?cEd=${itemId}`),
            delete: async (itemId) => deleteCategory(itemId),
          }}
        /> */}
      </div>
    </div>
  );
}
