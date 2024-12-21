import axios from "axios";
import { Transaction } from "@/types/transactions";

export const getTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await axios.get<Transaction[]>("http://localhost:5000/transactions/get");
    return response.data;
  } catch (err) {
    throw new Error("Erro ao buscar os dados.");
  }
};
