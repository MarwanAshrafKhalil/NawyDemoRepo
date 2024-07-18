import express, { Request, Response } from "express";
import pool from "./db";
import dotenv from "dotenv";
import userRoutes from "./routes/apartments";
import cors from "cors";

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const port = process.env.DB_PORT || 3000;
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client?.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log(result.rows);
  });
});

app.use(express.json());

app.use("/api/apartments", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
