import { Reorder, useDragControls } from "framer-motion";
import CreateVariation from "../..";
import { produce } from "immer";
import { ReorderIcon } from "../../../../drageControl";
import { UpdateAction } from "../../../RootFunction/middleWare";

export const VariationItem = ({
  productVarients = [],
  setVarients = () => {},
  item = {},
  idx = -1,
}) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };
  const dragControls = useDragControls();

  return (
    <>
      {item?.edit ? (
        <CreateVariation
          setList={setVarients}
          listIndex={idx}
          list={productVarients?.variants}
        />
      ) : (
        <div
          onClick={() => {
            handleAction({ type: "EditVarient", payload: { idx } });
          }}
        >
          <div className="flex items-start gap-2 p-3 w-[100%] hover:bg-[#eee]">
            <div className="mt-3  p-2 flex flex-col gap-3 px-2  hover:bg-[#eee] cursor-pointer">
              <ReorderIcon dragControls={dragControls} />
            </div>
            <div className="   ">
              <p>{item?.key_en}</p>
              <ul className="w-[100%] flex gap-3 flex-wrap">
                {item?.values?.map((CurrentValueitem) => {
                  return (
                    <li className="bg-[#ddd] px-3 rounded-md text-sm ">
                      {CurrentValueitem?.value_en}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
