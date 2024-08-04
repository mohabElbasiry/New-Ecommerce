"use client";
export default function Error({ error }) {
  return <p className="text-[red]" >Error: {error.message}</p>;
}
