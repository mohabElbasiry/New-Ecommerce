export const UpdateQualityImages = ({
  setBeforeFiltered,
  setAutoGenerate,
  index,
  item,
}) => {
  console.log(item, "idxitemdassssssss");
  const setFIleUploads = (e) => {
    const files = e.target.files;
    const uploadedFiles = Object.values(files);
    // setImages((prev) => [...prev, ...uploadedFiles]);
    setAutoGenerate((prev) => {
      return prev?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            image: [...(item?.image || []), ...uploadedFiles],
          };
        }
        return item;
      });
    });
    setBeforeFiltered((prev) => {
      return prev?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            image: [...item?.image, ...uploadedFiles],
          };
        }
        return item;
      });
    });
  };
  const deleteSpecificImage = (imageIndex) => {
    setAutoGenerate((prev) => {
      return prev?.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            image: item?.image?.filter((_, idx) => idx !== imageIndex),
          };
        }
        return item;
      });
    });
    setBeforeFiltered((prev) => {
        return prev?.map((item, idx) => {
          if (idx === index) {
            return {
              ...item,
              image: item?.image?.filter((_, idx) => idx !== imageIndex),
            };
          }
          return item;
        });
      });
  };
  return (
    <div className="relative w-fit cursor-pointer">
      <input
        type="file"
        className="opacity-0 absolute top-0 left-0 z-[3] w-full h-full"
        multiple
        onChange={(e) => setFIleUploads(e)}
      />
      <button>
        {item?.image?.length ? (
          <div className="flex gap-2">
            {item?.image?.map((image, idx) => {
              return (
                <>
                  <img
                    className="W-[30px] h-[30px] cursor-pointer"
                    src={URL.createObjectURL(image)}
                    key={idx}
                  />
                  <button
                    className="cursor-pointer z-[30]"
                    onClick={() => deleteSpecificImage(idx)}
                  >
                    x
                  </button>
                </>
              );
            })}
          </div>
        ) : (
          <img
            className="W-[30px] h-[30px] cursor-pointer"
            src={"/addImage.svg"}
          />
        )}
      </button>
    </div>
  );
};
