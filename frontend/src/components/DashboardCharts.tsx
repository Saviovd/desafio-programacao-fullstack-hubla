import { getTransactions } from "@/services/transactions/getTransactions";
import { Transaction } from "@/types/transactions";
import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as LineTooltip,
  Legend as LineLegend,
} from "recharts";
import Title from "./Title";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DashboardCharts = () => {
  const [isClient, setIsClient] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const formatDataForTopSellers = (transactions: Transaction[]) => {
    const productSales = transactions.reduce((acc, transaction) => {
      const product = transaction.product;
      const value = Number(transaction.value);

      if (acc[product]) {
        acc[product] += value;
      } else {
        acc[product] = value;
      }

      return acc;
    }, {} as Record<string, number>);

    return Object.entries(productSales).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const formatDataForGrowth = (transactions: Transaction[]) => {
    const growthData = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toISOString().split("T")[0];
      const value = Number(transaction.value);

      if (acc[date]) {
        acc[date] += value;
      } else {
        acc[date] = value;
      }

      return acc;
    }, {} as Record<string, number>);

    return Object.entries(growthData)
      .map(([date, value]) => ({
        date,
        value,
      }))
      .sort((a, b) => (a.date > b.date ? 1 : -1));
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };

    setIsClient(true);
    fetchTransactions();
  }, []);

  if (!isClient) {
    return null;
  }

  const topSellersData = formatDataForTopSellers(transactions);
  const growthData = formatDataForGrowth(transactions);

  return (
    <div className="flex w-full pb-10 lg:p-6 gap-8 flex-wrap">
      <div className="w-full md:w-auto">
        <Title content="Cursos mais vendidos" />
        <PieChart width={320} height={400}>
          <Pie
            data={topSellersData}
            dataKey="value"
            nameKey="name"
            outerRadius={150}
            fill="#8884d8"
          >
            {topSellersData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
      <div className="w-full md:w-auto">
        <Title content="Vendas" />
        <LineChart
          width={320}
          height={300}
          data={growthData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <LineTooltip />
          <LineLegend />
        </LineChart>
      </div>
    </div>
  );
};

export default DashboardCharts;
