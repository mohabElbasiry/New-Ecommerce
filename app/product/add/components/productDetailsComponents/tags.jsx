import { InputWithLabelComponent } from "@/components/inputcomponent";

export default function Seo() {
  return (
<>
<p className="title">Seo </p>

<div className=" rounded-sm flex flex-col gap-2 box p-3">
      {" "}
      <div className=" relative my-2">
        <InputWithLabelComponent
          PlaceHolder="Add Tag"
          Input
          inputCss="bg-[#f9f9f9]"
        />

        <button type="button" className="  p-2 absolute top-[10%] right-3">
          +
        </button>
      </div>
      <div className="tags">
        <div className="TagItem min-w-[70px]   h-[25px] fkex items-center flex gap-2 justify-around    w-fit p-1  rounded-md    text-black">
          Tag
          <button type="button">x</button>
        </div>
      </div>
      <InputWithLabelComponent
        Input
        label="Page title
        "
        PlaceHolder="Page title
        "
        // register={{ ...register("title_en") }}
        // isError={errors?.title_en}
        // message={errors?.title_en?.message}
        // value={submitedData?.productDetails?.title_en}
        // onChange={(e) => {
        //   UdateBasicInfo(e, setSubmitedData);
        // }}
      /> 
      <label htmlFor="TextArea">Meta Description</label>
      <textarea   id="TextArea" className="border p-1 rounded-sm outline-none" rows="4" cols="50" placeholder="write something">
      
      </textarea>
    </div></>
  );
}
