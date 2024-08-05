import { Reorder, motion, useDragControls } from "framer-motion";
import CreateVariation from "./createVariations";
import { ReorderIcon } from "../drageControl";

export default function ReorderItem({
  item,
  setVarients,
  idx,
  data,
  productVarients,
}) {
  const dragControls = useDragControls();
  return (
    <Reorder.Item
      onDragEnd={(e) => e.stopPropagation()}
      value={item}
      key={item?.key_en}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      whileDrag={{ scale: 1 }}
      transition={{ duration: 0.3 }}
      className="my-3"
      dragListener={false}
      dragControls={dragControls}
    >
      {item?.edit ? (
        <CreateVariation
          setList={setVarients}
          listIndex={idx}
          list={productVarients?.variants}
          data={data}
        />
      ) : (
        <div
          onClick={() => {
            setVarients(
              produce((draft) => {
                draft?.productvaritions.variants?.forEach((item, index) => {
                  if (idx === index) {
                    item["edit"] = true;
                  }
                  return item;
                });
                const { history, ...others } = draft;
                draft.history.push(others);
              })
            );
          }}
        >
          <div className="flex items-start gap-2 p-3 w-[100%] hover:bg-[#eee]">
            <div className="mt-3  p-2 flex flex-col gap-3 px-2 hover:bg-[#eee]   ">
              <ReorderIcon dragControls={dragControls} />
            </div>
            <div className="">
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
    </Reorder.Item>
  );
}
