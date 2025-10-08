import Brevo from "@getbrevo/brevo";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// ------------------- Brevo API -------------------
const client = new Brevo.TransactionalEmailsApi();
client.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

export async function sendEmail({ to, subject, html }) {
  try {
    const emailPayload = {
      sender: { email: process.env.BREVO_SENDER_EMAIL, name: "AnantaMart" },
      to: [{ email: to }],
      subject,
      htmlContent: html,
    };
    const response = await client.sendTransacEmail(emailPayload);
    console.log("✅ Email sent via Brevo API:", response);
    return response;
  } catch (error) {
    console.error("❌ Brevo API error:", error?.response || error?.body || error);
    throw error;
  }
}

// ------------------- Optional: SMTP fallback -------------------
export const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});
