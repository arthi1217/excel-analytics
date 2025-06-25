import { LineChart, Line, PieChart, Pie, Tooltip } from "recharts";

const data = [{ name: "A", value: 30 }, { name: "B", value: 70 }];

export default function Charts() {
  return (
    <div className="p-6 rounded-2xl shadow bg-white dark:bg-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h2 className="font-semibold mb-2">Pie Chart</h2>
        <PieChart width={200} height={200}>
          <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={60} fill="#8884d8" label />
          <Tooltip />
        </PieChart>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Line Chart</h2>
        <LineChart width={250} height={200} data={data}>
          <Line type="monotone" dataKey="value" stroke="#82ca9d" />
          <Tooltip />
        </LineChart>
      </div>
    </div>
  );
}
