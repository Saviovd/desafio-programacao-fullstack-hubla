import { Router, Request, Response } from "express";
import {
  getTransactions,
  uploadTransactions,
} from "../controllers/transactionController";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("OK");
});
router.get("/get", async (req: Request, res: Response) => {
  try {
    await getTransactions(req, res);
  } catch (error) {
    res.status(500).send("Error fetching transactions");
  }
});

export default router;
