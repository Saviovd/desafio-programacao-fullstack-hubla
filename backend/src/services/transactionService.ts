import pool from "../config/db";
import { Transaction } from "../models/transaction";

export const saveTransactions = async (transactions: Transaction[]) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const query = `
      INSERT INTO transactions (type, date, product, value, seller)
      VALUES (?, ?, ?, ?, ?)
    `;
    for (const t of transactions) {
      await connection.execute(query, [
        t.type,
        t.date,
        t.product,
        t.value,
        t.seller,
      ]);
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const [rows] = await pool.execute("SELECT * FROM transactions");
  return rows as Transaction[];
};

