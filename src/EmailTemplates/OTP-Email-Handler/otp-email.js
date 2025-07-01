const fs = require("fs");
const path = require("path");  
const handlebars = require("handlebars");

const OTPTemplate = (otp_code) => {
  const templatePath = path.join(__dirname, "otp-email.hbs");  // same folder
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);

  return template({
    otpCode: otp_code,
    currentYear: new Date().getFullYear(),
  });
};

module.exports = { OTPTemplate };
