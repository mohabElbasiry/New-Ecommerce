import { Checkbox } from "@headlessui/react"
import { LocationItem } from "./locationItem"
import { useState } from "react"

export const LocationsContainer=({trackQuantity})=>{
const [edit,setEdit]=useState(false)
return(<>
<div className="header flex items-center justify-between  border-b pb-2 border-b-1">
<p>Quantity</p>

<button  type="button" onClick={()=>setEdit(!edit)}>
    Edit Locations
</button>
</div>
{
    Array.from({length:5}).map(item=>{
        return <LocationItem trackQuantity={trackQuantity} edit={edit}/>
    })
}
   


  {
    edit? <div className="footer flex items-center justify-end gap-10 px-3 border-y border-b-[#eee]  p-2 ">
    <button type="button">
        discard
    </button>
    <button type="button" className="bg-[#000000] text-white  p-[3px] px-3 rounded-md">
        save
    </button>
   </div>:null
  }
    </>)
}