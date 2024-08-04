"use client";
import { signal } from "@preact/signals-core";
import toast from "react-hot-toast";

export const toastMessagener = signal({
  toastMessage: {
    success: (message) => toast.success(message),
    error: (message) => toast.error(message),
  },
}).value.toastMessage;
export default function RootSignal() {
  return <div className="hidden"></div>;
}
