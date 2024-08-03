import { InputWithLabelComponent } from "@/components/inputcomponent";
import { Checkbox } from "@/components/ui/checkbox";

export const BatchEdit = () => {
  return (
    <div className="bg-[#fff] text-black p-3 rounded-2xl">
      <p
        className="text-black my-3 font-bold text-md 
        capitalize
        "
      >
        pricing
      </p>
      <div
        className="text-black grid 
      grid-cols-2 gap-2   bg-[#eeeeee25]"
      >
        <InputWithLabelComponent
          defaultValue={10}
          Input
          label="price"
          name={"property"}
          onChange={(e) => {
            setChange(e?.target.value);
          }}
          inputCss="w-fit text-sm !px-1 shadow 
          -[#ddd]   flex justify-center  
       shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
     !p-5  !shadow-none
       "
          inputType="number"
        />
        <InputWithLabelComponent
          defaultValue={10}
          Input
          label="Compare-at price
"
          name={"property"}
          onChange={(e) => {
            setChange(e?.target.value);
          }}
          inputCss="w-fit text-sm !px-1 shadow 
          -[#ddd]   flex justify-center  
       shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
     !p-5  !shadow-none
       "
          inputType="number"
        />
      </div>
      <div className="grid grid-cols-3 gap-3">
        <InputWithLabelComponent
          defaultValue={10}
          Input
          label="Cost per item
"
          name={"property"}
          onChange={(e) => {
            setChange(e?.target.value);
          }}
          inputCss="w-fit text-sm !px-1 shadow 
          -[#ddd]   flex justify-center  
       shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
     !p-5  !shadow-none
       "
          inputType="number"
        />
        <InputWithLabelComponent
          defaultValue={10}
          Input
          label="profit"
          name={"property"}
          onChange={(e) => {
            setChange(e?.target.value);
          }}
          inputCss="w-fit text-sm !px-1 shadow 
          -[#ddd]   flex justify-center  
       shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
     !p-5  !shadow-none
       "
          inputType="number"
        />
        <InputWithLabelComponent
          defaultValue={10}
          Input
          label="Margin"
          name={"property"}
          onChange={(e) => {
            setChange(e?.target.value);
          }}
          inputCss="w-fit text-sm !px-1 shadow 
          bg-[#ddd]   flex justify-center  
       shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
     !p-5  !shadow-none
       "
          inputType="number"
        />
      </div>

      <div>
        <p className="my-3">Inventory</p>
        <div className="grid grid-cols-2 gap-2">
          <InputWithLabelComponent
            defaultValue={10}
            Input
            label="Compare-at price
"
            name={"property"}
            onChange={(e) => {
              setChange(e?.target.value);
            }}
            inputCss="w-fit text-sm !px-1 shadow 
             -[#ddd]   flex justify-center  
          shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
        !p-5  !shadow-none
          "
            inputType="number"
          />
          <InputWithLabelComponent
            defaultValue={10}
            Input
            label="Compare-at price
"
            name={"property"}
            onChange={(e) => {
              setChange(e?.target.value);
            }}
            inputCss="w-fit text-sm !px-1 shadow 
             -[#ddd]   flex justify-center  
          shadow bg-white max-w-[300px]   h-[30px] !rounded-[12px]
        !p-5  !shadow-none
          "
            inputType="number"
          />
        </div>

        <div className="  ">
          <div className="flex gap-1 my-3">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium 
        leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Track Quantity
            </label>
          </div>

          <div className="flex gap-1 my-3">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium 
        leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Continue selling when out of stock{" "}
            </label>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-1">
        <button
          type="button"
          className="text-[#333] 
       p-2 bg-[#eee] !my-3 rounded-xl text-center
       justify-center 
        px-2 h-[35px] flex 
        items-center  "
        >
          Discard
        </button>
        <button
          type="button"
          className="text-bwhite 
       p-2 bg-black !my-3 rounded-xl text-center
        justify-center 
        px-2 h-[35px] flex 
        items-center  text-white "
        >
          save
        </button>
      </div>
    </div>
  );
};
