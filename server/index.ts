import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import mediaRoutes from "./routes/media";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Media upload routes
  app.post("/api/media/upload", mediaRoutes.uploadSingleFile);
  app.post("/api/media/upload-multiple", mediaRoutes.uploadMultipleFiles);
  app.get("/api/media/files/:filename", mediaRoutes.serveFile);
  app.delete("/api/media/files/:filename", mediaRoutes.deleteFile);
  app.get("/api/media/info/:filename", mediaRoutes.getFileInfo);
  app.get("/api/media/health", mediaRoutes.healthCheck);

  return app;
}
