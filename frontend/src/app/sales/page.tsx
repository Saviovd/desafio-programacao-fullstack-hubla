"use client";
import { getTransactions } from "@/services/transactions/getTransactions";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import Signature from "@/components/Signature";

export default function Sales() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchTransactions = async () => {
      const data = await getTransactions();
      setTransactions(data);
    };

    fetchTransactions();
  }, []);

  const getTypeDescription = (type: number) => {
    switch (type) {
      case 1:
        return "Produtor";
      case 2:
        return "Afiliado";
      case 3:
        return "Comissão paga";
      case 4:
        return "Comissão recebida";
      default:
        return "Desconhecido";
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
  };

  const currentTransactions = transactions.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="w-full flex flex-col justify-between h-screen">
        <main className="flex flex-col gap-8 items-center pt-12 px-3 lg:p-6 sm:items-start min-h-[800px] justify-start">
          <SectionTitle content="Vendas" />

          <div className="w-full max-w-[1400px] m-auto mt-0 overflow-x-auto border border-zinc-800 rounded-lg">
            <table className="min-w-full table-auto text-white">
              <thead>
                <tr className="bg-zinc-800">
                  <th className="px-4 py-2 text-sm lg:text-base">Tipo</th>
                  <th className="px-4 py-2 text-sm lg:text-base">Data</th>
                  <th className="px-4 py-2 text-sm lg:text-base">Produto</th>
                  <th className="px-4 py-2 text-sm lg:text-base">Valor</th>
                  <th className="px-4 py-2 text-sm lg:text-base">Vendedor</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-zinc-700">
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      {getTypeDescription(transaction.type)}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      {transaction.product}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      {`$${transaction.value}`}
                    </td>
                    <td className="px-4 py-2 text-center text-sm lg:text-base">
                      {transaction.seller}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-4 mb-12 mx-auto">
            <button
              className="text-white px-4 py-2 cursor-pointer border border-zinc-700 hover:bg-zinc-700 rounded-lg"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Prev
            </button>
            <span className="text-white px-4 py-2">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              className="text-white px-4 py-2 cursor-pointer border border-zinc-700 hover:bg-zinc-700 rounded-lg"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </main>

        <Signature />
      </div>
    </div>
  );
}
