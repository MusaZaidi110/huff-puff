const DeviceToken = require("../../Models/Notification/DeviceToken.Model");
const Logger = require("../../Utils/Logger");

const CreateDeviceToken = async (req, res) => {
  Logger.debug("Handling device token...");
  const {userId, token, type} = req.body;
  const device = await DeviceToken.findOne({
    where: { device_token: token },
  });

  if (device) {
    device.user_id = userId;
    device.device_type = type;
    device.is_active = true;
    await device.save();
    Logger.info("Updated existing device token", {
      deviceId: device.id,
      userId,
    });
  } else {
    const newDevice = await DeviceToken.create(
      {
        user_id: userId,
        device_token: token,
        device_type: type,
        is_active: true,
      }
    );
    Logger.info("Created new device token", { deviceId: newDevice.id, userId });
  }
};


module.exports = {CreateDeviceToken}