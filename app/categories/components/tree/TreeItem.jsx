import { Pencil, Plus, Trash2 } from "lucide-react";

export default function TreeItem({
  item,
  treeRendering,
  open,
  setOpen,
  setTreeItems,
  setSelectedItem,
  deleteElementFromTree,
}) {
  return (
    <li
      key={item.id}
      className={`${item.children?.length ? "has-children" : ""}`}
    >
      <div
        className={`!py-3 border-0 px-3 bg-gray-300 rounded-2xl !flex !items-center justify-between  ${
          item?.children?.length ? "" : ""
        } `}
      >
        <span>{item.title}</span>
        <div
          className={` !bg-transparent  h-4 !border !w-auto !flex !items-center !justify-start !gap-2 z-10`}
        >
          <button
            onClick={() => {
              setOpen(true);
              setSelectedItem(item);
            }}
            className="p-0.5 bg-[green] transition-all hover:scale-110 rounded-md"
          >
            <Plus size={15} className="text-white" />
          </button>
          <button
            onClick={() => {
              setOpen(true);
              setSelectedItem({ ...item, updatedId: item.id });
            }}
            className="p-0.5 bg-[#4884D3] transition-all hover:scale-110 rounded-md"
          >
            <Pencil size={15} className="text-white" />
          </button>
          <button
            onClick={() => {
              deleteElementFromTree(item);
            }}
            className="p-0.5 bg-[#F56565] transition-all hover:scale-110 rounded-md"
          >
            <Trash2 size={15} className="text-white" />
          </button>
        </div>
      </div>
      {item.children && item.children.length
        ? treeRendering(
            item.children,
            setTreeItems,
            open,
            setOpen,
            setSelectedItem,
            deleteElementFromTree
          )
        : null}
    </li>
  );
}
