export default function Summary() {
  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 space-y-2">
      <h2 className="text-lg font-semibold mb-2">Summary</h2>
      <p>Total Rows: <strong>10</strong></p>
      <p>Average Value: <strong>45.6</strong></p>
      <p>Last Upload: <strong>Today</strong></p>
    </div>
  );
}
