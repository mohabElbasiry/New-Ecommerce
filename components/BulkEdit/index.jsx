import { values } from "lodash";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";

export default function BulkEdit({ data }) {
  return (
    <div className="">
      <div className="my-10 px-2">{" <- ss / yellow / Aluminum "}</div>
      <div className="my-10 px-2 grid gap-10 grid-cols-9">
        <div className="col-span-3 bg-white rounded-lg border-[0.5px] shadow ">
          <div className="flex p-5 gap-5 border-b ">
            <Image src={""} alt="" className="" height={120} width={120} />
            <div className="">
              <div className="flex gap-4 items-center ">
                <div className="text-sm">Name</div>
                <div className="bg-green-400/50 rounded text-sm px-2 py-1">
                  Active
                </div>
              </div>
              <div className="text-gray-600 text-sm">
                {data?.length} variants{" "}
              </div>
            </div>
          </div>
          <div className=" flex flex-col gap-4 p-5">
            <div className="relative">
              <Search className="absolute left-2 top-1/2  -translate-y-1/2" />
              <input className=" border pl-10 h-9 rounded-md " type="text" />
            </div>

            <div className="flex gap-2 items-center">
              <div className="text-sm">Sort by</div>
              <select className="border pl-2 h-9 rounded-md ">
                <option value="">Newest</option>
                <option value="">Oldest</option>
                <option value="">Lowest Price</option>
                <option value="">Highest Price</option>
              </select>
            </div>
          </div>
          <div className="p-5 flex flex-col gap-5 h-full overflow-y-auto max-h-screen">
            {data.map(value=>(<div className="" key={value.id}>
{value.title}
            </div>))}
          </div>
        </div>
        <div className="col-span-6 "></div>
      </div>
    </div>
  );
}
