import nodemailer from "nodemailer";
import { EMAIL_USERNAME, EMAIL_PASSWORD } from "./env.js";

export const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD,
      },
    });

    const mailOption = {
      from: EMAIL_USERNAME,
      to: email,
      subject,
      text,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};
