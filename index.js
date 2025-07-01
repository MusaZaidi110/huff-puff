process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});


const express = require("express");
require("dotenv").config();

// Security Imports
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

// Swagger Imports
const setupSwagger = require("./src/SwaggerConfig.js");

// RealTime Sockets Imports
const http = require("http");
const setupSocket = require("./src/Sockets.js");

// Logging Imports
const morgan = require("morgan");
const Logger = require("./src/Utils/Logger.js");

// Routes Import
const routes = require("./src/Routes.js");

// Initialize Express
const app = express();
const port = process.env.PORT || 8000;

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Too many requests, please try again later.",
  },
  handler: (req, res, next, options) => {
    res.status(options.statusCode).json(options.message);
  },
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(limiter);
app.use(express.json({ limit: "50kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan("combined", { stream: Logger.stream }));

// Routes
app.use("/", routes);

// Swagger
setupSwagger(app);

// Health Check
app.get("/", (_, res) => res.send("API Running ✅"));

// 404 Handler
app.use((req, res, next) => {
  Logger.warn("Route not found", {
    path: req.path,
    method: req.method,
    ip: req.ip,
    headers: {
      referer: req.headers.referer,
      "user-agent": req.headers["user-agent"],
    },
  });

  res.status(404).json({
    success: false,
    error: "ROUTE_NOT_FOUND",
    message: `The requested resource ${req.path} was not found`,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString(),
  });
});

// Error Handler
app.use((err, req, res, next) => {
  Logger.error("Route error", {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
  });
  res.status(500).send("Server Error");
});

// Socket.IO and Server
const server = http.createServer(app);
setupSocket(server);

server.listen(port, () => {
  console.log(`🚀 Server running on port ${port} (PID: ${process.pid})`);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
