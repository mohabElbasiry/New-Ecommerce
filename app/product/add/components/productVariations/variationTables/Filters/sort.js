import { SortActionComponent } from "@/components/SortComponents/SortAction";

export const SortComponent = ({
  setAutoGenerate,
  autoGenerate,
  setBeforeFiltered,
}) => {
  function sortItemsByQuantity(items, order = "asc", property) {
    let Sorteditems = [];
    if (order === "asc") {
      Sorteditems = items.sort((a, b) => +a[property] - +b[property]);
    } else if (order === "desc") {
      Sorteditems = items.sort((a, b) => +b[property] - +a[property]);
    } else {
      Sorteditems = items.map((item) => {
        item.values.sort((a, b) => {
          if (order === "asc") {
            return a[property] > b[property] ? 1 : -1;
          } else if (order === "desc") {
            return a[property] < b[property] ? 1 : -1;
          } 
        });
        return item;
      });
    }

    return [...Sorteditems];
  }

  const SetMethod = (sortMethod, property) => {
    console.log(sortMethod, property, "dsaaaaaaaaaaaaaaaaa");
    setAutoGenerate((prev) => {
      return sortItemsByQuantity(prev, sortMethod, property);
    });
    setBeforeFiltered((prev) => {
      return sortItemsByQuantity(prev, sortMethod, property);
    });
  };
  const handleChange = (sortMethod, sortBy) => {
    SetMethod(sortMethod, "price");

    if (sortBy === "Price") {
      SetMethod(sortMethod, "price");
    }
    if (sortBy === "Avalibilities") {
      SetMethod(sortMethod, "quantity");
    }
    if (sortBy === "Varients Name ") {
        SetMethod('name', "key_en");

    }
  };

  return (
    <SortActionComponent
      label={"sort by"}
      menu={[
        {
          label: "Price",
        },
        {
          label: "Avalibilities",
        },
        {
          label: "Varients Name",
        },
      ]}
      handleValueChange={handleChange}
    />
  );
};
