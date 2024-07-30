import { useState } from "react";

const QuantityInput = ({ initialQuantity = 1, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex items-center border rounded  shadow h-10 p-0.5  max-w-[90%] ">
      <button
        className="p-2 text-gray-600 hover:bg-gray-200 focus:outline-none w-6"
        onClick={handleDecrement}
        aria-label="Decrease quantity"
      >
        -
      </button>
      <input
        type="number"
        className="flex-1 h-full w-auto text-center border-l border-r focus:outline-none !max-w-[calc(100%-50px)] "
        value={quantity}
        readOnly
        aria-label="Quantity"
      />
      <button
        className="p-2 text-gray-600 hover:bg-gray-200 focus:outline-none w-6"
        onClick={handleIncrement}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
};

export default QuantityInput;
