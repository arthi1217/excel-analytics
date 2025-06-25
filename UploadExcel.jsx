import { useRef } from "react";

export default function UploadExcel() {
  const fileRef = useRef();

  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Upload Excel File</h2>
      <input
        type="file"
        accept=".xlsx,.xls"
        ref={fileRef}
        className="w-full bg-white p-2 rounded border dark:bg-gray-700 dark:border-gray-600"
      />
    </div>
  );
}
