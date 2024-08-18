import { InputWithLabelComponent } from "@/components/inputcomponent";
import Image from "next/image";
import { useEffect, useState } from "react";
export default function AutoCompelete({
  header,
  array,
  onChooseCountry,
  onChange,
  parentclassname,
  ShowingItem,
  choosenValue,
  Icon,
  ...props
}) {

  const [open, setOpen] = useState();
  const [value, setValue] = useState('');
  //  useEffect(() => {
  //   setValue(choosenValue);
  // }, [choosenValue]);
  useEffect(() => {
    if (document && open) {
      const searchIcon = document.querySelector(".action-component");
      const handleCloseOutside = (e) => {
        if (!searchIcon?.contains(e.target)) {
          setOpen(false);
        }
      };
      const handlePress = (e) => {
        if (e.keyCode === 27) {
          setOpen(false);
        }
      };
      document.addEventListener("keydown", handlePress);
      document.addEventListener("click", handleCloseOutside);
      return () => document.removeEventListener("click", handleCloseOutside);
    }
  }, [open]);

  return (
    <div className={`${parentclassname}`}>
      <p>{header}</p>

      <div className="relative w-full">
        <div className="inputTag relative w-full">
          <InputWithLabelComponent
            Icon={Icon}
            labelcss="my-2"
            Input
             
            type="text"
            value={choosenValue}
            placeholder={"Seclect Collection"}
            onClick={(e) => {
               setOpen(true);
             }}
            {...props}
          />
        </div>
        
        
        {open ? (
          <ul
            className="action-component ul border rounded-xl shadow-xl 
          border-t-0 
            absolute top-[50px] left-0 w-[100%] bg-[#ffff] z-[1000] 
             h-fit max-h-[500px] overflow-auto p-1"
          >
            <InputWithLabelComponent
            Icon={Icon}
            labelcss="my-2 sticky top-0"
            Input
            PlaceHolder="Search for state"
            type="text"
            // defaultValue={value}
            placeholder={"Seclect Collection"}
            onChange={(e) => {
              console.log(e.target.value,'adsssssssssss');
              setValue(e.target.value);
              // setOpen(true);
              onChange(e);
            }}
            parentCss={'sticky top-0 z-10 bg-white'}

          />
            {array?.length
              ? array?.map((item) => {
                  return (
                    <li
                      className="p-3 border-b border-[#eee]  
                    border-t rounded flex items-center justify-between px-3 
                    cursor-pointer   "
                      onClick={() => {
                        setOpen(false);

                        onChooseCountry(item, setValue);
                      }}
                    >
                      {ShowingItem ? item[ShowingItem] : item}
                    </li>
                  );
                })
              : null}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
