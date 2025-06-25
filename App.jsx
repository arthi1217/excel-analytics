// App.jsx
import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import UploadExcel from "./components/UploadExcel";
import ExcelTable from "./components/ExcelTable";
import Charts from "./components/Charts";
import Summary from "./components/Summary";
import History from "./components/History";

export default function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}>
      <header className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
        <h1 className="text-xl font-bold">📊 Excel Analytics Dashboard</h1>
        <button onClick={() => setDark(!dark)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      <main className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        <div className="col-span-full">
          <UploadExcel />
        </div>
        <div className="col-span-full md:col-span-2">
          <ExcelTable />
        </div>
        <div>
          <Summary />
        </div>
        <div className="col-span-full">
          <Charts />
        </div>
        <div className="col-span-full">
          <History />
        </div>
      </main>
    </div>
  );
}

