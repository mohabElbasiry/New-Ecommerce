import { shapeData } from "../../../collapseView/functions/datashape";
import { generateQualities } from "../../../collapseView/functions/GenerateQualities";

export function updateOrEditVariantInPlace(
  state,
  listIndex,
  option_en,
  option_ar,
  currentValues,
  isEdit = true
) {
  const variants = state.productvaritions.variants;

  if (isEdit) {
    // Modify the variant in place
    const variant = variants[listIndex];
    if (variant) {
      variant.key_en = option_en || "";
      variant.key_ar = option_ar || "";
      variant.values = currentValues?.filter(
        (valueItem) => valueItem?.value_en !== ""
      );
      variant.edit = false;
    }
  } else {
    // Remove the variant directly from the original array
    variants.splice(listIndex, 1);
  }

  // Synchronize REfvariants with updated variants
  state.productvaritions.REfvariants = [...variants];

  if (!variants.length) {
    // If variants are empty, reset related properties and return
    state.productvaritions.varitionsValues = [];
    return;
  }

  // Generate the qualities and reshape data
  const flatValues =
    state.productvaritions.varitionsValues?.flatMap((item) => item.values) ||
    [];
  const dataShape = generateQualities(flatValues, variants);

  state.productvaritions.varitionsValues = shapeData(dataShape, variants);
}
