const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const WelcomeEmail = (first_name) => {
  const templatePath = path.join(__dirname, "welcome-email.hbs"); // same folder
  const templateSource = fs.readFileSync(templatePath, "utf8");
  const template = handlebars.compile(templateSource);

  return template({
    firstName: first_name,
    currentYear: new Date().getFullYear(),
  });
};

module.exports = { WelcomeEmail };
