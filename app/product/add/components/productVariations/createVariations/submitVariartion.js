export const CreateAndDeleteVariations = ({
  handleListAction,
  currentOptions,
  currentValues,
  SetCreateOptionsValues,
}) => {
  return (
    <div className={"flex justify-between p-3 border-t-2  border-b-2 "}>
      <button
        type="button"
        onClick={() => {
          handleListAction({
            type: "handleDeleteList",
            payload: {
              listIndex,
            },
          });
        }}
        className="bg-[#eee] shadow text-black text-xs   rounded-lg px-3 p-1"
      >
        Delete
      </button>
      <button
        type="button"
        className="bg-[#fefefed] shadow text-black text-xs border  done-variant
        border-[#33333370] rounded-lg px-3 p-1"
        onClick={(e) => {
          e.preventDefault();

          const { option_en, option_ar } = currentOptions;

          const isDuplicate = list?.some(
            (item) => !item.edit && item.key_en === option_en
          );
          SetCreateOptionsValues(
            produce((draft) => {
              if (isDuplicate) {
                draft.currentOptions.ErrorMessage =
                  "This Name Is Already Exist";
                draft.currentOptions.error = true;
                return;
              }
              const hasErrors = draft.error?.some((item) => item?.en?.Message);

              if (!hasErrors) {
                handleListAction({
                  type: "handleUpdateList",
                  payload: {
                    listIndex,
                    option_en,
                    option_ar,
                    currentValues,
                    list,
                    setGeneralErrorState: SetCreateOptionsValues,
                  },
                });
              }
            })
          );
        }}
      >
        Done
      </button>
    </div>
  );
};
