import TreeItem from "./TreeItem";

export const treeRendering = (
    treeData,
    setTreeItems,
    open,
    setOpen,
    setSelectedItem,
    deleteElementFromTree
  ) => {
    return (
      <ul>
        {treeData.map((item) => (
          <TreeItem
            key={item.id}
            item={item}
            treeRendering={treeRendering}
            setTreeItems={setTreeItems}
            open={open}
            setOpen={setOpen}
            setSelectedItem={setSelectedItem}
            deleteElementFromTree={deleteElementFromTree}
          />
        ))}
      </ul>
    );
  };