import { useState } from "react";
import { ListManager } from "react-beautiful-dnd-grid";

const List = [
  {
    name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxljCiU3pRUXpw-39aklTNk7BDV3G9Dn7ocw&s",
    order: 0,
    id: "@das",
  },
  {
    name: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    order: 1,
    id: "@das",
  },

  {
    name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAAVs2PLdsJq87FS_r_s6_jbpGmcGcI9ZXvg&s",
    order: 2,
    id: "@das",
  },
  {
    name: "https://media.springernature.com/lw703/springer-static/image/art%3A10.1038%2F528452a/MediaObjects/41586_2015_Article_BF528452a_Figg_HTML.jpg",
    order: 3,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/lights.jpg",
    order: 4,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/nature.jpg",
    order: 5,
    id: "@das",
  },
  {
    name: "https://www.w3schools.com/w3images/mountains.jpg",
    order: 6,
    id: "@das",
  },
 
];

export const DragableImagesBox = ({ images }) => {
  const [sortedList, setSortedList] = useState(List);
  function sortListArr(list) {
    return list.slice().sort((first, second) => first.order - second.order);
  }
  const sortList = () => {
    setSortedList(
      sortListArr(sortedList).map((item, idx) => ({ ...item, idx }))
    );
  };
  const reorderList = (sourceIndex, destinationIndex) => {
    const list = sortedList;

    if (destinationIndex === sourceIndex) {
      return;
    }

    if (destinationIndex === 0) {
      list[sourceIndex].order = list?.[0]?.order - 1;
      sortList();
      return;
    }

    if (destinationIndex === list?.length - 1) {
      sortList();
      return;
    }

    if (destinationIndex < sourceIndex) {
      list[sourceIndex].order =
        (list?.[destinationIndex]?.order +
          list?.[destinationIndex - 1]?.order) /
        2;
      sortList();
      return;
    }

    list[sourceIndex].order =
      (list?.[destinationIndex]?.order + list?.[destinationIndex + 1]?.order) /
      2;
    sortList();
  };
  
   
  return (
    <>
      <div className="App">
        <ListManager
          items={sortedList}
          direction="horizontal"
          maxItems={4}
          className="dragable"
          render={(item, idx) => {
            return (
              <div>
                <img
                  className={`border m-1  overflow-hidden object-cover  ${
                    item?.idx == 0
                      ? "w-[250px]   h-[130px]"
                      : "  w-[100px] h-[120px]"
                  }`}
                  src={`${item?.name}`}
                />
              </div>
            );
          }}
          onDragEnd={reorderList}
        />
      </div>
    </>
  );
};
