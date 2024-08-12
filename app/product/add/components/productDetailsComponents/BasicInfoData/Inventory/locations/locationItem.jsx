import { InputWithLabelComponent } from "@/components/inputcomponent"

export const LocationItem=()=>{




    return(<>
    
    <li className="list-none flex items-center justify-between">
        <p>
            location Name
        </p>

        <InputWithLabelComponent
        defaultValue={''}
        Input
        PlaceHolder="0"
        inputType="number"
            inputCss="!w-[100px] flex items-center 
            text-center"
        />

    </li>
    </>)
}