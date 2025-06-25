export default function ExcelTable() {
  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 max-h-80 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Excel Data Table</h2>
      <table className="w-full text-sm border-collapse">
        <thead className="bg-gray-200 dark:bg-gray-700">
          <tr>
            <th className="p-2">Column 1</th>
            <th className="p-2">Column 2</th>
            <th className="p-2">Column 3</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
            <td className="p-2">Row 1</td>
            <td className="p-2">Data</td>
            <td className="p-2">Here</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
