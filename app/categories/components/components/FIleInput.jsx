"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function FileInput() {
  const [data, setData] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      setData(sheetData);
    };

    reader.readAsBinaryString(file);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data || []);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const excelFile = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(excelFile, "data.xlsx");
  };
  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        {data?.length ? (
          <div className=" mt-10" >
            <button
              className="bg-gray-600 text-white p-3"
              onClick={exportToExcel}
            >
              Export to Excel
            </button>
            <h2 className="">Imported Data:</h2>
          </div>
        ) : null}
        <div className="border mt-3">
          <Table>
            <TableCaption className="pb-5 text-[red]">
              A list of your recent invoices.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((item, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">
                    {item?.[`Order ID`]}
                  </TableCell>
                  <TableCell>{item?.[`Customer Name`]}</TableCell>
                  <TableCell>{item?.Sales || 0}</TableCell>
                  <TableCell>{item?.[`Unit Price`] || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default FileInput;
