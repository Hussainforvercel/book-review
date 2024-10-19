import express, { Application, Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import authRoutes from "./routes/authRoutes";
import reviewRoutes from "./routes/reviewRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
connectDB();
const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const allowedOrigins = ["https://book-review-app-rouge.vercel.app/"];

app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api/auth", authRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/users", authRoutes);
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
