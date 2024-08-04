import { ListManager } from "react-beautiful-dnd-grid";
import { produce } from "immer";
import UploadFilesModal from "../UploadFilesModal";
import { useState } from "react";
import UploadFile from "@/app/product/components/UploadFile";

export const DragableImagesBox = ({ images: sortedList, setSubmitedData }) => {
  function sortListArr(list) {
    return list.slice().sort((first, second) => first.order - second.order);
  }
  const sortList = (list) => {
    setSubmitedData(
      produce((draft) => {
        draft.productDetails.images = sortListArr(list).map((item, idx) => ({
          ...item,
          idx,
        }));
      })
    );
  };

  const reorderList = (sourceIndex, destinationIndex) => {
    const list = sortedList.map((item) => ({ ...item }));

    if (destinationIndex === sourceIndex) {
      return;
    }
    if (destinationIndex === 0) {
      list[sourceIndex].order = list?.[0]?.order - 1;
      sortList(list);
      return;
    }

    if (destinationIndex === list?.length - 1) {
      sortList(list);
      return;
    }

    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list?.[destinationIndex]?.order +
          list?.[destinationIndex - 1]?.order) /
        2;
      sortList(list);
      return;
    }

    list[sourceIndex].order =
      (list?.[destinationIndex]?.order + list?.[destinationIndex + 1]?.order) /
      2;
    sortList(list);
  };
  const HandleSubmit = (images) => {
    console.log(images, "imagesimagesimages");
    // setSubmitedData(
    //   produce((prev) => {
    //     if (!prev.images) {
    //       prev.images = [];
    //     }
    //     images.forEach((image) => {
    //       if (!prev.images.some((existingImage) => existingImage === image)) {
    //         prev.images.push(image);
    //       }
    //     });
    //   })
    // );
  };

  const setImages = () => {};
  return (
    <>
      <div className="App">
        <ListManager
          items={sortedList}
          direction="horizontal"
          maxItems={4}
          className="dragable"
          render={(item) => {
            return (
              <div>
                <img
                  className={`border m-1  overflow-hidden object-cover  ${
                    item?.idx == 0
                      ? "w-[250px]   h-[130px]"
                      : "  w-[100px] h-[120px]"
                  }`}
                  src={`${item?.name}`}
                />
              </div>
            );
          }}
          onDragEnd={reorderList}
        />
        <UploadFilesModal
          buttonContext={
            <img className="w-[30px]" src="/upload-svgrepo-com.svg" />
          }
        />
      </div>
    </>
  );
};
