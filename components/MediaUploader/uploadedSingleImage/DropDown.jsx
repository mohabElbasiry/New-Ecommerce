import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function DropDown({
  open,
  setOpen,
  handleUploadFile,
  removeUploadedImage,
}) {
  return (
    <DropdownMenu open={open} onClose={() => setOpen(false)}>
      <DropdownMenuTrigger onClick={() => setOpen(true)}>
        Edit
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="justify-center relative p-3">
          <input
            type="file"
            onChange={handleUploadFile}
            onFocus={(e) => e.stopPropagation()}
            className="opacity-0 absolute top-0 left-0  h-full w-full z-10"
          />
          <span>Change Image</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="justify-center p-3"
          onClick={removeUploadedImage}
        >
          Remove
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
