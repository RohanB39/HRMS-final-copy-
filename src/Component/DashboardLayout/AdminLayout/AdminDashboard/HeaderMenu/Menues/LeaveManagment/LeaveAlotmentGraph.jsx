import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const LeaveData = [
  { name: "Vacation", value: 40 },
  { name: "Sick", value: 30 },
  { name: "Emergency", value: 20 },
  { name: "Unpaid Leaves", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const CustomLegend = ({ payload }) => {
  return (
    <ul className="flex items-center gap-6  ">
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className="flex items-center text-lg"
          style={{
            color: "white",
            fontFamily: "Work Sans",
            fontSize: "12px",
          }}
        >
          <span
            className="block w-4 h-4 rounded-full mr-2"
            style={{ backgroundColor: entry.color }}
          ></span>
          {entry.value}
        </li>
      ))}
    </ul>
  );
};

const LeaveAlotmentGraph = () => {
  return (
    <div className="mt-6 ">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-darkAccent3 leading-tight">
          Leave  Allotment Breakdown
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMuted w-[80%] mt-2">
          Visual representation of leave types and their percentage distribution
          for better HR insights.
        </p>
      </div>
      <PieChart width={400} height={400} >
        <Pie
          data={LeaveData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={({ name, percent }) =>
            `${name} (${(percent * 100).toFixed(0)}%)`
          }
        >
          {LeaveData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#210E1C",
            color: "#111827",
            fontFamily: "Work Sans",
            border: "none",
            borderRadius: "0.5rem",
            padding: "10px",
            fontSize: "12px",
          }}
          itemStyle={{
            color: "white",
            fontSize: "14px",
          }}
        />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </div>
  );
};

export default LeaveAlotmentGraph;
