import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const TableOptions = ({
  navigations,
  data,
  itemId,
  setCheckedItems,
  checkedItems,
  filterProperties,
}) => {
  const [isSearch,setIsSearch] = useState(false)
  const searchParmas = useSearchParams();
  const params = new URLSearchParams(searchParmas)
  const paramsKeys = Object.keys(Object.fromEntries(params));
  const pathname = usePathname()
  const router= useRouter()
  const handleFilter = (param) => { 
   if (param === 'all' ) { 
      paramsKeys.forEach((key) => { 
        params.delete(key)
      })
      router.replace(pathname +  params.toString())
      console.log('paramsKeys',paramsKeys)
   } else {}
  }
  
  return (
    <div className={`flex items-center ${!filterProperties?.filters ? "justify-end" : "justify-between" } gap-4 bg-white px-3 !py-3`} >
      {/* <Link href={navigations.add(itemId)} className="inline mx-3">
        <Plus className="inline" />
      </Link> */}
      {!isSearch ?  (
        <>
        {filterProperties?.filters ? (

          <div className="flex items-center gap-2" >
          <button  
            onClick={()=> handleFilter('all') }
          className={`text-[#7E7E7E] text-sm p-2 rounded-lg ${!paramsKeys?.length ? 'bg-[#E6E6E6]' : ''}  hover:bg-[#E6E6E6] `} >All </button>

          {[...Array(3)].map((_,idx) => ( 
            <button className="text-[#7E7E7E] text-sm p-2 rounded-lg hover:bg-[#E6E6E6] " >Filter{idx + 1} </button>
          ) )}
        </div>
        ) : null }
        {filterProperties?.search ? (

          <button onClick = {() => setIsSearch(true) } className=" p-2 rounded-lg" >
        <Search className = "text-[#7E7E7E]" size={20} />
        </button>
        ) : null }
        </>
      ) : 
      <>
        <div className="w-full" >
          <div className="flex items-center rounded-lg px-2 gap-2 bg-[#EDEDED] ">
          <Search className = "text-[#7E7E7E]" size={20} />

          <input className="outline-none p-2 w-full bg-transparent border-l border-l-[#D4D4D4] px-4 " />
          </div>
        </div>
        <button onClick = {() => setIsSearch(false) } className=" p-2 rounded-lg bg-[#EDEDED] text-[#7E7E7E]" >
          Cancel
        </button>
      </>
      
      }
     
      {data.enableSelect && checkedItems?.length ? (
        <button
          onClick={() => setCheckedItems([])}
          className="bg-[#C75050] text-white py-1 px-2 rounded-xl text-sm"
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};
