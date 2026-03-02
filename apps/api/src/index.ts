import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks";
import userRoutes from "./routes/users";
import healthRoutes from "./routes/health";
import { errorHandler } from "./middleware/error-handler";

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

// Middleware
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} — ${duration}ms`);
  });
  next();
});

// Routes
app.use("/api/health", healthRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Error handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`TaskFlow API running on http://localhost:${PORT}`);
});

export default app;
