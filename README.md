# 🕒 Online Reminder – Full Stack Project

This is a **Full Stack Online Reminder Application** built using **Turborepo Architecture**.  
Users can **register**, **log in**, and **create reminders**. When a reminder's time is near, the user receives an **email notification** to their registered email address.

---

## 📦 Tech Stack

- Monorepo Management: **Turborepo**
- Package Manager: **pnpm**
- Frontend: (React/Next.js or other - *you can mention here*)
- Backend: (Node.js/Express or other - *you can mention here*)
- Database: (PostgreSQL/MongoDB or other - *you can mention here*)
- Email Service: (e.g., Nodemailer/Gmail SMTP/etc.)

---

## 🚀 Features

- ✅ User Registration and Authentication
- ✅ Create, View, and Manage Reminders
- ✅ Email Notifications before Reminder Time
- ✅ Environment-configurable with `.env` support

---

## 🛠️ Prerequisites

Ensure the following are installed:

- **pnpm** (If not installed, run the command below)

\`\`\`bash
npm install -g pnpm
\`\`\`

---

## 📥 Installation

Follow the steps below to run the project locally:

1. **Clone the Repository**

\`\`\`bash
git clone <your-repo-url>
\`\`\`

2. **Navigate to the Project Directory**

\`\`\`bash
cd <project-folder-name>
\`\`\`

3. **Install Dependencies**

\`\`\`bash
pnpm install
\`\`\`

4. **Setup Environment Variables**

- Copy contents from \`example.env.txt\`  
- Create a new \`.env\` file in the root directory  
- Paste the copied contents and update the values as per your configuration

\`\`\`bash
cp example.env.txt .env
# then edit .env and update the variables
\`\`\`

5. **Run the Development Server**

\`\`\`bash
pnpm run dev
\`\`\`

---

## 📧 Email Notifications

Reminders will automatically trigger email notifications close to the scheduled time. Make sure your SMTP/email configuration in \`.env\` is correctly set up.

---

## 📂 Project Structure (Turborepo Layout)

Example structure:

\`\`\`
apps/
  - web/         # Frontend
  - api/         # Backend/API
packages/
  - config/      # Shared config (e.g., eslint, tsconfig)
  - utils/       # Shared utilities
.env
example.env.txt
\`\`\`

---

## 📌 Notes

- Email reminder timings and intervals can be configured from backend scheduler or cron service (implementation-specific).
- If using external SMTP (e.g., Gmail), make sure to enable less secure apps or use App Passwords if required.