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

  const [nameText, setNameText] = useState({
    en: "",
    ar: "",
  });
  const inputRefEN = useRef(null);
  const inputRefAR = useRef(null);
  useEffect(() => {
    const handleClickoutside = (e) => {
      const modelBody = document.querySelector(".model-body");
      if (!modelBody?.contains(e.target)) {
        setOpen(false);
        setNameText({
          en: "",
          ar: "",
        });
      }
    };
    document.addEventListener("click", handleClickoutside);
    return () => document.removeEventListener("click", handleClickoutside);
  }, [open, setOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameText.en || nameText.en.trim() === "") {
      inputRefEN.current.focus();
    } else if (nameText.ar.trim() === "" || nameText.ar.trim() === "") {
      inputRefAR.current.focus();
    } else {
      if (open && selectedItem?.updatedId) {
        editElementToTree(text);
      } else {
        typeof selectedItem === "string"
          ? addNewElementToTree({
              name: nameText,
            })
          : addElementToTree({
              id: Math.floor(1000000 + Math.random() * 1000000),
              title: text,
            });
      }

      setNameText({
        en: "",
        ar: "",
      });
      setOpen(false);
    }
  };
  const handleChangeName = (e) => {
    const { name, value } = e.target;

    setNameText({
      ...nameText,
      [name]: value,
    });
  };
  useEffect(() => {
    if (open && selectedItem?.updatedId) {
      setNameText({
        en: selectedItem.name.en,
        ar: selectedItem.name.ar,
      });
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
        className="model-body w-[500px] h-[325px] bg-white rounded-3xl p-10 text-black"
      >
        <h1 className="mb-8 text-center text-lg font-semibold">
          {!selectedItem?.updatedId ? "Create item" : "Update Item"}
        </h1>
        {["en", "ar"].map((key) => (
          <div key={key}>
            <label
              htmlFor="Name"
              className="block text-xs font-medium text-gray-700"
            >
              {key === "en" ? "English name" : "Arabic Name"}
            </label>

            <input
              ref={key === "en" ? inputRefEN : inputRefAR}
              value={nameText[key]}
              name={key}
              onChange={(e) => handleChangeName(e)}
              placeholder={key === "en" ? "English name" : "Arabic Name"}
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
              setNameText({
                en: "",
                ar: "",
              });
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
