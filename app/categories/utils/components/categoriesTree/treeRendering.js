import TreeItem from "./TreeItem";

export const treeRendering = (
  categoriesItems,

  open,
  setOpen,
  setSelectedItem,
  deleteElementFromTree
) => {
  return (
    <ul>
      {categoriesItems.map((item) => (
        <TreeItem
          key={item.id}
          item={item}
          treeRendering={treeRendering}
          open={open}
          setOpen={setOpen}
          setSelectedItem={setSelectedItem}
          deleteElementFromTree={deleteElementFromTree}
        />
      ))}
    </ul>
  );
};
