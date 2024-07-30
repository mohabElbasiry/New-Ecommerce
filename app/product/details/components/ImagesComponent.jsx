import Image from "next/image";
import React, { useState } from "react";
import SliderImages from "./SliderImages";

export default function ImagesComponent({ images }) {
  const [MainImage, setMainImage] = useState("/girl.jpg");
  return (
    <div className="flex gap-5 flex-col w-full p-5">
      <div className="w-full relative aspect-square">
        {MainImage ? (
          <Image
            src={MainImage}
            alt={"main image"}
            className="aspect-square object-contain bg-slate-500 rounded-2xl"
            sizes="50vw"
            fill
          />
        ) : null}
      </div>{" "}
      <SliderImages />
    </div>
  );
}
