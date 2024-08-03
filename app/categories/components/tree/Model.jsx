import { useEffect, useState, useRef } from "react";

export default function Model({
  open,
  setOpen,
  addElementToTree,
  addNewElementToTree,
  editElementToTree,
  selectedItem,
}) {
  const [text, setText] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    const handleClickoutside = (e) => {
      const modelBody = document.querySelector(".model-body");
      if (!modelBody?.contains(e.target)) {
        setOpen(false);
        setText("");
      }
    };
    document.addEventListener("click", handleClickoutside);
    return () => document.removeEventListener("click", handleClickoutside);
  }, [open, setOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text || text.trim() === "") {
      inputRef.current.focus();
    } else {
      if (open && selectedItem?.updatedId) {
        editElementToTree(text);
      } else {
        typeof selectedItem === "string"
          ? addNewElementToTree({
              id: Math.floor(1000000 + Math.random() * 1000000),
              title: text,
            })
          : addElementToTree({
              id: Math.floor(1000000 + Math.random() * 1000000),
              title: text,
            });
      }
      setText("");
      setOpen(false);
    }
  };
  useEffect(() => {
    if (open && selectedItem?.updatedId) {
      setText(selectedItem.title);
    }
  }, [open, selectedItem]);
  return (
    <div
      className={` ${
        !open ? "hidden" : "fixed"
      } bg-[#00000094] top-0 left-0 h-full w-full  z-20 flex items-center justify-center`}
    >
      <form
        onSubmit={handleSubmit}
        className="model-body w-[500px] h-[250px] bg-white rounded-3xl p-10 text-black"
      >
        <h1 className="mb-8 text-center text-lg font-semibold">
          {!selectedItem?.updatedId ? "Create item" : "Update Item"}
        </h1>
        {["text"].map((key) => (
          <div key={key}>
            <label
              htmlFor="Name"
              className="block text-xs font-medium text-gray-700"
            >
              Name
            </label>

            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Name of item"
              className="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm outline-0 p-2 border"
            />
          </div>
        ))}
        <div className="flex items-center gap-4 ">
          <button
            type="submit"
            className="bg-[green] text-white py-3 rounded-lg\ px-4 mt-6 focus:scale-[0.9] transition-transform"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setText("");
            }}
            className="bg-[orangered] text-white py-3 rounded-lg\ px-4 mt-6 focus:scale-[0.9] transition-transform"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
