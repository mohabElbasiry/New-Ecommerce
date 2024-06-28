const UpdatedData = (arr) => {
    const totalQuantities = {};

    // Calculate total quantities for each combination of attributes
    arr.forEach(item => {
        item.values.forEach(attr => {
            const key = `${attr.key_en}:${attr.value_en}`;
            totalQuantities[key] = (totalQuantities[key] || 0) + item.quantity;
        });
    });

    // Update each object in the values array with totalQuantity using map
    const updatedArr = arr.map(item => ({
        ...item,
        values: item.values.map(attr => ({
            ...attr,
            totalQuantity: totalQuantities[`${attr.key_en}:${attr.value_en}`] || 0
        }))
    }));

    return updatedArr;
};

export function getKeysAndValues(arr) {
    const keys = [];
    const values = [];

    

    // Iterate over each item in the data
    const ReditData=UpdatedData(arr)
    arr?.forEach((item) => {
        item?.values?.forEach((e) => {
            const keyIndex = keys.findIndex((val) => val.key_ar === e.key_ar && val.key_en === e.key_en);
            if (keyIndex === -1) {
                keys.push({ key_ar: e.key_ar, key_en: e.key_en });
                values.push([{ value_ar: e.value_ar, value_en: e.value_en, totalQuantity: e.totalQuantity }]);
            } else {
                const valueIndex = values[keyIndex].findIndex((val) => val.value_ar === e.value_ar && val.value_en === e.value_en);
                if (valueIndex === -1) {
                    values[keyIndex].push({ value_ar: e.value_ar, value_en: e.value_en, totalQuantity: e.totalQuantity });
                }
            }
        });
    });

    return keys.map((key, index) => ({
        key,
        values: values[index]
    }));
}