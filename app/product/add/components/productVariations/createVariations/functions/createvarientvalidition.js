export const HandleAddVarients = (
  list,
  currentValues,
  setGeneralErrorMessage,
  currentOptions,
  callback
) => {
  const isError=false
  const isOneOfOthers = list
    ?.filter((option) => !option?.edit)
    .find((option) => {
      return option?.key_en?.trim() === currentOptions?.option_en?.trim();
    });
    console.log(isOneOfOthers,'isOneOfOthers');

  if (isOneOfOthers) {
    return;
  }
if(!isError){
  
}
  return callback()
};
