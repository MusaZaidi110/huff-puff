const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const three_days_noorder = (promo_code) => {
  const templatePath = path.join(__dirname, "3days-noorder.hbs"); // same folder
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);

  return template({
    currentYear: new Date().getFullYear(),
  });
};

module.exports = { OTPTemplate };
