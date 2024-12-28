import { useState, useEffect } from "react";
import { getTransactions } from "@/services/transactions/getTransactions";

type Metrics = {
  commissionPaid: number;
  topProduct: string;
  topSeller: string;
  creatorSales: number;
  affiliateSales: number;
  courseCommissions: Record<
    string,
    { totalSales: number; commission: number; percentage: number }
  >;
};

const useTransactions = () => {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const transactions = await getTransactions();

        const coursePercentages: Record<string, number> = {
          "CURSO DE BEM-ESTAR": 0.35,
          "DESENVOLVEDOR FULL STACK": 0.32,
          "DOMINANDO INVESTIMENTOS": 0.3,
        };

        let commissionPaid = 0;
        let creatorSales = 0;
        let affiliateSales = 0;

        const productCount: Record<string, number> = {};
        const sellerCount: Record<string, number> = {};
        const courseCommissions: Record<
          string,
          { totalSales: number; commission: number; percentage: number }
        > = {};

        transactions.forEach((t) => {
          const value = Number(t.value);
          const course = t.product;
          const percentage = coursePercentages[course] || 0;

          if (t.type === 3) {
            commissionPaid += value;
          } else if (t.type === 1) {
            creatorSales += value;
          } else if (t.type === 2) {
            affiliateSales += value;
          }

          if (!courseCommissions[course]) {
            courseCommissions[course] = {
              totalSales: 0,
              commission: 0,
              percentage,
            };
          }
          courseCommissions[course].totalSales += value;
          if (percentage > 0 && t.type === 2) {
            courseCommissions[course].commission += value * percentage;
          }

          productCount[course] = (productCount[course] || 0) + 1;
          sellerCount[t.seller] = (sellerCount[t.seller] || 0) + 1;
        });

        const topProduct = Object.keys(productCount).length
          ? Object.keys(productCount).reduce((a, b) => {
              return productCount[a] > productCount[b] ? a : b;
            })
          : "Nenhum produto";

        const topSeller = Object.keys(sellerCount).length
          ? Object.keys(sellerCount).reduce((a, b) => {
              return sellerCount[a] > sellerCount[b] ? a : b;
            })
          : "Nenhum vendedor";

        setMetrics({
          commissionPaid,
          creatorSales,
          affiliateSales,
          topProduct,
          topSeller,
          courseCommissions,
        });
      } catch (err: any) {
        console.error("Erro ao buscar transações:", err);
        setError("Erro ao buscar os dados. Tente novamente mais tarde.");
      }
    }
    fetchTransactions();
  }, []);

  return { metrics, error };
};

export default useTransactions;
