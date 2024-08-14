import UploadFilesModal from "@/app/product/add/components/productImages/UploadFilesModal";
import UploadFile from "@/app/product/components/UploadFile";
import UploadedSingleImage from "./uploadedSingleImage/Index";
import { useEffect } from "react";

export default function MediaUploader({
  type,
  notURL = false,
  sortedList = [],
  selectedImages = [],
  urlsFiles = [],
  setUrlsFiles = () => {},
  setUrlsFilesSelected = () => {},
  setSubmitedData = () => {},
  setUploadLength = () => {},
  handleSetImages = () => {},
}) {
  console.log(".....selectedImages.....", selectedImages);
  console.log(".....urlsFiles.....", urlsFiles);
  console.log(".....sortedList.....", sortedList);
  useEffect(() => {
    if (type === "multi" && urlsFiles?.length) {
      handleSetImages(urlsFiles);
    }
  }, [urlsFiles?.length, type]);

  return (
    <>
      {type === "single" ? (
        urlsFiles?.length ? (
          <UploadedSingleImage
            urlsFiles={urlsFiles}
            setUrlsFiles={setUrlsFiles}
            setUrlsFilesSelected={setUrlsFilesSelected}
            setUploadLength={setUploadLength}
          />
        ) : (
          <UploadFile
            notURL={notURL}
            type={type}
            setUrlsFiles={setUrlsFiles}
            setUrlsFilesSelected={setUrlsFilesSelected}
            setUploadLength={setUploadLength}
          />
        )
      ) : null}
      {type === "multi" ? (
        !urlsFiles?.length ? (
          <UploadFile
            notURL={notURL}
            type={type}
            setUrlsFiles={setUrlsFiles}
            setUrlsFilesSelected={setUrlsFilesSelected}
            setUploadLength={setUploadLength}
          />
        ) : (
          <UploadFilesModal
            notURL={notURL}
            buttonContext={<img className="" src="/upload-svgrepo-com.svg" />}
            buttonCss={"w-[100px] h-[124px]"}
            selectedImages={sortedList}
          />
        )
      ) : null}
    </>
  );
}
