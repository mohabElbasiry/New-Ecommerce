import { produce } from "immer";
import { baseUrl, token } from "@/lib/baseUrl";

export async function fetchImage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const blob = await response.blob();
    const fileName = url.split("/").pop();
    const file = new File([blob], fileName, { type: blob.type });
    return file;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

export function UploadFileToApi(
  selectedFiles,
  progressBarParent,
  progressBar,
  setUrlsFiles,
  setUrlsFilesSelected
) {
  const headers = token;
  const file = selectedFiles[0];
  const formData = new FormData();
  formData.append("file", file);
  console.log("My FormData FROMEBNTRIE here::", Object.fromEntries(formData));
  progressBarParent.current.style.display = "block";
  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      console.log("percentComplete", percentComplete);
      progressBar.current.style.width = percentComplete + "%";
      if (percentComplete == 100)
        setTimeout(() => {
          progressBarParent.current.style.display = "none";
        }, 2000);
    }
  });
  xhr.upload.addEventListener("load", function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = JSON.parse(xhr.response);
      console.log("response?.fileUrl", response);
      setUrlsFiles(
        produce((prev) => {
          prev.unshift(response);
        })
      );
      setUrlsFilesSelected(
        produce((prev) => {
          prev.unshift(response);
        })
      );
      // Handle the response here (e.g., parse the response JSON and update the UI)
    } else {
      console.error("Error uploading file:", xhr.statusText);
    }
  });
  xhr.open("POST", baseUrl + "upload/file");
  xhr.setRequestHeader("Authorization", headers);
  xhr.send(formData);
}
export async function handleUploadMedia(
  uploadedFiles = [],
  files = [],
  setSelectedFiles = () => {},
  setUrlsFiles = () => {},
  setUrlsFilesSelected = () => {},
  setUploadLength = () => {},
  setOpen = () => {},
  type = ""
) {
  if (uploadedFiles?.length) {
    const formData = new FormData();
    console.log("uploadedFiles", uploadedFiles);
    if (type === "single") {
      formData.append("files", uploadedFiles[0]);
      setOpen(false);
      setUploadLength(1);
    } else {
      uploadedFiles.forEach((file) => {
        formData.append("files", file);
      });
      setUploadLength(uploadedFiles.length);
    } 

    try {
      const res = await fetch(`${baseUrl}/upload/files`, {
        headers: {
          Authorization: token,
        },
        method: "POST",
        body: formData,
      });
      console.log("response of formData after=>> ", formData.get("files"));
      const data = await res.json();
      const resImages = data?.data || [];
      console.log("response of data after=>> ", data);
      if (type === "single") {
        setUrlsFiles(resImages);
        setSelectedFiles(resImages);
        setOpen(false);
      } else {
        setUrlsFiles((prev) => [...resImages, ...prev]);
        setUrlsFilesSelected((prev) => [...resImages, ...prev]);
        setSelectedFiles((prev) => [...resImages, ...prev]);
      }
      setUploadLength(0);
    } catch (er) {
      setUploadLength(0);
      console.log("er", er);
    }
  }
}
export function getAverageColor(imageElement, ratio) {
  const canvas = document.createElement("canvas");

  let height = (canvas.height = imageElement.naturalHeight);
  let width = (canvas.width = imageElement.naturalWidth);

  const context = canvas.getContext("2d");
  context.drawImage(imageElement, 0, 0);

  let data, length;
  let i = -4,
    count = 0;

  try {
    data = context.getImageData(0, 0, width, height);
    length = data.data.length;
  } catch (err) {
    console.error(err);
    return {
      R: 0,
      G: 0,
      B: 0,
    };
  }
  let R, G, B;
  R = G = B = 0;

  while ((i += ratio * 4) < length) {
    ++count;

    R += data.data[i];
    G += data.data[i + 1];
    B += data.data[i + 2];
  }

  R = ~~(R / count);
  G = ~~(G / count);
  B = ~~(B / count);

  return {
    R,
    G,
    B,
  };
}

// useEffect(() => {
//   if(selectedFiles.length > 0) {
//     const image = document.querySelectorAll("img")?.[0]
//     if(image !==null )
//     console.log("getAverageColor",getAverageColor(image, 4))

//   }
// }, [selectedFiles]);
