"use client";
import DynamicTable from "@/components/GlobalUi/DynamicTable";
import React, { useState } from "react";
import Unavailable from "./components/Unavailable";
import Available from "./components/Available";

const data = {
  Keys: ["Location", "Unavailable", "Committed", "Available", "OnHand"],
  values: [
    {
      Location: "asmaa",
      Unavailable: {
        name: "Unavailable inventory",
        quantity: 0,
        quantityObj: {
          damaged: { name: "damaged", qty: 0 },
          QualityControl: { name: "quality control", qty: 0 },
          SafetyStock: { name: "safety stock", qty: 0 },
          Other: { name: "Other", qty: 0 },
        },
      },
      Committed: {
        name: "Committed",
        quantity: 0,
      },
      Available: {
        name: "Available",
        quantity: 0,
        quantityObj: {
          AdjustBy: { name: "Adjust by", qty: 0 },
          New: { name: "New", qty: 0 },
        },
      },
      OnHand: {
        name: "OnHand",
        quantity: 0,
        quantityObj: {
          AdjustBy: { name: "Adjust by", qty: 0 },
          New: { name: "New", qty: 0 },
        },
      },
    },
    {
      Location: "naser city",
      Unavailable: {
        name: "Unavailable inventory",
        quantity: 0,
        quantityObj: {
          damaged: { name: "damaged", qty: 0 },
          QualityControl: { name: "quality control", qty: 0 },
          SafetyStock: { name: "safety stock", qty: 0 },
          Other: { name: "Other", qty: 0 },
        },
      },
      Committed: {
        name: "Committed",
        quantity: 0,
      },
      Available: {
        name: "Available",
        quantity: 0,
        quantityObj: {
          AdjustBy: { name: "Adjust by", qty: 0 },
          New: { name: "New", qty: 0 },
        },
      },
      OnHand: {
        name: "OnHand",
        quantity: 0,
        quantityObj: {
          AdjustBy: { name: "Adjust by", qty: 0 },
          New: { name: "New", qty: 0 },
        },
      },
    },
  ],
  customHeader: {
    OnHand: () => <>On hand</>,
  },
  customColumn: {
    Location: ({ item }) => <div className="w-32">{item}</div>,
    Unavailable: ({ item,index }) => <Unavailable key={item+index} item={item} />,
    Committed: ({ item }) => <>{item?.name}</>,
    Available: ({ item,index  }) => <Available   key={item+index} item={item}/>   ,
    OnHand: ({ item,index  }) =>  <Available   key={item+index} item={item}/> ,
  },

  enableSelect: false,
};
export default function ProductDetailsPage({ searchParams }) {
  const [dataDynamic, setDataDynamic] = useState(data);
  const handleDataChange = (newData) => {
    setDataDynamic(newData);
  };

  return (
    <div className="py-32">
      <div className="bg-white shadow   max-w-2xl mx-auto p-4 grid gap-6 rounded-md">
        <h3 className="text-lg">Inventory</h3>
        <DynamicTable data={dataDynamic} />
      </div>
    </div>
  );
}
