import { getOperationServer } from "@/lib/apiUtilsServer";
import CategoriesTable from "./utils/components/CategoriesTable";
import { querying } from "@/lib/quering";

const page = async ({ searchParams }) => {

  let paginagtionOptions = {
    totalPages: 3,
    limit: 2,
  };
  const queries = querying({
    searchParams,
    defaults: { page: 1, limit: 2 },
  })
  const categoriesData =  await getOperationServer(`/categories${queries}`, {
    next: {
      tags: ["Category"],
      revalidate: 1,
    },
  });
  const categories = categoriesData?.data || [];

  if (categoriesData?.status === 'success' && categoriesData?.pagination) {
    paginagtionOptions.totalPages = categoriesData.pagination.totalPages;
    paginagtionOptions.hasNext = categoriesData.pagination.hasNextPage;
    paginagtionOptions.hasPrev = categoriesData.pagination.hasPreviousPage;
  }
  
  return (
    <div className="pt-20">
      <CategoriesTable categories={categories} cId={searchParams?.c} paginagtionOptions = {paginagtionOptions} />
    </div>
  );
}

export default page;
