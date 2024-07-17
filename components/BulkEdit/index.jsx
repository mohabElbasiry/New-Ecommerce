import Image from "next/image";
import React from "react";

export default function BulkEdit({ data }) {
  return (
    <div className="">
      <div className="my-10 px-2">{" <- ss / yellow / Aluminum "}</div>
      <div className="my-10 px-2 grid gap-10 grid-cols-9">
        <div className="col-span-3 bg-white rounded-lg border-[0.5px] shadow ">
          <div className="flex p-5 gap-5">
            <Image src={""} alt="" className="" height={120} width={120} />
            <div className="">
              <div className="flex gap-4 items-center ">
                <div className="text-sm">Name</div>
                <div className="bg-green-400/50 rounded text-sm px-2 py-1">
                  Active
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                        {data?.length} variants  </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 "></div>
      </div>
    </div>
  );
}
