import { produce } from "immer";

const baseUrl ="http://localhost:3001/api/v1/"
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTYzYzdiYzg2MjI2MjU1M2JkYjYwNyIsImNyZWF0ZWRBdCI6MTcyMTEyMTkxNTkwNSwiaWF0IjoxNzIxMTIxOTE1LCJleHAiOjE3Mjg4OTc5MTV9.E4-W-T_Dyyyyh9kX7eaSn5QhUtxmy4ZmF3ZAeaRlFeo";


export async function fetchImage(url) {
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const fileName = url.split('/').pop();
      const file = new File([blob], fileName, { type: blob.type });
      return file;
  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      return null;
  }
}



export function UploadFileToApi(selectedFiles,progressBarParent,progressBar,setUrlsFiles) {
  
 const headers = `Bearer ${token}`;
  const file = selectedFiles[0];
  const formData = new FormData();
  formData.append("file", file);
  progressBarParent.current.style.display = "block"; 
  const xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", function (e) {
    if (e.lengthComputable) {
      const percentComplete = (e.loaded / e.total) * 100;
      console.log("percentComplete", percentComplete);
      progressBar.current.style.width = percentComplete + "%";
      if(percentComplete==100) setTimeout(() => {
        progressBarParent.current.style.display = "none"; 
      }, 2000);
    }
  });
  xhr.addEventListener("load", function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response=JSON.parse(xhr.response);
      setUrlsFiles(produce((prev)=>{
        prev.push(response?.fileUrl)
      }))
      // Handle the response here (e.g., parse the response JSON and update the UI)
    } else {
      console.error("Error uploading file:", xhr.statusText);
    }
  });
  xhr.open("POST", baseUrl +"upload/file");
  xhr.setRequestHeader("Authorization", headers);
  xhr.send(formData);

  
}

  export function getAverageColor(imageElement, ratio) {
    const canvas = document.createElement("canvas")

    let height = canvas.height = imageElement.naturalHeight
    let width = canvas.width = imageElement.naturalWidth

    const context = canvas.getContext("2d")
    context.drawImage(imageElement, 0, 0)

    let data, length
    let i = -4,
        count = 0

    try {
        data = context.getImageData(0, 0, width, height)
        length = data.data.length
    } catch (err) {
        console.error(err)
        return {
            R: 0,
            G: 0,
            B: 0
        }
    }
    let R, G, B
    R = G = B = 0

    while ((i += ratio * 4) < length) {
        ++count

        R += data.data[i]
        G += data.data[i + 1]
        B += data.data[i + 2]
    }

    R = ~~(R / count)
    G = ~~(G / count)
    B = ~~(B / count)

    return {
        R,
        G,
        B
    }
}
 

  // useEffect(() => {
  //   if(selectedFiles.length > 0) {
  //     const image = document.querySelectorAll("img")?.[0]
  //     if(image !==null )
  //     console.log("getAverageColor",getAverageColor(image, 4))
     
  //   }
  // }, [selectedFiles]);