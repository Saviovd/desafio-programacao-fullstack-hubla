"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/SideBar";
import { uploadTransactionFile } from "@/services/transactions/sendTransactionsFile";
import Button from "@/components/Button";

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadHistory, setUploadHistory] = useState<
    Array<{ name: string; date: string }>
  >([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem("uploadHistory");
    if (storedHistory) {
      setUploadHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && selectedFile.type === "text/plain") {
      setFile(selectedFile);
      setErrorMessage(null);
    } else {
      setErrorMessage("É necessário anexar um arquivo .txt para prosseguir.");
    }
  };

  const saveUploadHistory = (fileName: string) => {
    const newEntry = {
      name: fileName,
      date: new Date().toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }),
    };

    const updatedHistory = [newEntry, ...uploadHistory];
    setUploadHistory(updatedHistory);
    localStorage.setItem("uploadHistory", JSON.stringify(updatedHistory));
  };

  const handleSubmit = async () => {
    if (!file) {
      setErrorMessage(
        "É necessário anexar um documento para prosseguir com a requisição."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await uploadTransactionFile(file);
      alert("Arquivo enviado com sucesso!");
      saveUploadHistory(file.name);
      setFile(null);
      setErrorMessage(null);
    } catch (error) {
      console.error("Erro ao enviar o arquivo", error);
      alert("Erro ao enviar o arquivo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-zinc-900">
      <Sidebar />
      <div className="w-full flex flex-col justify-between">
        <main className="flex flex-col gap-8 row-start-2 items-center p-6 sm:items-start">
          <h1>Novas Transações</h1>

          <div className="flex items-start justify-start gap-2 flex-wrap">
            <h2 className="text-lg font-semibold text-left w-full">
              Fazer upload de transações
            </h2>
            <input
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="text-white bg-zinc-700 p-2 rounded-md"
              disabled={isLoading}
            />

            <Button
              content={isLoading ? "Enviando..." : "Enviar"}
              action={handleSubmit}
              disabled={!file || isLoading}
              className="w-auto"
              />
              {errorMessage && (
                <p className="text-red-500 text-left w-full">{errorMessage}</p>
              )}
          </div>

          <div className="w-full bg-zinc-800 text-white rounded-md p-4">
            <h2 className="text-xl font-semibold mb-4">Histórico de Uploads</h2>
            {uploadHistory.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-zinc-700 p-2">
                      Nome do Arquivo
                    </th>
                    <th className="border-b border-zinc-700 p-2">
                      Data e Hora
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {uploadHistory.map((upload, index) => (
                    <tr key={index}>
                      <td className="border-b border-zinc-700 p-2">
                        {upload.name}
                      </td>
                      <td className="border-b border-zinc-700 p-2">
                        {upload.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center text-gray-500">
                Não há histórico disponível.
              </p>
            )}
          </div>
        </main>

        <div className="fixed right-2 bottom-1 flex gap-1">
          <span>Developed by</span>
          <a
            className="text-lime-600 transition-colors hover:text-lime-500"
            href="https://github.com/Saviovd"
            target="_black"
          >
            Sávio Almeida
          </a>
        </div>
      </div>
    </div>
  );
}
