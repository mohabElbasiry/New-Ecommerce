import { useState } from "react";

export default function UploadFileFromUrlModal() {
  const [open, setOpen] = useState(false);
  return (
    <p className="text-sm text-muted-foreground text-gray-500">
      Image, or Vimeo URL
    </p>
  );
}
