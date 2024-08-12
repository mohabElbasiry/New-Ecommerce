"use client";
import DynamicTable from "@/components/GlobalUi/DynamicTable";
import { getOperationClient } from "@/lib/apiUtilsClient";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
export default function CategoriesTable({ categories, cId = "" }) {
  const data = (payload) => {
    return {
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
            router.push(`categories?${params.toString()}`);
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
              </button>
            </div>
          );
        },
        createdAt: ({ item }) => <div>{moment(item).format("YYYY-MM-DD")}</div>,
        isArchived: ({ item }) => <div>{`${item}`}</div>,
      },
      enableSelect: true,
    };
  };
  const [dataDynamic, setDataDynamic] = useState(data(categories));

  return (
    <div className="bg-white shadow w-[90%] mx-auto p-4 grid gap-6 rounded-md">
      <h3 className="text-lg">Categories</h3>
      <DynamicTable data={dataDynamic} cId={cId} />
    </div>
  );
}
