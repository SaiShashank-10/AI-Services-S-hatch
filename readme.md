# 🚀 AI-Services-S-hatch

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PNPM](https://img.shields.io/badge/PNPM-F69220?style=for-the-badge&logo=pnpm&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Active-success?style=for-the-badge)

> 🌟 **AI-Services-S-hatch** is a modern, AI-powered services platform built with **Next.js** + **TypeScript**, designed for S-hatch.  
> It offers modular components, clean architecture, and easy deployment — ready for production.

---

## 📚 Table of Contents

1. [✨ Features](#-features)  
2. [🛠 Tech Stack](#-tech-stack)  
3. [📂 Folder Structure](#-folder-structure)  
4. [⚡ Quick Start](#-quick-start)  
5. [⚙️ Environment Variables](#️-environment-variables)  
6. [📧 Email Setup](#-email-setup)  
7. [🚀 Deployment](#-deployment)  
8. [🧪 Testing & Linting](#-testing--linting)  
9. [🐛 Troubleshooting](#-troubleshooting)  
10. [🤝 Contributing](#-contributing)  
11. [📌 Roadmap](#-roadmap)  
12. [📜 License](#-license)  

---

## ✨ Features

- ⚡ **Next.js App Router** for modern routing and SSR/SSG
- 📦 Modular **TypeScript** components
- 🎨 Global & component-level styles
- 📬 Email configuration guide
- 🔑 Environment variables with `.env.example`
- 📂 Organized folder structure for scalability

---

## 🛠 Tech Stack

| Category         | Technologies |
|------------------|--------------|
| **Frontend**     | Next.js, TypeScript |
| **Styling**      | Tailwind CSS / PostCSS |
| **Package Manager** | PNPM |
| **Deployment**   | Vercel (recommended) |
| **Email**        | SMTP / Provider-based (see Email Setup) |

---

## 📂 Folder Structure

```plaintext
/
├─ app/                 # Pages, layouts, and routes
├─ components/          # Reusable UI components
├─ hooks/               # Custom React hooks
├─ lib/                 # Utilities & helpers
├─ public/              # Static assets
├─ styles/              # Global styles
├─ env.example          # Environment variable template
├─ EMAIL_SETUP.md       # Email configuration guide
├─ package.json         # Scripts & dependencies
├─ pnpm-lock.yaml       # PNPM lockfile
└─ README.md
```

---

## ⚡ Quick Start

```bash
# 1️⃣ Clone the repository
git clone https://github.com/SaiShashank-10/AI-Services-S-hatch.git
cd AI-Services-S-hatch

# 2️⃣ Install dependencies
pnpm install

# 3️⃣ Copy environment variables
cp env.example .env.local

# 4️⃣ Start development server
pnpm dev
```

Visit **[http://localhost:3000](http://localhost:3000)** 🎉

---

## ⚙️ Environment Variables

Your `.env.example` contains all required variables.  
Example:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

---

## 📧 Email Setup

We’ve included `EMAIL_SETUP.md` with full steps.  
Typical setup:

1. Choose an email provider (Gmail, SendGrid, Mailgun, etc.)
2. Generate SMTP credentials or API key
3. Add them to `.env.local`
4. Restart the dev server

---

## 🚀 Deployment

**Vercel** is the recommended platform for this project.

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

1. Push your repo to GitHub
2. Connect repo to Vercel
3. Set environment variables in Vercel Dashboard
4. Deploy 🚀

---

## 🧪 Testing & Linting

```bash
# Lint
pnpm lint

# Tests (if configured)
pnpm test
```

---

## 🐛 Troubleshooting

- **Port already in use:** Change `PORT` in `.env.local`
- **Env variables not loading:** Restart dev server
- **Tailwind not applying styles:** Check `tailwind.config.js` & PostCSS config

---

## 🤝 Contributing

1. Fork this repo 🍴  
2. Create a branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m 'Add feature'`  
4. Push branch: `git push origin feature-name`  
5. Open a Pull Request ✅

---

## 📌 Roadmap

- [ ] Add automated tests
- [ ] Improve SEO & meta tags
- [ ] Add multi-language support
- [ ] Enhance email templates

---

## 📜 License

Licensed under the **MIT License**.

---

💡 _Built with ❤️ by [Sai Shashank](https://github.com/SaiShashank-10)_
