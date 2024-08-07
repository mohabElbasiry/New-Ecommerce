import { getOperationServer } from "@/lib/apiUtilsServer";
import CategoriesTree from "./utils/components/categoriesTree/Index";

const page = async () => {
  const categoriesData = await getOperationServer(`/categories`, {});
  const categories = categoriesData?.data || [];
  return (
    <div>
      <CategoriesTree categories={categories} />
    </div>
  );
};

export default page;
