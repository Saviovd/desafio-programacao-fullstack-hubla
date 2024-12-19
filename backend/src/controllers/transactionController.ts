import { Request, Response } from "express";
import {
  fetchTransactions,
  saveTransactions,
} from "../services/transactionService";

export const getTransactions = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const transactions = await fetchTransactions();
    return res.status(200).json(transactions);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Unknown error occurred." });
  }
};
