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
   ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-2">
      <p className={` font-medium capitalize border-l  ${labelcss} `}>
        {label}
      </p>
      {Input ? (
        <input
          className={` border border-[#ddd] w-full focus-none font-sem p-1
           bg-transparent rounded-md 
          text-[#333]   appearance-none  
           py-2 px-3   leading-tight focus:outline-none
            focus:shadow-outline
            focus:border-[#504a4a] !bg-[#f9f9f9]
            ${isError ? "border-red-400" : ""}
        ${inputCss} `}
          {...props}
          placeholder={PlaceHolder}
          type={inputType}
          required={isRequired}
          autoComplete="off"
         />
      ) : (
        <select
          name="HeadlineAct"
          id="HeadlineAct"
           
          {...props}
          className={`
          border border-[#ddd] w-full focus-none font-sem p-1
        bg-transparent rounded-md 
       text-[#333]   appearance-none  
        py-2 px-3   leading-tight focus:outline-none
         focus:shadow-outline
         focus:border-[#504a4a !bg-[#f9f9f9] ${inputCss}`}
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
