import { getOperationServer } from "@/lib/apiUtilsServer";
import CategoriesTable from "./utils/components/CategoriesTable";

const page = async ({ searchParams }) => {
  let endpoint = searchParams?.c
    ? `/${searchParams?.c}/childs`
    : "?isRoot=true";
  const categoriesData = await getOperationServer(`/categories${endpoint}`, {
    next: {
      tags: ["Category"],
      revalidate: 1,
    },
  });
  const categories = categoriesData?.data || [];
  return (
    <div className="pt-20">
      <CategoriesTable categories={categories} cId={searchParams?.c} />
    </div>
  );
};

export default page;
