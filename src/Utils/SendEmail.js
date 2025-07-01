const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  }
});

// Send email to a single recipient
async function sendEmail({ to, subject, template }) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html: template,
    });
    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
}

// Send email to multiple recipients (bulk)
// recipients: array of email strings
async function emailBulkSend({ recipients, subject, template }) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      bcc: recipients.join(","), // send as BCC to keep addresses private
      subject,
      html: template,
    });
    return true;
  } catch (error) {
    console.error("Bulk email send error:", error);
    return false;
  }
}

module.exports = { sendEmail, emailBulkSend };
