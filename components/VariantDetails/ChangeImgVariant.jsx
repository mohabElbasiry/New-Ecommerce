import React, { useState } from "react";

import Image from "next/image";
import { CustomDialoge } from "../Modal";

export default function ChangeImgVariant() {
    const [open, setOpen] = useState(false);
  return (
    <>
      <CustomDialoge open={open} setOpen={setOpen} >
      {/* <div className="relative w-fit cursor-pointer">
      <input
        type="file"
        className="opacity-0 absolute top-0 left-0 z-[3] w-full h-full"
        multiple
        onChange={(e) => setFIleUploads(e, item?.itemIndex)}
        onClick={e=>e.stopPropagation()}
      />
      <button>
        {item?.image?.length ? (
          <div className="flex gap-2">
           
                  <img
                    className="W-[30px] h-[30px] cursor-pointer"
                    src={URL.createObjectURL(image)}
                    key={idx}
                  />
          </div>
        ) : (
          <img
            className="W-[30px] h-[30px] cursor-pointer"
            src={"/addImage.svg"}
          />
        )}
      </button>
    </div>     */}
      </CustomDialoge>
      <div className=" flex  flex-col w-auto justify-center gap-3" onClick={()=>setOpen(true)}>
        <Image
          src={"/girl.jpg"}
          alt=""
          className="object-contain aspect-square object-top rounded-lg w-24  h-24  border"
          height={120}
          width={120}
        />
        <span className="text-center text-blue-500">Change</span>
      </div>
    </>
  );
}
