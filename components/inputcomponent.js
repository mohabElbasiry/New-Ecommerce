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
        ${inputCss} `}
          {...props}
          placeholder={PlaceHolder}
          type={inputType}
          required={isRequired}
        />
      ) : (
        <select
          name="HeadlineAct"
          id="HeadlineAct"
          {...props}
          className="
          border border-[#ddd] w-full focus-none font-sem p-1
        bg-transparent rounded-md 
       text-[#333]   appearance-none  
        py-2 px-3   leading-tight focus:outline-none
         focus:shadow-outline
         focus:border-[#504a4a !bg-[#f9f9f9]"
        >
          {" "}
          <option value={""}>Please Select Value</option>
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
    </div>
  );
};
