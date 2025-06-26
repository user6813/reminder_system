import nodemailer from 'nodemailer';
import { resolve } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

// Configure the transporter (example uses Gmail, update as needed)
const transporter = nodemailer.createTransport({
  service: process.env.MAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

console.log("mail", process.env.MAIL_USER, process.env.MAIL_PASS)

/**
 * Send a reminder email
 * @param toEmail - Recipient's email address
 * @param subject - Email subject
 * @param html - HTML content of the email
 * @returns Promise<void>
 */
export async function sendReminderMail(toEmail: string, subject: string, html: string): Promise<void> {
  const mailOptions = {
    from: process.env.MAIL_USER,
    to: toEmail,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
