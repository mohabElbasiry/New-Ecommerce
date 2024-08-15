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
}) {
  const [open, setOpen] = useState();
  const [value, setValue] = useState(choosenValue);
   
  useEffect(()=>{
    setValue(choosenValue);

  },[choosenValue])
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
          <input
            type="text"
            value={value}
            className="border p-2 w-full rounded"
            placeholder={"Seclect Collection"}
            onChange={(e) => {
              setValue(e.target.value);
              setOpen(true);
              onChange(e);
            }}
          />
        </div>
        {open ? (
          <ul
            className="action-component ul border rounded-xl shadow-xl 
          border-t-0 
            absolute top-[50px] left-0 w-[100%] bg-[#ffff] z-[1000] 
             h-fit max-h-[500px] overflow-auto"
          >
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
