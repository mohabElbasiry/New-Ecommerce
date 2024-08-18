export const querying = ({ searchParams, defaults }) => {
    const searchParamsKeys = Object.keys(searchParams);
    const defaultKeys = defaults ? Object.keys(defaults) : undefined;
    var defaultQString = "";
    var searchQString = "";
    if (defaultKeys && defaultKeys.length > 0) {
      defaultKeys.forEach((dKey, idx) => {
        defaultQString += `${dKey}=${defaults[dKey]}${
          idx + 1 !== defaultKeys.length ? "&" : ""
        }`;
      });
    }
    if (searchParamsKeys.length > 0) {
      defaultQString = "";
    }
    searchParamsKeys.forEach((sKey, idx) => {
      const specifedKeys = [
        "name",
        "name_en",
        "name_ar",
        "title",
        "title_en",
        "title_ar",
      ];
      const findedSeachedKey = specifedKeys.find((s) => s === sKey);
      const customQKey = findedSeachedKey ? `keyword[${findedSeachedKey}]` : sKey;
      searchQString += `${customQKey}=${searchParams[sKey]}${
        idx + 1 !== searchParamsKeys.length ? "&" : ""
      }`;
    });
    return `?${defaultQString ? defaultQString : searchQString}`;
  };
  