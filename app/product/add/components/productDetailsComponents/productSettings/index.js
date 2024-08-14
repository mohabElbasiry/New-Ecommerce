import { InputTimePPicker } from "@/components/GlobalUi/inputTimePicker/inputDateTimePicker";
import { InputWithLabelComponent } from "@/components/inputcomponent";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { produce } from "immer";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";
import Tags from "./tags";
import { useCallback } from "react";
import { CheckboxD } from "@/components/GlobalUi/checkbox";
export const ProductSettings = ({settings, setSubmitedData }) => {
   const {tags=[],statues='publish',publishTime='', AllowRating=false,
    Featured=false}=settings
  const handleAction = useCallback(()=>(action) => {
    UpdateAction(action, setSubmitedData);
  },[]);
  const updateData = (event) => {
    const { name, value } = event.target;
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: { name, value },
      target:'settings'
    });
  };
  const handleStateusChange=(value)=>{
     setSubmitedData(prev=>({...prev,settings:{...prev.settings,statues:value}}))
    // handleAction({
    //   type: "UpdatePropertyByNameAndValue",
    //   payload: { name:'statues', value },
    //   target:'settings'
    // });
  }
  const handleCheckChange=(name,value)=>{
    setSubmitedData(prev=>({...prev,settings:{...prev.settings,[name]:value}}))


  }
  console.log(statues,'statuesstatuesstatues');
  return (
    <>
      <div  className=" gap-3 flex flex-col items-start pl-4   box p-2 w-[380px]">
        <p className="title">Statues</p>
        <RadioGroup
          name="status"
           value={statues}
          className="flex my-3"
            onValueChange={handleStateusChange}
        >
          {["active", "draft" ,"schedule"].map((item) => (
            <div key={item} className="flex items-center space-x-2 ">
              <RadioGroupItem value={item} id={item} />
              <Label className="cursor-pointer" htmlFor={item}>
                {item}
              </Label>
            </div>
          ))}
        </RadioGroup>
        {
          statues==="schedule"? <InputTimePPicker
          name="publishTime"
          onChange={(event) => updateData(event)}
          setSubmitedData={setSubmitedData}
          value={publishTime}
        />:null
        }
       
      </div>

      <div  className=" gap-3   box p-2 w-[380px]">
      <p className="title">Tags</p>
          <Tags tags={tags} setSubmitedData={setSubmitedData}/>
      <p className="title">more options</p>

        <div className="pl-2 flex  flex-col gap-4">
        <CheckboxD checked={AllowRating} handleChange={handleCheckChange.bind(null,'AllowRating')} 
         text="Allow Rating "/>
        <CheckboxD checked={Featured} handleChange={handleCheckChange.bind(null,'Featured')} 
         text="Feature Product"/>

        </div>

      </div>


    </>
  );
};
