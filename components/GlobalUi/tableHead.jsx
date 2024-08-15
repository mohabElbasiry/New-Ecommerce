import { Plus } from "lucide-react";
import Link from "next/link";

export const TableHead = ({
  navigations,
  data,
  itemId,
  setCheckedItems,
  checkedItems,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 h-12 bg-white px-3 ">
      <Link href={navigations.add(itemId)} className="inline mx-3">
        <Plus className="inline" />
      </Link>
      {data.enableSelect && checkedItems?.length ? (
        <button
          onClick={() => setCheckedItems([])}
          className="bg-[#C75050] text-white py-1 px-2 rounded-xl text-sm"
        >
          Delete
        </button>
      ) : null}
    </div>
  );
};
