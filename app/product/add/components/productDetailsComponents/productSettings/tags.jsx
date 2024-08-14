import { InputWithLabelComponent } from "@/components/inputcomponent";
import { memo, useState } from "react";
import { produce } from "immer";
import { UpdateAction } from "../../productVariations/RootFunction/middleWare";

function Tags({ tags, setSubmitedData }) {
  console.log(Tags);
  const [tagText, setTagText] = useState("");
  const handleAction = (action) => {
    UpdateAction(action, setSubmitedData);
  };

  const handleAddTag = (ta) => {
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: {
        name: "tags",
        value: [...tags, tagText],
      },
      target: "settings",
    });
    // setTagText("");
  };
  const handleRemoveTag = (tag) => {
    handleAction({
      type: "UpdatePropertyByNameAndValue",
      payload: {
        name: "tags",
        value: tags.filter((item) => item !== tag),
      },
      target: "settings",
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
      target: "settings",
    });
  };
  return (
    <>
        
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
          {tags?.tags?.map((item) => (
            <div className="TagItem min-w-[70px] border bg-gray-100  h-[25px] fkex items-center flex gap-2 justify-around    w-fit p-1  rounded-md    text-black">
              {item}
              <button onClick={() => handleRemoveTag(item)} type="button">
                x
              </button>
            </div>
          ))}
        </div>
       
     
    </>
  );
}
export default memo(Tags);
