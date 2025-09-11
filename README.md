
# 🏠 RentFlow - Frontend

A modern, comprehensive web application for managing **rental properties, clients, contracts, and payments**.  
Built with **Next.js** and **Material-UI**, this application provides a clean, responsive, and intuitive interface for landlords and property managers.


## ✨ Core Features

- **📊 Dashboard Overview**  
  Unified dashboard with active contracts and a detailed financial overview, including grand totals.

- **🏘️ Property Management**  
  Add, list, and delete properties with detailed information.

- **👤 Client Management**  
  Maintain a complete record of clients, including contact and identification details.

- **📑 Contract Management**  
  Create rental contracts linking properties to clients, set terms, and terminate contracts when necessary.

- **💳 Payment Tracking**  
  View detailed payment schedules for each contract and mark payments as received.

- **🔐 Secure Authentication**  
  Login with Google OAuth, protected by CSRF tokens.

- **🎨 Modern UI/UX**  
  - Fully responsive design for desktop & mobile.  
  - Beautiful, consistent UI built with Material-UI.  
  - Seamless **dark & light mode** support.  
  - User-friendly data tables with pagination and filtering.

---

## 🛠️ Tech Stack

- **Framework:** 🚀 Next.js 14 (App Router)  
- **Language:** 🔷 TypeScript  
- **UI Library:** 🎨 Material-UI (MUI) v5  
- **Server State Management:** 🔄 TanStack Query (React Query)  
- **Form Management:** 📋 React Hook Form & Zod for validation  
- **Styling:** 💅 Emotion  
- **Date & Time:** 📅 date-fns & @mui/x-date-pickers  
- **Notifications:** 🔥 react-hot-toast  

---

## 🚀 Getting Started

Follow these instructions to run the project locally for development and testing.

### ✅ Prerequisites
- Node.js (v18 or later)  
- npm or yarn  
- A running instance of the **RentFlow Backend Server**

### ⚡ Installation

Clone the repository:
```bash
git clone <your-repository-url>
cd rentflow-frontend
```

Install dependencies:
```bash
npm install
```

Set up environment variables:  
Create a new file named `.env.local` in the root of the project and add:

```bash
# .env.local

# The full URL of your running backend server
NEXT_PUBLIC_API_URL=<your-backend-URL>
```

Run the development server:
```bash
npm run dev
```

The app should now be running at 👉 [http://localhost:3000](http://localhost:3000)

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` → Runs the app in development mode.  
- `npm run build` → Builds the app for production.  
- `npm run start` → Starts a production server.  
- `npm run lint` → Runs the linter for code quality checks.  

---

## 🚢 Deployment

This Next.js app is optimized for **Vercel**.  
Simply connect your GitHub repository to a new Vercel project, and deployment will happen automatically. 🚀

⚠️ Don’t forget to set the `NEXT_PUBLIC_API_URL` environment variable in your Vercel project settings to point to your deployed backend.

---