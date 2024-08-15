import TextEditor from "@/components/TextEditor";

export default function CategoryFormTextEditor({
  formData,
  setFormData,
  lang,
}) {
  return (
    <div className="mt-5">
      <TextEditor
        content={formData[`description_${lang}`]}
        name={`description_${lang}`}
        setSubmitedData={setFormData}
      />
    </div>
  );
}
