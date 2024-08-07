import { ListManager } from "react-beautiful-dnd-grid";
import { produce } from "immer";
import UploadFilesModal from "../UploadFilesModal";
import { imageBaseUrl } from "@/lib/apiUtils";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";

export const DragableImagesBox = ({ images: sortedList, setSubmitedData }) => {
  function sortListArr(list) {
    return list.slice().sort((first, second) => first.order - second.order);
  }
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };
  const sortList = (list) => {
    const sortedImages = sortListArr(list).map((item, idx) => ({
      ...item,
      idx,
    }));
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: { name: "images", value: sortedImages },
      target: "productDetails",
    });
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

  return (
    <div className="App flex flex-wrap gap-4">
      <ListManager
        items={sortedList}
        direction="horizontal"
        maxItems={4}
        className="dragable"
        render={(item, idx) => {
          return (
            <div>
              <img
                className={`border m-1  overflow-hidden object-cover  ${
                  item?.idx == 0
                    ? "w-[250px]   h-[130px]"
                    : "  w-[100px] h-[120px]"
                }`}
                src={`${imageBaseUrl}/${item.filename}`}
              />
            </div>
          );
        }}
        onDragEnd={reorderList}
      />
      <div>
        <UploadFilesModal
          buttonContext={<img className=" " src="/upload-svgrepo-com.svg" />}
          buttonCss={"w-[100px] h-[124px]"}
          selectedImages={sortedList}
          setSubmitedData={setSubmitedData}
        />
      </div>
    </div>
  );
};
