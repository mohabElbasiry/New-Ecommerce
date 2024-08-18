import { InputWithLabelComponent } from "@/components/inputcomponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/customselect";
import Image from "next/image";
export const CountryCode = ({ data, defaultValue, code, setChoosen ,value}) => {
  console.log(code,'codecode');
  return (
    <div className="flex items-center w-full gap-1 px-5  my-2">
      <Select
      value={code}
        onValueChange={(value) => {
          setChoosen((prev) => ({
            ...prev,
            code: value,
          }));
        }}
      >
        <SelectTrigger className=" !p-[10px] h-[33px]   w-[130px] !outline-none">
          <SelectValue
            placeholder={
              <div className="flex items-center gap-2">
                <img
                  src={defaultValue?.flag?.svg || defaultValue?.flags?.svg}
                  alt={defaultValue?.flag?.alt || defaultValue?.flags?.alt}
                  width={30}
                  height={30}
                />
                <p>
                  {defaultValue?.idd?.suffixes?.map(
                    (suffix) => defaultValue.idd.root + suffix
                  ) || defaultValue?.code}
                </p>
              </div>
            }
          />
        </SelectTrigger>
        <SelectContent>
          {data?.map((item) => {
             return (
              <SelectItem
                value={item?.code}
                className={"!w-[300px] flex items-center !outline-none"}
                key={item?.flag?.svg}
              >
                <div className="flex items-center gap-2">
                  <img
                    src={item?.flag?.svg}
                    alt={item?.flag?.alt}
                    width={30}
                    height={30}
                  />
                  <p>{item?.code}</p>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <InputWithLabelComponent
        Input
        value={value?.split(' ')[1]??""}
        className="!border-none !rounded-none
     outline-none w-full h-[32px] px-2"
        parentCss={"w-full"}
        onChange={(e) => {
          if (!isNaN(e?.target?.value)) {
            setChoosen((prev) => {
              return {
                ...prev,
                phone: `${code} ${e.target.value}`,
              };
            });
          }
        }}
      />
    </div>
  );
};
