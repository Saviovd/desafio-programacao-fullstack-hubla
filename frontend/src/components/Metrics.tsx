import useTransactions from "@/hooks/useTransactions";

export default function Metrics() {
  const { metrics, error } = useTransactions();

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-white">Resumo de Métricas</h1>
      {!metrics ? (
        <div className="text-center text-white">Carregando...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
            <h2 className="text-lg font-semibold">Comissão Paga</h2>
            <p className="text-2xl font-bold">
              R${" "}
              {metrics.commissionPaid.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
            <h2 className="text-lg font-semibold">Total de Vendas (Criador)</h2>
            <p className="text-2xl font-bold">
              R${" "}
              {metrics.creatorSales.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
            <h2 className="text-lg font-semibold">
              Total de Vendas (Afiliado)
            </h2>
            <p className="text-2xl font-bold">
              R${" "}
              {metrics.affiliateSales.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
            <h2 className="text-lg font-semibold">Produto Mais Vendido</h2>
            <p className="text-xl">{metrics.topProduct}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md text-white">
            <h2 className="text-lg font-semibold">Maior Vendedor</h2>
            <p className="text-xl">{metrics.topSeller}</p>
          </div>
        </div>
      )}
    </div>
  );
}
