const express = require("express");
const dotenv = require("dotenv").config();
// For security Imports
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
// Swagger Imports
const setupSwagger = require("./src/SwaggerConfig.js");
// Clustering Imports
// const cluster = require("cluster");
// const os = require("os");
// RealTime Sockets Imports
const http = require("http");
const setupSocket = require("./src/Sockets.js");
// Logging Imports
const morgan = require("morgan");
const Logger = require("./src/Utils/Logger.js");
// CronJobs Import
// const { startAllCrons } = require("./src/CronJobs/StartingCronJobs.js");
// Routes Import
const routes = require("./src/Routes.js");

// const numCPUs = os.cpus().length;

// try {
//   if (cluster.isPrimary) {
//     // startAllCrons();

//     for (let i = 0; i < numCPUs; i++) {
//       cluster.fork();
//     }

//     cluster.on("exit", (worker, code, signal) => {
//       console.log(
//         `Worker ${worker.process.pid} died with code ${code} and signal ${signal}`
//       );
//       setTimeout(() => cluster.fork(), 1000);
//     });
//   } else {
    const app = express();
    const port = process.env.PORT || 8000;

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

    app.use(helmet());
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
      })
    );
    app.use(limiter);
    app.use(express.json({ limit: "50kb" }));
    app.use(express.urlencoded({ extended: false }));

    app.use(morgan("combined", { stream: Logger.stream }));
    
    app.use("/", routes);

    // Setup Swagger
    setupSwagger(app);

    app.get("/", (_, res) => res.send("API Running ✅"));

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

    app.use((err, req, res, next) => {
      Logger.error("Route error", {
        error: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
      });
      res.status(500).send("Server Error");
    });

    // --- Socket.IO Integration ---
    const server = http.createServer(app);
    setupSocket(server);

    server.listen(port, () => {
      console.log(`Worker ${process.pid} running on port ${port}`);
    });

    process.on("SIGTERM", () => {
      server.close(() => {
        process.exit(0);
      });
    });
//   }
// } catch (error) {
//   console.log("The Error Occured", error);
// }
