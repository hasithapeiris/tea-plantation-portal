import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const mockData = [
  {
    Date: "2024-01-31",
    Forecasted_Production: 24394524.89,
    Forecasted_Forex_Earnings: 1041873309158.02,
  },
  {
    Date: "2024-02-29",
    Forecasted_Production: 24697279.88,
    Forecasted_Forex_Earnings: 1055593690645.42,
  },
  {
    Date: "2024-03-31",
    Forecasted_Production: 24828351.94,
    Forecasted_Forex_Earnings: 1061537216329.43,
  },
  {
    Date: "2024-04-30",
    Forecasted_Production: 24884927.57,
    Forecasted_Forex_Earnings: 1064103320092.63,
  },
  {
    Date: "2024-05-31",
    Forecasted_Production: 24909316.39,
    Forecasted_Forex_Earnings: 1065209646320.08,
  },
];

const ForecastChart = () => {
  const [filteredData, setFilteredData] = useState(mockData);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  // Filter data based on date range
  const handleFilter = () => {
    const { start, end } = dateRange;
    if (!start || !end) return;

    const newData = mockData.filter((d) => d.Date >= start && d.Date <= end);
    setFilteredData(newData);
  };

  return (
    <div className="p-4 bg-white border rounded-lg">
      {/* Date Filters */}
      <div className="mb-4 flex gap-4">
        <input
          type="date"
          value={dateRange.start}
          onChange={(e) =>
            setDateRange({ ...dateRange, start: e.target.value })
          }
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dateRange.end}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="border p-2 rounded"
        />
        <button
          onClick={handleFilter}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          Filter
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="Forecasted_Production"
            stroke="#8884d8"
          />
          <Line
            type="monotone"
            dataKey="Forecasted_Forex_Earnings"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ForecastChart;
