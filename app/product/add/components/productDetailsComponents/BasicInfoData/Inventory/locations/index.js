import { Checkbox } from "@headlessui/react"
import { LocationItem } from "./locationItem"

export const LocationsContainer=()=>{



    return(<>
 

<div className="header flex items-center justify-between  border-b pb-2 border-b-1">
<p>Quantity</p>

<button  type="button">
    Edit Locations
</button>
</div>
    <LocationItem/>
    </>)
}