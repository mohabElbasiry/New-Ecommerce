"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export default function Paginator({ paginagtionOptions, lang }) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();
  const setPageinateReuslt = (pageNumber) => {
    params.set("page", `${pageNumber}`);
    params.set("limit", `${paginagtionOptions.limit}`);
    replace(`${pathname}?${params.toString()}`);
  };
  console.log(paginagtionOptions?.totalPages,'adsds');
  // if(paginagtionOptions?.totalPages<=1){
  //   return<></>
  // }
  return (
    <Suspense> 
      <div className="flex justify-center py-4">
        <div className="flex items-center gap-5">
          <button
            // disabled={Number(params.get("page")) === 1 || !params.get("page")}
            disabled={!paginagtionOptions.hasPrev}
            className="text-dark flex items-center text-sm  hover:bg-gray-100  font-bold py-2 px-4 rounded"
            onClick={() => {
              setPageinateReuslt(eval(`${params.get("page")} - 1`));
            }}
          >
            <ChevronLeft
              className={`${lang === "ar" ? "rotate-180" : "rotate-0"}`}
            />
            <span>{lang === "en" ? "Previews" : "السابق"}</span>
          </button>
          <div
            className="flex items-ceneter gap-2 "
            dir={lang === "en" ? "ltr" : "rtl"}
          >
            {[...Array(paginagtionOptions?.totalPages || 1)].map((_, idx) => (
              <button
                key={idx}
                disabled={
                  !paginagtionOptions?.hasNext && !paginagtionOptions?.hasPrev
                }
                className={`border border-[#ddd] py-2 px-4  ${
                  params.get("page") === String(idx + 1) ||
                  (!params.get("page") && idx === 0)
                    ? "border-main"
                    : undefined
                } `}
                onClick={() => {
                  setPageinateReuslt(idx + 1);
                }}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            // disabled={
            //   Number(params.get("page")) == paginagtionOptions?.totalPages
            // }
            disabled={!paginagtionOptions.hasNext}
            className={`text-dark flex items-center text-sm hover:bg-gray-100 font-bold py-2 px-4 rounded `}
            onClick={() => {
              if (!params.get("page")) {
                return setPageinateReuslt(2);
              }
              setPageinateReuslt(eval(`${params.get("page")} + 1`));
            }}
          >
            <span>{lang === "en" ? "Next" : "القادم"}</span>
            <ChevronRight
              className={`${lang === "ar" ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>
      </div>
    </Suspense>
  );
}
