import { memo } from "react";
import { DragableImagesBox } from "./dragableImages";

function ProductImages({ images, setSubmitedData }) {
  return (
    <DragableImagesBox images={images} setSubmitedData={setSubmitedData} />
  );
}
export default memo(ProductImages);
