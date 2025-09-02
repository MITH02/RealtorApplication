import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import mediaDbRoutes from "./routes/media-db";
import * as userRoutes from "./routes/users";
import * as buildingRoutes from "./routes/buildings";
import * as taskRoutes from "./routes/tasks";

export function createServer() {
  const app = express();

  // Middleware
  const allowedOrigins = (
    process.env.CORS_ALLOWED_ORIGINS ??
    "http://localhost:3000,http://localhost:5173,http://localhost:8080,http://localhost:8081"
  ).split(",");

  const corsOptions: cors.CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow non-browser or same-origin requests
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Length"],
    optionsSuccessStatus: 204,
  };

  app.use("/api", cors(corsOptions));
  // Preflight handled by cors middleware; no explicit app.options route (Express 5 path-to-regexp v6)
  app.use(express.json({ limit: "60mb" })); // Increased for base64 encoded files
  app.use(express.urlencoded({ extended: true, limit: "60mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // User management routes
  app.get("/api/admin/contractors", userRoutes.getAllContractors);
  app.get("/api/admin/contractors/available", userRoutes.getAvailableContractors);
  app.get("/api/admin/stats/user-counts", userRoutes.getUserCounts);

  // Building management routes
  app.post("/api/buildings", buildingRoutes.createBuilding);
  app.get("/api/buildings", buildingRoutes.getAllBuildings);
  app.get("/api/buildings/:id", buildingRoutes.getBuildingById);
  app.put("/api/buildings/:id", buildingRoutes.updateBuilding);
  app.patch("/api/buildings/:id/status", buildingRoutes.updateBuildingStatus);
  app.delete("/api/buildings/:id", buildingRoutes.deleteBuilding);
  app.get("/api/buildings/my-buildings", buildingRoutes.getMyBuildings);

  // Task management routes
  app.post("/api/tasks", taskRoutes.createTask);
  app.get("/api/tasks/:id", taskRoutes.getTaskById);
  app.get("/api/tasks/builder/all", taskRoutes.getBuilderTasks);
  app.get("/api/tasks/building/:buildingId", taskRoutes.getTasksByBuilding);
  app.patch("/api/tasks/:id/approve", taskRoutes.approveTask);
  app.patch("/api/tasks/:id/reject", taskRoutes.rejectTask);
  app.post("/api/tasks/:id/updates", taskRoutes.addTaskUpdate);
  app.get("/api/tasks/:id/updates", taskRoutes.getTaskUpdates);

  // Database-based media routes
  app.post("/api/media/upload", mediaDbRoutes.uploadSingleFile);
  app.post("/api/media/upload-multiple", mediaDbRoutes.uploadMultipleFiles);
  app.get("/api/media/view/:mediaId", mediaDbRoutes.serveMedia);
  app.delete("/api/media/:mediaId", mediaDbRoutes.deleteMedia);
  app.get("/api/media/info/:mediaId", mediaDbRoutes.getMediaInfo);
  app.get("/api/media/list", mediaDbRoutes.listMedia);
  app.get("/api/media/stats", mediaDbRoutes.getStorageStats);
  app.get("/api/media/health", mediaDbRoutes.healthCheck);

  return app;
}
