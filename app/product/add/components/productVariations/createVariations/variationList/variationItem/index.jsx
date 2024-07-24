import { Reorder, useDragControls } from "framer-motion";
import CreateVariation from "../..";
import { produce } from "immer";
import { ReorderIcon } from "../../../../drageControl";

export const VariationItem=({productVarients=[],setVarients=()=>{},item ={},idx=-1})=>{

    const dragControls = useDragControls();


    return(<>
      <Reorder.Item
            // onDragEnd={(e) => e.stopPropagation()}
            dragListener={false}
            dragControls={dragControls}
            value={item}
            key={item?.key_en}
            id={item}
           
            // as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileDrag={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            // className="my-2"
          >
             {item?.edit ? (
              <CreateVariation
                setList={setVarients}
                listIndex={idx}
                list={productVarients?.variants}
              />
            ) : (
              <div
                onClick={() => {
                  setVarients(
                    produce((draft) => {
                      draft.productvaritions.variants =
                        draft?.productvaritions.variants?.map((item, index) => {
                          if (idx === index) {
                            return {
                              ...item,

                              edit: true,
                            };
                          }
                          return item;
                        });
                    })
                  );
                 }}
              >
                <div className="flex items-start gap-2 p-3 w-[100%] hover:bg-[#eee]">
                  <div className="mt-3  p-2 flex flex-col gap-3 px-2  hover:bg-[#eee] cursor-pointer">
                    <ReorderIcon  dragControls={dragControls} />
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
          </Reorder.Item>
    
    </>)
}