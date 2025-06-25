import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import History from "./components/History";
import Navbar from "./components/Navbar";
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<History />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

const App = () => {
  const [excelData, setExcelData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [filter, setFilter] = useState("");
const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const headers = data[0];
      const rows = data.slice(1).map((row) =>
        headers.reduce((acc, header, index) => {
          acc[header] = row[index];
          return acc;
        }, {})
      );
      setExcelData(rows);
    };
    reader.readAsBinaryString(file);
  };

  const exportToPDF = () => {
    const input = document.getElementById("dataTable");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10);
      pdf.save("excel-data.pdf");
    });
  };

  const filteredData = excelData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  const headers = excelData.length > 0 ? Object.keys(excelData[0]) : [];
  const chartData = excelData.slice(0, 5).map((row, i) => ({
    name: row[headers[0]] || `Row ${i + 1}`,
    value: Number(row[headers[1]]) || 0,
  }));

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1"];

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Excel Analytics Dashboard</h1>

      <div className="flex items-center gap-4">
        <Input type="file" accept=".xlsx, .xls" onChange={handleUpload} />
        <Button onClick={exportToPDF}>Export to PDF</Button>
        <Input
          placeholder="Search..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="max-w-sm"
        />
      </div>

      <Tabs defaultValue="table" className="w-full">
        <TabsList>
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Card>
            <CardContent id="dataTable" className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr>
                    {headers.map((header, i) => (
                      <th key={i} className="px-2 py-1 border-b">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, i) => (
                    <tr key={i}>
                      {headers.map((header, j) => (
                        <td key={j} className="px-2 py-1 border">
                          {row[header]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PieChart width={300} height={300}>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>

            <LineChart width={400} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardContent className="space-y-2">
              <p><strong>File:</strong> {fileName || "No file uploaded"}</p>
              <p><strong>Total Rows:</strong> {excelData.length}</p>
              <p><strong>Search Matches:</strong> {filteredData.length}</p>
              <p>
                <strong>Headers:</strong> {headers.join(", ") || "None"}
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;



