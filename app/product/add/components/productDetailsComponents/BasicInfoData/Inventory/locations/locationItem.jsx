import { CheckboxD } from "@/components/GlobalUi/checkbox"
import { InputWithLabelComponent } from "@/components/inputcomponent"

export const LocationItem=({trackQuantity,edit})=>{




    return(<>
    
    <li className="list-none flex items-center justify-between">

        <div className="flex items-center gap-1">

        {
            edit?
                 <CheckboxD/>
             :null
        }
        <p className="p-0  m-0">
            location name
        </p>

        </div>

        {
            trackQuantity?   <InputWithLabelComponent
            defaultValue={''}
            Input
            PlaceHolder="0"
            inputType="number"
                inputCss="!w-[100px] flex items-center 
                text-center"
            />:"Not Tracked"
        }
        
     

    </li>
    </>)
}