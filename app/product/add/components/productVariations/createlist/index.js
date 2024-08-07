import { UpdateAction } from "../RootFunction/middleWare";

export const CreateList = ({ setVarients, children }) => {
  const handleAction = (action) => {
    UpdateAction(action, setVarients);
  };
  return (
    <>
      <p
        className="cursor-pointer add-product-variant text-sm lowercase p-3 rounded-lg shadow bg-[#fff]"
        onClick={() => {
          handleAction({
            type: "UpdateVarientList",
            payload: {
              isColor: "",
              key_en: "",
              key_ar: "",
              values: [
                {
                  value_ar: "",
                  value_en: "",
                  color: "",
                },
              ],
              edit: true,
            },
          });
        }}
      >
        {children}
      </p>
    </>
  );
};
