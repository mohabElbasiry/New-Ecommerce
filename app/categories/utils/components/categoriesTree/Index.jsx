"use client";

import { useState } from "react";
import "./tree-style.css";
import { treeData } from "../../constants/treeItemsData";
import Model from "./Model";
import { treeRendering } from "./treeRendering";
import { toastMessagener } from "@/components/Layout/RootSignal";
import { categoryHandler } from "../../functions";
export default function CategoriesTree({ categories }) {
  console.log("Categories tree", categories);
  const [treeItems, setTreeItems] = useState(treeData);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const addElementToTree = (newItem) => {
    // const updateTree = (items) => {
    //   return items.map((item) => {
    //     if (item.id === selectedItem?.id) {
    //       return {
    //         ...item,
    //         hasNext: true,
    //         children: [
    //           ...(item?.children || []),
    //           {
    //             ...newItem,
    //             hasNext: false,
    //             hasPrev: true,
    //             parent: { id: item.id, title: item.title },
    //           },
    //         ],
    //       };
    //     }
    //     if (item?.children?.length) {
    //       return {
    //         ...item,
    //         children: updateTree(item?.children),
    //       };
    //     }
    //     return item;
    //   });
    // };
    // setTreeItems((prevTreeItems) => updateTree(prevTreeItems));
  };
  const editElementToTree = (changedTitle) => {
    const updateTree = (items) => {
      return items.map((item) => {
        if (item.id === selectedItem?.id) {
          return {
            ...item,
            title: changedTitle,
          };
        }
        if (item?.children?.length) {
          return {
            ...item,
            children: updateTree(item?.children),
          };
        }
        return item;
      });
    };

    setTreeItems((prevTreeItems) => updateTree(prevTreeItems));
  };
  const deleteElementFromTree = (delItem) => {
    const RemovingItems = (items) => {
      const findParentItem = items.find((item) => item.id == delItem.id);
      if (findParentItem) {
        return items.filter((i) => i.id !== findParentItem.id);
      } else {
        return items?.map((i) => {
          if (i?.children?.length) {
            if (
              i.children.length === 1 &&
              i.children?.find((c) => c.id === delItem.id)
            ) {
              const { children, ...restProperties } = i;
              return { ...restProperties, hasNext: false };
            }
            return {
              ...i,
              children: RemovingItems(i.children),
            };
          }
          return i;
        });
      }
    };
    setTreeItems((prevTreeItems) => RemovingItems(prevTreeItems));
  };
  const findItemOfTree = (itemId) => {
    const findOperation = (items) => {
      const existedParent = items.find((el) => el.id === itemId);
      if (existedParent) {
        console.log("existedParent", existedParent);
        return existedParent;
      } else {
        return items?.find((i) => {
          if (i?.children?.length && i?.children.find((c) => c.id === itemId)) {
            return i;
          }
        });
      }
    };
    return findOperation(treeItems);
  };
  const addNewElementToTree = async (newItem) => {
    // toastMessagener.success(`Success from Single toast`);
    // setTreeItems((prev) => [...prev, newItem]);
    // console.log("res func", res);
    console.log("new item هذا", newItem);
    const cr = await categoryHandler.creation(newItem);
    console.log("cr", cr);
  };

  return (
    <div className="tree relative px-4 w-1/2">
      <div className="flex justify-end items-center h-60 w-[90%] mx-auto">
        <button
          onClick={() => {
            setOpen(true);
            setSelectedItem("add-new");
          }}
          className="bg-gray-500 text-white py-3 px-5 rounded-2xl"
        >
          Add new category
        </button>
      </div>
      <Model
        open={open}
        setOpen={setOpen}
        addElementToTree={addElementToTree}
        addNewElementToTree={addNewElementToTree}
        editElementToTree={editElementToTree}
        selectedItem={selectedItem}
      />
      {!categories?.length ? (
        <p className="text-center text-3xl">No items yet</p>
      ) : (
        treeRendering(
          categories,
          open,
          setOpen,
          setSelectedItem,
          deleteElementFromTree
        )
      )}
    </div>
  );
}
