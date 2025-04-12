// Imports
import "dotenv/config";
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { notFound } from "./controllers/notFoundController";
import authRoutes from "./routes/authRoutes";
import entryRoutes from "./routes/entryRoutes";
import mongoose from "mongoose";
import { isAuth } from "./middleware/authMiddleware";
import { swaggerSpec } from "./utils/swagger";

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Swagger Documentation (Read-only)
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      supportedSubmitMethods: ["get"], // Only allow GET requests
      docExpansion: "none", // Collapse all operations by default
      filter: true, // Enable filtering
      tryItOutEnabled: false, // Disable the "Try it out" feature
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", isAuth, entryRoutes);

// 404 handler
app.all("*", notFound);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI_LIVE!);
  console.log("Database connection OK");
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
