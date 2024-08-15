import CategoryForm from "./components/CategoryForm/Index";

export default function AddCategoryPage({ searchParams, params }) {
  console.log("searchParams in categoryPage", searchParams);
  return (
    <div className="bg-[#F1F1F1] min-h-lvh pt-20">
      <div className="w-3/4 mx-auto rounded-lg p-5">
        <CategoryForm
          parentId={searchParams?.c}
          editId={searchParams?.cEd}
          params={params}
        />
      </div>
    </div>
  );
}
