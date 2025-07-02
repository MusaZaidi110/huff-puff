const { Server } = require("socket.io");
const DeliveryTracking = require("./Models/DeliveryManagement/DeliveryTracking.Model");
const HelpCenterMessage = require("./Models/LiveChatManagement/HelpCenterMessage.Model");
const { Sequelize } = require("sequelize");
const Logger = require("./Utils/Logger"); // Adjust path to your Winston logger

const connectedUsers = new Map(); // userId => socketId
const connectedRiders = new Map(); // riderId => socketId
const locationBuffer = new Map(); // trackingId => latest location data
const connectedAdmins = new Map(); // only for Admin

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    Logger.info(`Socket connected: ${socket.id}`);

    // User joins (customer or staff)
    socket.on("user:join", ({ userId, role }) => {
      connectedUsers.set(userId, socket.id);
      Logger.info(`User ${userId} joined with socket ${socket.id}`);

      if (role === "admin") {
        connectedAdmins.set(userId, socket.id);
      }
    });

    // Rider joins (delivery person)
    socket.on("rider:join", (riderId) => {
      connectedRiders.set(riderId, socket.id);
      Logger.info(`Rider ${riderId} joined with socket ${socket.id}`);
    });

    // Rider sends location update
    socket.on("rider:updateLocation", async (data) => {
      const {
        trackingId,
        riderId,
        userId,
        latitude,
        longitude,
        status,
        estimatedArrival,
        actualDistance,
      } = data;

      if (!trackingId || !latitude || !longitude) {
        Logger.warn("Invalid location data from rider");
        return;
      }

      // Store latest location for this trackingId
      locationBuffer.set(trackingId, {
        riderId,
        userId,
        latitude,
        longitude,
        status,
        estimatedArrival,
        actualDistance,
      });

      // Emit location update to the user (customer)
      const userSocketId = connectedUsers.get(userId);
      if (userSocketId) {
        io.to(userSocketId).emit("user:locationUpdate", {
          trackingId,
          riderId,
          latitude,
          longitude,
          status,
          estimatedArrival,
          actualDistance,
        });
        Logger.debug(
          `Location update sent to user ${userId} for tracking ${trackingId}`
        );
      } else {
        Logger.warn(
          `User socket not found for userId ${userId} on tracking ${trackingId}`
        );
      }
    });

    // Handle disconnects
    socket.on("disconnect", () => {
      for (const [userId, sId] of connectedUsers.entries()) {
        if (sId === socket.id) {
          connectedUsers.delete(userId);
          Logger.info(`User ${userId} disconnected (socket ${socket.id})`);
          break;
        }
      }

      for (const [riderId, sId] of connectedRiders.entries()) {
        if (sId === socket.id) {
          connectedRiders.delete(riderId);
          Logger.info(`Rider ${riderId} disconnected (socket ${socket.id})`);
          break;
        }
      }

      Logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  // Flush location buffer to DB every 5 seconds
  setInterval(async () => {
    if (locationBuffer.size === 0) return;

    const updates = Array.from(locationBuffer.entries());
    locationBuffer.clear();

    for (const [trackingId, data] of updates) {
      const { latitude, longitude, status, estimatedArrival, actualDistance } =
        data;

      try {
        await DeliveryTracking.update(
          {
            location: Sequelize.fn(
              "ST_SetSRID",
              Sequelize.fn("ST_MakePoint", longitude, latitude),
              4326
            ),
            ...(status && { status }),
            ...(estimatedArrival && { estimated_arrival: estimatedArrival }),
            ...(actualDistance && { actual_distance: actualDistance }),
          },
          { where: { id: trackingId } }
        );
        Logger.debug(`DB updated for trackingId ${trackingId}`);
      } catch (err) {
        Logger.error(`Failed DB update for trackingId ${trackingId}:`, err);
      }
    }
  }, 5000);

  return io;
}

module.exports = setupSocket;
