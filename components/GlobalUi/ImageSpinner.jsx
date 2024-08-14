import React from "react";

export default function ImageSpinner() {
  return (
    <div className="h-[180px]  flex items-center justify-center ">
      <div className="w-3/4 h-3/4 flex items-center justify-center border rounded-2xl">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-black"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
}
