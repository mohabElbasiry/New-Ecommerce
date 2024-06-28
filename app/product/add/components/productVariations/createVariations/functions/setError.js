export const handleError = (event, index, isAr,setError,currentValues,error) => {
  if(index===0){
    return
  }
    if (event?.target?.value !== "" && currentValues?.length) {
      setError((prev) => {
        let newObj = {
          index,
          ar: { index: -1, Message: "", isAr: false },
          en: { index: -1, Message: "", isAr: false },
        };
        const obj = error?.find((item) => item?.index === index);

        

        if (isAr) {
          if (obj) {
            if (
              currentValues?.some(
                (item) => item?.value_ar.trim() === event?.target?.value.trim()
              )
            ) {
              return prev?.map((item) => {
                if (item?.index === index) {
                  return {
                    ...item,
                    ar: {
                      index: index,
                      Message: "This Value Already Exist",
                      isAr: true,
                    },
                  };
                } else {
                  return item;
                }
              });
            }

            return prev?.map((item) => {
              if (item?.index === index) {
                return {
                  ...item,
                  ar: {
                    index: -1,
                    Message: "",
                    isAr,
                  },
                };
              } else {
                return item;
              }
            });
          } else {
            newObj.ar = {
              index: -1,
              Message: "",
              isAr,
            };
          }
        } else {
          if (obj) {
            if (
              currentValues?.some(
                (item) => item?.value_en?.trim() === event?.target?.value?.trim()
              )
            ) {
               return prev?.map((item) => {
                if (item?.index === index) {
                  return {
                    ...item,
                    en: {
                      index: index,
                      Message: "This Value Already Exist",
                      isAr,
                    },
                  };
                } else {
                  return item;
                }
              });
            }
            return prev?.map((item) => {
              if (item?.index === index) {
                return {
                  ...item,
                  en: {
                    index: -1,
                    Message: "",
                    isAr: false,
                  },
                };
              } else {
                return item;
              }
            });
          } else {


            newObj.en = {
              index: -1,
              Message: "",
              isAr,
            };
          }
        }
        // console.log("object", "return");
        if (!obj) {
          return [...prev, newObj];
        }
      });
    }
  };