const baseUrl ="http://localhost:3001/api/v1/"
export const uploadingAssets = async (endpoint, uploadedFile) => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjY3MDE4ODBkZjljOWRlMTFiOTVlN2QiLCJpYXQiOjE3MjA2MDEyMTQsImV4cCI6MTcyODM3NzIxNH0.xf-eqiVNwZbz38l9JMdscfG5ec9BoLHgJMyQA577WbI"
    const formData = new FormData();
    formData.append("files", uploadedFile);
    try {
      const response = await fetch(baseUrl + endpoint, {
        method: "POST",
        headers: {
          // Cookie: `session=${session}; session.sig=${sessionSig}`,`
          Authorization: `Bearer ${token}`,
        },
  
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
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
  // useEffect(()=>{

  //   const image = document.querySelector("#i img")
  // // const image_2 = document.querySelector("#i2 img")
  
  // if(image !==null ){
  //   image.crossOrigin = "Anonymous";

  //   image.onload = () => {
  //     const { R, G, B } = getAverageColor(image, 4)
  //     console.log(getAverageColor(image, 4))
    
  //       document.querySelector(".dasda").style.background  = `linear-gradient(to left, rgb(${R}, ${G},${B}), #fff)  `
  //       // document.querySelector(".myof").style.background  = `linear-gradient(to left, rgb(${R}, ${G},${B}), #fff)  `
  //       // document.querySelector("#i").style['box-shadow'] = `rgb(${R}, ${G},${B}) 0px 8px 24px;`
  //   }

  
  // }


  // },[image])
