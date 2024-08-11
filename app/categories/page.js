import { getOperationServer } from "@/lib/apiUtilsServer";
// import CategoriesTree from "./utils/components/categoriesTree/Index";
import CategoriesTable from "./utils/components/CategoriesTable";

const page = async () => {
  const categoriesData = await getOperationServer(`/categories?isRoot=true`, {
    next: {
      tags: ["Category"],
      revalidate: 1,
    },
  });
  const categories = categoriesData?.data || [];
  return (
    <div className="pt-20">
      {/* <CategoriesTree categories={categories} /> */}
      <CategoriesTable categories={categories} />
    </div>
  );
};

export default page;
