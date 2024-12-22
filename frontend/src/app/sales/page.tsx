"use client";
import { getTransactions } from "@/services/transactions/getTransactions";
import Sidebar from "@/components/SideBar";
import { useEffect, useState } from "react";

export default function Dashboard() {
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
      <div className="w-full flex flex-col justify-between">
        <main className="flex flex-col gap-8 row-start-2 items-center p-6 sm:items-start min-h-[800px] justify-start">
          <h1>Sales</h1>

          <div className="w-11/12 max-w-[1400px] m-auto mt-0 overflow-x-auto border border-zinc-800 rounded-lg ">
            <table className="min-w-full table-auto text-white">
              <thead>
                <tr>
                  <th className="px-4 py-2">Tipo</th>
                  <th className="px-4 py-2">Data</th>
                  <th className="px-4 py-2">Produto</th>
                  <th className="px-4 py-2">Valor</th>
                  <th className="px-4 py-2">Vendedor</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-t border-zinc-700">
                    <td className="px-4 py-2 text-center">
                      {getTypeDescription(transaction.type)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {new Date(transaction.date).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 text-center">
                      {transaction.product}
                    </td>
                    <td className="px-4 py-2 text-center">{`$${transaction.value}`}</td>
                    <td className="px-4 py-2 text-center">
                      {transaction.seller}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex m-auto my-0 justify-center gap-4 mt-4">
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

        <div className="fixed right-2 bottom-1 flex gap-1">
          <span>Developed by</span>
          <a
            className="text-lime-600 transition-colors hover:text-lime-500"
            href="https://github.com/Saviovd"
            target="_blank"
          >
            Sávio Almeida
          </a>
        </div>
      </div>
    </div>
  );
}
