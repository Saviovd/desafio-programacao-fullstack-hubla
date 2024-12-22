import axios from "axios";
import { Transaction } from "@/types/transactions";

export const uploadTransactionFile = async (file: File): Promise<Transaction[]> => {
  try {
    const formData = new FormData();
    
    formData.append("file", file);

    const response = await axios.post<Transaction[]>(
      "http://localhost:5000/transactions/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (err) {
    throw new Error("Erro ao enviar os dados.");
  }
};
