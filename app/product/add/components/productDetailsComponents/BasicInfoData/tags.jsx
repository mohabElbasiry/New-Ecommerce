import { InputWithLabelComponent } from "@/components/inputcomponent";
import { memo, useState } from "react";
import { produce } from "immer";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";

function Seo({ seoData, setSubmitedData }) {
  const [tagText, setTagText] = useState("");
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };

  const handleAddTag = (ta) => {
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: {
        name: "tags",
        value: [...seoData.tags, tagText],
      },
      target: "seo",
    });
    setTagText("");
  };
  const handleRemoveTag = (tag) => {
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: {
        name: "tags",
        value: seoData.tags.filter((item) => item !== tag),
      },
      target: "seo",
    });
  };
  const UdateBasicInfo = (e, setSubmitedData) => {
    const { name, value } = e.target;
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: {
        name,
        value,
      },
      target: "seo",
    });
  };
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
            value={tagText}
            onChange={(e) => setTagText(e.target.value)}
          />

          <button
            onClick={handleAddTag}
            type="button"
            className="  p-2 absolute top-[10%] right-3"
          >
            +
          </button>
        </div>
        <div className="tags flex flex-wrap gap-4">
          {seoData?.tags?.map((item) => (
            <div className="TagItem min-w-[70px] border bg-gray-100  h-[25px] fkex items-center flex gap-2 justify-around    w-fit p-1  rounded-md    text-black">
              {item}
              <button onClick={() => handleRemoveTag(item)} type="button">
                x
              </button>
            </div>
          ))}
        </div>
        <InputWithLabelComponent
          Input
          label="Page title"
          PlaceHolder="Page title"
          // register={{ ...register("title_en") }}
          // isError={errors?.title_en}
          // message={errors?.title_en?.message}
          name="title"
          value={seoData?.title}
          onChange={(e) => {
            UdateBasicInfo(e, setSubmitedData);
          }}
        />
        <label htmlFor="TextArea">Meta Description</label>
        <textarea
          id="TextArea"
          className="border p-1 rounded-sm outline-none"
          rows="4"
          cols="50"
          placeholder="write something"
          name="description"
          onChange={(e) => {
            UdateBasicInfo(e, setSubmitedData);
          }}
        ></textarea>
      </div>
    </>
  );
}
export default memo(Seo);
