import express from "express";
import cors from "cors";
import transactionRoutes from "./routes/transactionRoutes";
import connection from "./config/db";

const app = express();

const startServer = async () => {
  try {
    await connection;

    console.log("DB connected!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on port " + process.env.PORT);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

startServer();

app.use(cors());
app.use(express.json());
app.use("/transactions", transactionRoutes);

export default app;
