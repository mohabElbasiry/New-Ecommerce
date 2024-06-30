import { Dialog, Transition } from "@headlessui/react";

export function CustomDialoge({
  open,
  setOpen,
  SaveFunction = () => {},
  children,
}) {
  return (
    <Transition.Root show={open} as={"Fragment"}>
      <Dialog className="relative z-[991] " onClose={setOpen}>
        <Transition.Child as={"Fragment"}>
          <div className="fixed inset-0 bg-black/50 bg-opacity-75 backdrop-blur-lg z-[991]  transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-[991] w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={"Fragment"}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform 
            rounded-2xl backdrop-blur-3xl  text-left bg-[#DEDEDE80] space-y-5 p-4 text-white font-medium shadow-xl transition-all grid grid-cols-1  min-w-96 !w-full max-w-md z-[991] "
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
