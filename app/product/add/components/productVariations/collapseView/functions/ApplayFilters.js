export const applyFilters = (
  dataFilteredData,
  filters = {},
  varientsValues
) => {
  // Check if filters are provided or are empty
  console.log(dataFilteredData, "datadataad");
  if (Object.keys(filters).length === 0) {
    return products;
  }

  const {
    FilterValues = [],
    GroupBy = {
      key: "",
      reorderArray: [],
    },
    sortBy = {
      sortMethod: "",
      sortKey: "",
    },
  } = filters;
  //   if (
  //     GroupBy?.key === "" ||
  //     !GroupBy?.FilterValues?.length ||
  //     sortBy?.sortMethod === "" ||
  //     sortBy?.sortKey === ""
  //   ) {
  //     return data;
  //   }

  console.log(dataFilteredData, "itemFilteritemFilter");

  // Curried filter functions
  const filterVarientsByValuesAndkey = (FilterValues) => (item) => {
    return FilterValues?.every((itemFilter) => {
      return item?.values?.some((itemv) => {
        return itemv?.options?.some(
          (option) =>
            option?.value_en?.trim() === itemFilter?.value?.trim() &&
            option?.key_en === itemFilter?.key
        );
      });
    });
  };
  const filteredData = (dataFilteredData, criteria) => {
    if (!criteria?.length) return dataFilteredData;
    return dataFilteredData
      .map((item) => {
        const values = item.values.filter((itemv) => {
          return criteria?.every((itemc) =>
            itemv?.options?.some((itemo) => itemo?.value_en === itemc?.value)
          );
        });

        return {
          ...item,
          values,
        };
      }).filter(item=>{

        return item?.values?.length
      })
      
  };
  const filtersToApply = [
    filterVarientsByValuesAndkey(FilterValues),
    //   filterByCategory(category),
    //   filterByInStock(inStock),
    //   filterBySearchQuery(searchQuery)
  ];
  console.log(
    filteredData(dataFilteredData, FilterValues),
    "dsawqeqwewqweqewq"
  );

  return filteredData(dataFilteredData, FilterValues);
  //   return dataFilteredData.filter((item) =>
  //     filtersToApply.every((filterFn) => filterFn(item))
  //   );
};
