import { Router, Request, Response } from "express";
import multer from 'multer';
import {
  getTransactions,
  uploadTransactions,
} from "../controllers/transactionController";

const router = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

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

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response): Promise<void> => {
    try {
      await uploadTransactions(req, res);
    } catch (error) {
      console.error(error);
      if (!res.headersSent) {
        res.status(500).send("Error uploading transactions");
      }
    }
  }
);

export default router;
