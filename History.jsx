export default function History() {
  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Upload History</h2>
      <ul className="space-y-2">
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">✔ File_1.xlsx – 24 Jun</li>
        <li className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">✔ Report.xlsx – 23 Jun</li>
      </ul>
    </div>
  );
}
