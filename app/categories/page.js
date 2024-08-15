import { getOperationServer } from "@/lib/apiUtilsServer";
import CategoriesTable from "./utils/components/CategoriesTable";

const page = async ({ searchParams }) => {
  let endpoint = searchParams?.c
    ? `/${searchParams?.c}/childs`
    : "?isRoot=true";
  const categoriesData = 
  await getOperationServer(`/categories`, {
    next: {
      tags: ["Category"],
      revalidate: 1,
    },
  });
  console.log("categoriesData", categoriesData);
  const categories = categoriesData?.data || [];
  return (
    <div className="pt-20">
      {/* <CategoriesTree categories={categories} /> */}
      <CategoriesTable categories={categories}
       cId={searchParams?.c} />
    </div>
  );
};

export default page;
