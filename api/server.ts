import express, { Request, Response } from "express";
import pool from "./db";
import dotenv from "dotenv";
import userRoutes from "./routes/apartments";
import cors from "cors";

dotenv.config();

const app = express();
const allowedOrigins = ["http://localhost:3000", "http://localhost:8081"];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Check if the origin is in the allowedOrigins list
//       if (origin) {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//           callback(null, true); // Allow the request
//         } else {
//           callback(new Error("Not allowed by CORS")); // Block the request
//         }
//       }
//     },
//   })
// );

app.use(
  cors({
    origin: "*", // Allow all origins or specify your React Native IP/domain
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

const port = process.env.DB_PORT || 5432;
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
