import { Request, Response } from "express";
import {
  fetchTransactions,
  saveTransactions,
} from "../services/transactionService";
import { parseFile } from "../utils/fileParser";

export const uploadTransactions = async (
  req: Request,
  res: Response
): Promise<void | Response> => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file provided." });
    }

    const transactions = parseFile(file);
    await saveTransactions(transactions);
    res.status(200).json({ message: "Transactions uploaded successfully." });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Unknown error occurred." });
    }
  }
};


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
