import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CategoryBreadCrump() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <p>Create Category</p>
      <MoveLeft
        className="cursor-pointer"
        onClick={() => router.push(`/categories`)}
      />
    </div>
  );
}
