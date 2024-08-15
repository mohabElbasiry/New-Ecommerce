import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
export const CountryCode = ({ data, defaultValue }) => {
  console.log(defaultValue, "defaultValue");
  // console.log(defaultValue);
  // const { code= country?.idd?.suffixes
  //     ?.map((suffix) => country.idd.root + suffix)
  //     .join(", ")}=defaultValue
  console.log(defaultValue?.flags);
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        {/* <SelectValue className={`bg-[url("${defaultValue?.flags?.svg}"})] bg-cover w-[30px] h-[30px] bg-[red]`}
        //   placeholder={
        //     <div className=" overflow-hidden relative">
        //       <Image
        //         src={defaultValue?.flags?.svg}
        //         alt={defaultValue?.flags?.alt}
        //       width={30}
        //       height={30}
        //       />
           
        //     </div>
        //   }
        /> */}
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value={defaultValue?.idd?.suffixes
            ?.map((suffix) => defaultValue.idd.root + suffix)
            .join(", ")}
          className={"w-[150px] flex items-center"}
       / >
          
       
        {data?.map((item) => {
          return (
            <SelectItem
              value={item?.code}
              className={"w-[150px] flex items-center"}
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
        {/* <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem> */}
      </SelectContent>
    </Select>
  );
};
