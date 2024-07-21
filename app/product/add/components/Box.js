export const Box = ({ children,text,Components }) => {
  return (
    <div className="   rounded-md p-1 overflow-hidden  bg-[#ffffffe3] ">
      <div className="header p-3  text-[#000] text-xl font-mono capitalize  mb-3 flex items-center justify-between">{text}{Components}</div>
      <div className="content    rounded-t-[50px] ">{children}</div>
    </div>
  );
};
