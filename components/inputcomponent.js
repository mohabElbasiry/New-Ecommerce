export const InputWithLabelComponent = ({
  label = "",
  labelcss = "",
  inputType = "text",
  PlaceHolder = "",
  isRequired = false,
  inputCss = "",
  MoreInfo = false,
  MoreInfoText = "",
  Input = false,
  selectArray = [],
  isError = false,
  message = "",
  defaultSelected = "",
  register,
  onChange = () => {},
  price = false,
  defaultValue,
<<<<<<< HEAD
  parentCss,
=======
  lang,
>>>>>>> bd55f730d95a92ca708cd1139fc44c4717861f55
  ...props
}) => {
  return (
    <div className= {`${parentCss}`}>
      <p className={` font-sans capitalize border-l  ${labelcss} `}>{label}</p>
      {Input ? (
<<<<<<< HEAD
        <div className="flex items-center border  border-[#D4D4D4]
          rounded-md  overflow-hidden parent-div w-full ">
          {price ? <div className="pl-1 text-sm border-r
           border-r-[#D4D4D4] p-1"> EGP</div> : null}
=======
        <div
          className="flex items-center border  border-[#D4D4D4]
          rounded-md  overflow-hidden parent-div w-full "
        >
          {price ? (
            <div className="pl-1 text-sm border-r border-r-[#D4D4D4] p-1">
              {" "}
              EGP
            </div>
          ) : null}
>>>>>>> bd55f730d95a92ca708cd1139fc44c4717861f55
          <input
            className={`     w-full focus-none font-sem p-1
           bg-transparent   
          text-[#333]   appearance-none   
         px-3   focus:outline-none     
             border-s-0 rounded-s-none 
            ${isError ? "border-red-400" : ""}   !h-[32px]      ${inputCss}  `}
            {...props}
            placeholder={price ? "--" : PlaceHolder}
            type={inputType}
            required={isRequired}
            {...register}
            autoComplete="off"
            min={inputType === "number" ? 0 : ""}
            defaultValue={
              inputType === "number"
                ? props?.defaultNumberValues || 0
                : "" || defaultValue
            }
            onChange={onChange}
          />
          {MoreInfo ? (
            <div className="info mr-2 relative    ">
              <img
                src="/icons8-info-24.png   "
                className="peer cursor-pointer"
                width={"25px"}
                height={"25px"}
              />
              <div
                className="  absolute w-[200px]   right-[-10px] shadow text-sm rounded-lg bg-white 
              p-3 opacity-0   peer-hover:opacity-100  transition-opacity duration-300 delay-150"
              >
                {MoreInfoText}
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          {...register}
          {...props}
          className={`
          border border-[#ddd] w-full focus-none font-sem p-1
        bg-transparent rounded-md 
       text-[#333]   appearance-none  
        py-2 px-3   leading-tight focus:outline-none
         focus:shadow-outline
         focus:border-[#504a4a  
            ${isError ? "border-red-400" : ""}
         ${inputCss}`}
          onChange={onChange}
        >
          {" "}
          <option value={""}>
            {defaultSelected !== "" ? defaultSelected : "Please Select Value"}
          </option>
          {selectArray?.map((item, idx) => {
            return (
              <option
                className="text-black"
                key={idx}
                value={item}
                selected={idx == 0}
              >
                {item}
              </option>
            );
          })}
        </select>
      )}

      <p className="text-red-500 text-xs ml-2">
        {isError ? <>*{message}</> : null}
      </p>
    </div>
  );
};
