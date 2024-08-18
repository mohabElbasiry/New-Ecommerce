import { Languages } from "lucide-react";

export const MainublateData = (array) => {
  return array.map((country) => {
    return {
      ar: country?.translations.ara.common,
      en: country?.name?.common,
      code: country?.idd?.suffixes
        ?.map((suffix, idx) => {
          if (idx === 0) {
            return country.idd.root + suffix;
          }
          return null;
        })
        .filter(Boolean)
        .join(", "),
      flag: country.flags,
      capital: country?.capital ? country?.capital.toString() : "",
    };
  });
};
