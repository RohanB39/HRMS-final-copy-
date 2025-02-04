import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const LeaveTrendsData = [
  { month: "Jan", Vacation: 5, Sick: 2, Emergency: 1, Unpaid: 0 },
  { month: "Feb", Vacation: 6, Sick: 3, Emergency: 0, Unpaid: 1 },
  { month: "Mar", Vacation: 7, Sick: 4, Emergency: 2, Unpaid: 1 },
  { month: "Apr", Vacation: 8, Sick: 2, Emergency: 1, Unpaid: 0 },
  { month: "May", Vacation: 9, Sick: 3, Emergency: 1, Unpaid: 0 },
  { month: "Jun", Vacation: 10, Sick: 2, Emergency: 2, Unpaid: 1 },
  { month: "Jul", Vacation: 8, Sick: 4, Emergency: 3, Unpaid: 2 },
  { month: "Aug", Vacation: 7, Sick: 3, Emergency: 2, Unpaid: 1 },
  { month: "Sep", Vacation: 6, Sick: 2, Emergency: 1, Unpaid: 0 },
  { month: "Oct", Vacation: 5, Sick: 3, Emergency: 2, Unpaid: 1 },
  { month: "Nov", Vacation: 4, Sick: 2, Emergency: 1, Unpaid: 0 },
  { month: "Dec", Vacation: 6, Sick: 3, Emergency: 2, Unpaid: 1 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#210E1C",
          color: "#111827",
          padding: "10px",
          borderRadius: "8px",
          fontFamily: "Work Sans",
          border: "none",
          fontSize: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{ color: "white", fontFamily: "Work Sans", fontSize: "12px" }}
        >
          {label}
        </p>
        {payload.map((item, index) => (
          <p
            key={index}
            style={{
              margin: 0,
              fontWeight: "500",
              fontFamily: "Work Sans",
              fontSize: "12px",
              color: item.color,
            }}
          >
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Legend Component
const CustomLegend = ({ payload }) => {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
      {payload.map((entry, index) => (
        <div
          key={`item-${index}`}
          style={{ display: "flex", alignItems: "center", gap: "5px" }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: entry.color,
              borderRadius: "50%",
            }}
          ></div>
          <span style={{ color: "#444" }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const LeaveLineChart = () => {
  return (
    <div className="mt-6 ">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-darkAccent3 leading-tight">
          Leave Trends Overview
        </h2>
        <p className="text-sm text-gray-600 dark:text-darkMuted w-[80%] mt-2">
          Analyze monthly leave patterns across different leave categories such
          as Vacation, Sick Leave, and Emergency Leaves.
        </p>
      </div>

      {/* Line Chart */}
      <LineChart
        width={600}
        height={400}
        data={LeaveTrendsData}
        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
      >
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        <Line type="monotone" dataKey="Vacation" stroke="#0088FE" />
        <Line type="monotone" dataKey="Sick" stroke="#00C49F" />
        <Line type="monotone" dataKey="Emergency" stroke="#FFBB28" />
        <Line type="monotone" dataKey="Unpaid" stroke="#FF8042" />
      </LineChart>
    </div>
  );
};

export default LeaveLineChart;
