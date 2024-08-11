"use client";
import DynamicTable from "@/components/GlobalUi/DynamicTable";
import { getOperationClient } from "@/lib/apiUtilsClient";
import moment from "moment";
import { useState } from "react";
export default function CategoriesTable({ categories }) {
  const data = (payload) => {
    return {
      Keys: ["fullName", "createdAt"],
      values: !payload?.length
        ? []
        : payload.map((item) => ({
            _id: item._id,
            fullName: {
              _id: item._id,
              name: item.name,
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
          const fetchSubCategories = async (cId) => {
            const childsData = await getOperationClient(
              `/categories/${cId}/child`,
              {
                method: "GET",
                headers: {
                  token: true,
                },
              }
            );
            if (childsData?.data) {
              setDataDynamic(data(childsData?.data));
            } else {
              setDataDynamic(data([]));
            }
          };
          return (
            <div>
              <button onClick={() => fetchSubCategories(item?._id)}>
                {item?.name?.en} : isLeaf {JSON.stringify(item?.isLeaf)}
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
      <DynamicTable data={dataDynamic} />
    </div>
  );
}
