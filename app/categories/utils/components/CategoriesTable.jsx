"use client";
import Available from "@/app/product/table-inventory/components/Available";
import Unavailable from "@/app/product/table-inventory/components/Unavailable";
import DynamicTable from "@/components/GlobalUi/DynamicTable";
import moment from "moment";
import { useState } from "react";
export default function CategoriesTable({ categories }) {
  const [dataDynamic, setDataDynamic] = useState(data(categories));
  console.log("categories inside dataDynamic:: ", dataDynamic);

  return (
    <div className="bg-white shadow   w-[90%] mx-auto p-4 grid gap-6 rounded-md">
      <h3 className="text-lg">Categories</h3>
      <DynamicTable data={dataDynamic} />
    </div>
  );
}
const data = (payload) => ({
  Keys: ["fullName", "createdAt"],

  values: payload.map((item) => ({
    _id: item._id,
    fullName: item.fullName,
    createdAt: item.createdAt,
  })),
  customHeader: {
    OnHand: () => <>On hand</>,
  },
  customColumn: {
    fullName: ({ item }) => <div>{item.en}</div>,
    createdAt: ({ item }) => <div>{moment(item).format("YYYY-MM-DD")}</div>,
    isArchived: ({ item }) => <div>{`${item}`}</div>,
  },
  enableSelect: true,
});
