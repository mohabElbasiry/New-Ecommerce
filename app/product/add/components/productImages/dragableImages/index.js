import UploadFilesModal from "../UploadFilesModal";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
import { imageBaseUrl } from "@/lib/baseUrl";
import DragAndDropElelements from "@/components/GlobalUi/DragAndDropElements";
import SortableItem from "./sortable";
import { produce } from "immer";
import { arrayMove } from "@dnd-kit/sortable";
import MediaUploader from "@/components/MediaUploader/Index";
export const DragableImagesBox = ({ images: sortedList, setSubmitedData }) => {
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setSubmitedData((prevItems) =>
        produce(prevItems, (draft) => {
          const images = prevItems.productDetails.images;
          const oldIndex = images.findIndex(
            (item) => item.filename === active.id
          );
          const newIndex = images.findIndex(
            (item) => item.filename === over.id
          );
          draft.productDetails.images = arrayMove(images, oldIndex, newIndex);
        })
      );
    }
  };
  return (
    <div className="App flex flex-wrap gap-4">
      <DragAndDropElelements
        items={sortedList?.map((item) => item?.filename)}
        handleDragEnd={handleDragEnd}
        className="flex items-center  relative"
      >
        <>
          {sortedList.map((item, idx) => {
            return (
              <SortableItem
                key={item?.filename}
                customcss={
                  "absolute  z-2  bg-[#eee] w-[30px] top-1 h-fit  rounded-md right-1"
                }
                id={item?.filename}
                edit={false}
              >
                <img
                  src={item.fileUrl}
                  className={`  rounded-md ${
                    idx === 0 ? "w-[200px] h-[200px]" : "w-[130px] !h-[120px]  "
                  }`}
                />
              </SortableItem>
            );
          })}
        </>
      </DragAndDropElelements>
      <div>
        <MediaUploader
          type="multi"
          selectedImages={sortedList}
          setSubmitedData={setSubmitedData}
        />
      </div>
    </div>
  );
};
