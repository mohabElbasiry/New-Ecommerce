export function filterData(data, criteria) {
    return data?.filter((item) => {
      return criteria?.every((criterion) => {
        return item?.values.some((valueObj) => {
          return (
            valueObj?.key_en === criterion?.key &&
            valueObj?.value_en === criterion?.value
          );
        });
      });
    });
  }