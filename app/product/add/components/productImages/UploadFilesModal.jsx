import UploadFile from "@/app/product/components/UploadFile";
import { CustomDialoge } from "@/components/Modal";
import Image from "next/image";
import { memo, useEffect, useState } from "react";
import { UpdateAction } from "../productVariations/RootFunction/middleWare";
import { getOperationClient } from "@/lib/apiUtilsClient";
import { imageBaseUrl } from "@/lib/baseUrl";
import ImageSpinner from "@/components/GlobalUi/ImageSpinner";

function UploadFilesModal({
  buttonContext,
  selectedImages,
  setSubmitedData,
  buttonCss,
}) {
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };
  const [UrlsFiles, setUrlsFiles] = useState([]);
  const [UrlsFilesSelected, setUrlsFilesSelected] = useState([]);
  const [uploadLength, setUploadLength] = useState(0);
  console.log("UrlsFiles after=>> ", UrlsFiles);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const fetchAllFiles = async () => {
      if (open) {
        const data = await getOperationClient(`/upload`, {
          method: "GET",
          headers: {
            token: true,
          },
        });

        if (data?.data?.length) {
          setUrlsFiles(data?.data);
        }
      } else {
        // setUrlsFiles(data?.data || []);
      }
    };
    fetchAllFiles();
    if (open && selectedImages?.length) {
      setUrlsFilesSelected(selectedImages);
    }
  }, [open]);
  const handleSelectImage = (fileUrl) => {
    const existed = UrlsFilesSelected?.find((sel) => sel._id === fileUrl._id);
    !existed
      ? setUrlsFilesSelected((prev) => [fileUrl, ...prev])
      : setUrlsFilesSelected((prev) =>
          prev.filter((url) => url._id != fileUrl._id)
        );
  };
  console.log("UrlsFiles", UrlsFiles);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className={`border w-[30px border-[#eee] rounded-lg  font-medium  cursor-pointer flex items-center justify-center size-5     p-3 ${buttonCss}`}
      >
        {buttonContext}
      </button>
      <CustomDialoge open={open} setOpen={setOpen}>
        <div className="bg-[white] shadow-2xl h-[75vh] w-[75vw]  ">
          <div className="flex-1 flex flex-col justify-center">
            {" "}
            <UploadFile
              setUrlsFiles={setUrlsFiles}
              setUrlsFilesSelected={setUrlsFilesSelected}
              setUploadLength={setUploadLength}
              setSubmitedData={setSubmitedData}
            />
            <div className="mt-4 2xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 grid gap-4 h-[47vh] overflow-y-scroll scrollbar-styling">
              {uploadLength > 0
                ? [...Array(uploadLength)].map(() => <ImageSpinner />)
                : null}
              {UrlsFiles.map((fileUrl, index) => (
                <div
                  className="bg-transparent [&:hover>div]:bg-[#F1F1F1] "
                  key={index}
                >
                  <div
                    key={index}
                    className="relative rounded-2xl aspect-square  cursor-pointer  h-[150px] w-[150px] !p-5 !flex !items-center !justify-center mx-auto"
                    onClick={() => handleSelectImage(fileUrl)}
                  >
                    <input
                      className="absolute top-2 left-3 z-10 cursor-pointer"
                      type="checkbox"
                      checked={
                        UrlsFilesSelected?.find(
                          (sel) => sel._id === fileUrl._id
                        )
                          ? true
                          : false
                      }
                    />
                    <Image
                      fill
                      src={`${imageBaseUrl}/${fileUrl.filename}`}
                      alt={fileUrl.filename}
                      className="object-contain object-center !w-[80%] !h-[80%] mt-[10%] mx-auto border-3 border-[gray] rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end items-center gap-5 absolute bottom-0 border-t shadow-2xl p-3 left-1/2 w-[98%] -translate-x-1/2">
            <button
              onClick={() => {
                setOpen(!open);
              }}
              className=" text-white font-medium bg-gray-800 text-sm py-2 px-3 rounded-md focus:outline-none hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              className="text-white font-medium bg-blue-500 text-sm py-2 px-3 rounded-md focus:outline-none hover:bg-blue-400"
              onClick={() => {
                const selectdItems = UrlsFilesSelected.map((item, idx) => ({
                  ...item,
                  idx,
                  order: idx,
                }));
                handleAction({
                  type: "UpdatePropertyByNameAndValue",
                  payload: { name: "images", value: selectdItems },
                  target: "productDetails",
                });
                setOpen(!open);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </CustomDialoge>{" "}
    </>
  );
}
export default memo(UploadFilesModal);
