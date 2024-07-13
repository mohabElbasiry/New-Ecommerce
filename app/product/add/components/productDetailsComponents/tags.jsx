import { InputWithLabelComponent } from "@/components/inputcomponent";

export default function Tags() {
  return (
    <div className="bg-white p-1 shadow-md rounded-sm">
      {" "}
      <p>Tags</p>
      <div className=" relative">
        <InputWithLabelComponent
          PlaceHolder="Add Tag"
          Input
          inputCss="bg-[#f9f9f9]"
        />

        <button  type="button"className="  p-2 absolute top-[10%] right-3">+</button>
      </div>
      <div className="tags">
        <div className="TagItem min-w-[70px]  flex gap-2 justify-around  border w-fit p-1  rounded-md bg-[#dddddd]  text-black">
          Tag
          <button type="button">x</button>
        </div>
      </div>
    </div>
  );
}
