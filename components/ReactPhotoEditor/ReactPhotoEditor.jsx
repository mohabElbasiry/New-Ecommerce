import { useCallback, useEffect, useRef, useState} from "react";
import SlideImages from "./SlideImages";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./functions/canvasPreview";
import { useDebounceEffect } from "./functions/useDebounceEffect";
const modalHeaderButtonClasses =
  "text-gray-900 bg-white border border-gray-300 ml-2 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-2 py-1 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700";
export const ReactPhotoEditor = ({
  file,
  onSaveImage,
  allowColorEditing = true,
  allowFlip = true,
  allowRotate = true,
  allowZoom = true,
  downloadOnSave,
  open,
  onClose,
  selectedFiles,
 
}) => {

  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [PrimaryFile, setPrimaryFile] = useState(file);
  const [imageSrc, setImageSrc] = useState("");
  const [imageName, setImageName] = useState("");
  const [brightnessValue, setBrightnessValue] = useState(100);
  const [contrastValue, setContrastValue] = useState(100);
  const [saturateValue, setSaturateValue] = useState(100);
  const [grayscaleValue, setGrayscaleValue] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [flipHorizontal, setFlipHorizontal] = useState(false);
  const [flipVertical, setFlipVertical] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [crop, setCrop] = useState();
  const [cropCustom, setCropCustom] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [completedCrop, setCompletedCrop] = useState();
  const [panStart, setPanStart] = useState(null);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const blobUrlRef = useRef("");
  const handlePointerDown = (event) => {
    setIsDragging(true);
    const initialX = event.clientX - (flipHorizontal ? -offsetX : offsetX);
    const initialY = event.clientY - (flipVertical ? -offsetY : offsetY);
    setPanStart({ x: initialX, y: initialY });
  };

  const handlePointerMove = (event) => {
    if (isDragging) {
      event.preventDefault();

      const offsetXDelta = event.clientX - panStart?.x;
      const offsetYDelta = event.clientY - panStart?.y;

      setOffsetX(flipHorizontal ? -offsetXDelta : offsetXDelta);
      setOffsetY(flipVertical ? -offsetYDelta : offsetYDelta);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (event) => {
    if (event.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  useEffect(() => {
    if (PrimaryFile) {
      const fileSrc = URL.createObjectURL(PrimaryFile);
      setImageSrc(fileSrc);
      setImageName(PrimaryFile.name);
      return () => {
        URL.revokeObjectURL(fileSrc);
      };
    }
  }, [file,PrimaryFile, open]);

  useEffect(() => {
    applyFilter();
    
  }, [
    file,PrimaryFile,
    imageSrc,
    rotate,
    flipHorizontal,
    flipVertical,
    zoom,
    brightnessValue,
    contrastValue,
    saturateValue,
    grayscaleValue,
    offsetX,
    offsetY,
  ]);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );

 
  const applyFilter = () => {
  	const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');
		const image = new Image();
		image.src = imageSrc;
		image.onload = () => {
			if (canvas && context) {
				const zoomedWidth = image.width * zoom;
				const zoomedHeight = image.height * zoom;
				const translateX = (image.width - zoomedWidth) / 2;
				const translateY = (image.height - zoomedHeight) / 2;
				canvas.width = image.width;
				canvas.height = image.height;
				context.filter = getFilterString();
				context.save();
				if (rotate) {
					const centerX = canvas.width / 2;
					const centerY = canvas.height / 2;
					context.translate(centerX, centerY);
					context.rotate((rotate * Math.PI) / 180);
					context.translate(-centerX, -centerY);
				}
				if (flipHorizontal) {
					context.translate(canvas.width, 0);
					context.scale(-1, 1);
				}
				if (flipVertical) {
					context.translate(0, canvas.height);
					context.scale(1, -1);
				}
				context.translate(translateX, translateY);

				context.translate(offsetX, offsetY);

				context.scale(zoom, zoom);
				context.drawImage(image, 0, 0, canvas.width, canvas.height);

				context.restore();
			}
    }
  };
  const getFilterString = () => {
    return `brightness(${brightnessValue}%) contrast(${contrastValue}%) grayscale(${grayscaleValue}%) saturate(${saturateValue}%)`;
  };

  const handleInputChange = (event, setValue, min, max) => {
    const value = parseInt(event.target?.value);
    if (!isNaN(value) && value >= min && value <= max) {
      setValue(value);
    }
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => prevZoom + 0.1);
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.1, 0.1));
  };

  const renderInputs = [
    {
      name: "rotate",
      value: rotate,
      setValue: setRotate,
      min: -180,
      max: 180,
      type: "range",
      id: "rotateInput",
      "aria-labelledby": "rotateInputLabel",
      hide: !allowRotate,
    },
    {
      name: "brightness",
      value: brightnessValue,
      setValue: setBrightnessValue,
      min: 0,
      max: 200,
      type: "range",
      id: "brightnessInput",
      "aria-labelledby": "brightnessInputLabel",
      hide: !allowColorEditing,
    },
    {
      name: "contrast",
      value: contrastValue,
      setValue: setContrastValue,
      min: 0,
      max: 200,
      type: "range",
      id: "contrastInput",
      "aria-labelledby": "contrastInputLabel",
      hide: !allowColorEditing,
    },
    {
      name: "saturate",
      value: saturateValue,
      setValue: setSaturateValue,
      min: 0,
      max: 200,
      type: "range",
      id: "saturateInput",
      "aria-labelledby": "saturateInputLabel",
      hide: !allowColorEditing,
    },
    {
      name: "grayscale",
      value: grayscaleValue,
      setValue: setGrayscaleValue,
      min: 0,
      max: 100,
      type: "range",
      id: "grayscaleInput",
      "aria-labelledby": "grayscaleInputLabel",
      hide: !allowColorEditing,
    },
  ];

  const resetImage = () => {
    setBrightnessValue(100);
    setContrastValue(100);
    setSaturateValue(100);
    setGrayscaleValue(0);
    setRotate(0);
    setFlipHorizontal(false);
    setFlipVertical(false);
    setZoom(1);
    setOffsetX(0);
    setOffsetY(0);
    setPanStart(null);
    setIsDragging(false);
  };
  async function onDownloadCropClick() {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error("Crop canvas does not exist");
    }
  
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
  
    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    );
    const ctx = offscreen.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }
  
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      offscreen.width,
      offscreen.height
    );
  
    const blob = await offscreen.convertToBlob({ type: "image/png" });
  
    const fileName = "cropped-image.png";
    const file = new File([blob], fileName, { type: "image/png" });
  
    setPrimaryFile(file);
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }
    blobUrlRef.current = URL.createObjectURL(file);

  }

  const saveImage = useCallback(() => {
    const canvas =cropCustom&&completedCrop?previewCanvasRef.current: canvasRef.current
    if (canvas) {
      canvas.toBlob((blob) => {
     
        if (blob) {
          const editedFile = new File([blob], imageName, { type: blob.type });
          if (downloadOnSave) { 
            const objectUrl = URL.createObjectURL(blob);
            const linkElement = document.createElement("a");
            linkElement.download = `${imageName}`;
            linkElement.href = objectUrl;
            linkElement.click();
            URL.revokeObjectURL(objectUrl);
          }
        
          onSaveImage(editedFile);
          if (onClose) {
            onClose();
          }
        }
        resetImage();
      });
    }
  },[previewCanvasRef.current, canvasRef.current,cropCustom,completedCrop]);

  const closeEditor = () => {
    resetImage();
    if (onClose) {
      onClose();
    }
  };
  return (
    <>
      {open && (
        <>
          <div
            data-testid="photo-editor-main"
            className=" justify-center items-center flex overflow-auto fixed inset-0 z-50"
          >
            <div className="relative overflow-auto rounded-lg shadow-lg  w-[100%] bg-white  p-5 h-full dark:bg-[#202020]">
              <div className="flex justify-end p-2 rounded-t">
                <button
                  className={modalHeaderButtonClasses}
                  onClick={closeEditor}
                >
                  Close
                </button>
                <button
                  className={modalHeaderButtonClasses}
                  onClick={() => saveImage()}
                  data-testid="save-button"
                >
                  Save
                </button>
                {cropCustom&&completedCrop? (
                  <>
                    <div>
                      <canvas
                        ref={previewCanvasRef}
                        style={{
                          border: "1px solid black",
                          objectFit: "contain",
                          width: completedCrop.width,
                          height: completedCrop.height,
                        }}
                        className="hidden"
                      />
                    </div>
                    <div></div>
                    <button onClick={onDownloadCropClick}    className={modalHeaderButtonClasses}>corp</button>
                  </>
                ):null}
              </div>

              <div className="relative !flex  flex-wrap w-full lg:h-[75%] h-full p-5 gap-10">
                <div className="relative flex-[2_2_0%]   max-h-full bg-[#fafafa]  shadow rounded-xl flex justify-center items-center p-5   ">
                  {cropCustom ? (
                    <ReactCrop
                      crop={crop}
                      onChange={(_, percentCrop) => setCrop(percentCrop)}
                      onComplete={(c) => setCompletedCrop(c)}
                      // aspect={1}
                      // minWidth={400}
                      // minHeight={100}
                      className={` relative max-w-full w-auto h-full  max-h-full  rounded-2xl border-4  aspect-square border-dashed  z-10`}
                      // circularCrop
                    >
                      <img
                        ref={imgRef}
                        alt="Crop me"
                        src={imageSrc}
                        className={`max-w-full h-auto  max-h-full w-auto min-h-full  object-contain object-center z-10  `}
                      />
                    </ReactCrop>
                  ) : (
                    <canvas
                      id="canvas"
                      ref={canvasRef}
                      className={`canvas  max-w-full w-auto h-full    rounded-2xl border-4   border-dashed aspect-square object-contain object-center z-10  ${
                        isDragging ? "cursor-grabbing" : "cursor-grab"
                      }`}
                      data-testid="image-editor-canvas"
                      onPointerDown={handlePointerDown}
                      onPointerMove={handlePointerMove}
                      onPointerUp={handlePointerUp}
                      onPointerLeave={handlePointerUp}
                      onWheel={handleWheel}
                      width={completedCrop?completedCrop.width:1000}
                      height={completedCrop?completedCrop.height:600}

                      //   style={{ border: "1px solid black" }}
                    />
                  )}
                </div>
                <div className="relative  h-full  flex-1  flex flex-col gap-5 lg:flex-row ">
                  <div className="relative items-center flex p-3 flex-col border bg-[#fafafa]  gap-5 justify-around  rounded-2xl">
                    {renderInputs.map(
                      (input) =>
                        !input.hide && (
                          <div
                            key={input.name}
                            className="flex flex-row items-center w-full "
                          >
                            <label
                              id={`${input.name}InputLabel`}
                              className="text-xs font-medium text-gray-900 dark:text-white w-10"
                            >
                              {`${input.name[0].toUpperCase()}${input.name.slice(
                                1
                              )}:`}
                            </label>
                            <input
                              id={input.id}
                              aria-labelledby={input["aria-labelledby"]}
                              type={input.type}
                              value={input.value}
                              step="1"
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  input.setValue,
                                  input.min,
                                  input.max
                                )
                              }
                              min={input.min}
                              max={input.max}
                              className="ml-[1.7rem] w-full flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700"
                            />

                            <input
                              type="number"
                              aria-labelledby={input["aria-labelledby"]}
                              value={input.value}
                              onChange={(e) =>
                                handleInputChange(
                                  e,
                                  input.setValue,
                                  input.min,
                                  input.max
                                )
                              }
                              min={input.min}
                              max={input.max}
                              className="w-14 ml-2 rounded-md text-right bg-gray-100 text-black dark:bg-gray-700 dark:text-white"
                            />
                          </div>
                        )
                    )}
                  </div>
                  <div className="relative w-auto px-2 border bg-[#fafafa]  rounded-2xl">
                    <div className="flex items-center flex-col justify-around  divide-x   divide-y   h-full py-12">
                      <button
                        title="Reset photo"
                        className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                        onClick={resetImage}
                        aria-label="Reset photo"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-rotate-ccw dark:stroke-slate-200"
                        >
                          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                          <path d="M3 3v5h5" />
                        </svg>
                      </button>
                      {allowFlip && (
                        <>
                          <button
                            className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                            onClick={() => setFlipHorizontal(!flipHorizontal)}
                            title="Flip photo horizontally"
                            aria-label="Flip photo horizontally"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-flip-horizontal dark:stroke-slate-200"
                            >
                              <path d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3" />
                              <path d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3" />
                              <path d="M12 20v2" />
                              <path d="M12 14v2" />
                              <path d="M12 8v2" />
                              <path d="M12 2v2" />
                            </svg>
                          </button>
                          <button
                            className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                            onClick={() => setFlipVertical(!flipVertical)}
                            title="Flip photo vertically"
                            aria-label="Flip photo vertically"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-flip-vertical dark:stroke-slate-200"
                            >
                              <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3" />
                              <path d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3" />
                              <path d="M4 12H2" />
                              <path d="M10 12H8" />
                              <path d="M16 12h-2" />
                              <path d="M22 12h-2" />
                            </svg>
                          </button>
                        </>
                      )}
                      {allowZoom && (
                        <>
                          <button
                            data-testid="zoom-in"
                            className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                            onClick={handleZoomIn}
                            title="Zoom in"
                            aria-label="Zoom in"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-zoom-in dark:stroke-slate-200"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" x2="16.65" y1="21" y2="16.65" />
                              <line x1="11" x2="11" y1="8" y2="14" />
                              <line x1="8" x2="14" y1="11" y2="11" />
                            </svg>
                          </button>
                          <button
                            data-testid="zoom-out"
                            className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                            onClick={handleZoomOut}
                            title="Zoom out"
                            aria-label="Zoom out"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="lucide lucide-zoom-out dark:stroke-slate-200"
                            >
                              <circle cx="11" cy="11" r="8" />
                              <line x1="21" x2="16.65" y1="21" y2="16.65" />
                              <line x1="8" x2="14" y1="11" y2="11" />
                            </svg>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setCropCustom((prev) => !prev)}
                        className=" focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-700 rounded-md p-3 bg-white border"
                      >
                        crop
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <SlideImages
                selectedFiles={selectedFiles}
                setFileData={setPrimaryFile}
              />
            </div>
          </div>

          <div className="opacity-75 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </>
  );
};
