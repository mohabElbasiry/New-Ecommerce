import UploadFilesModal from "@/app/product/add/components/productImages/UploadFilesModal";
import UploadFile from "@/app/product/components/UploadFile";
import UploadedSingleImage from "./UploadedSingleImage";

export default function MediaUploader({
  type,
  notURL = false,
  sortedList = [],
  urlsFiles = [],
  setUrlsFiles = () => {},
  setUrlsFilesSelected = () => {},
  setSubmitedData = () => {},
  setUploadLength = () => {},
}) {
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
        urlsFiles.length === 0 ? (
          <UploadFile
            notURL={notURL}
            setUrlsFiles={setUrlsFiles}
            setUrlsFilesSelected={setUrlsFilesSelected}
            setUploadLength={setUploadLength}
            setSubmitedData={setSubmitedData}
            type={type}
          />
        ) : (
          <UploadFilesModal
            notURL={notURL}
            buttonContext={<img className="" src="/upload-svgrepo-com.svg" />}
            buttonCss={"w-[100px] h-[124px]"}
            selectedImages={sortedList}
            setSubmitedData={setSubmitedData}
          />
        )
      ) : null}
    </>
  );
}
