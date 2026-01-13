# Nexus Reality - Modern Real Estate Platform

A full-stack MERN (MongoDB, Express, React, Node) application for buying, selling, and managing properties with premium features.

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- Gmail App Password (for email features)
- Google Cloud Console Project (for Google Auth)

### 🛠️ Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/VBBBBBB/nexus-reality.git
   cd nexus-reality
   ```

2. **Backend Configuration:**
   - Navigate to the `backend` folder.
   - Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   GOOGLE_CLIENT_ID=your_google_id
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   EMAIL_FROM=your_email@gmail.com
   FRONTEND_URL=http://localhost:5173
   ```
   - Install dependencies and start:
   ```bash
   npm install
   # Create the first admin (optional)
   npm run create-admin
   npm run dev
   ```

3. **Frontend Configuration:**
   - Navigate to the `frontend` folder.
   - Create a `.env` file and add:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
   - Install dependencies and start:
   ```bash
   npm install
   npm run dev
   ```

## ✨ Features
- **Google Authentication**: One-click login.
- **Admin Dashboard**: Verification and management of properties.
- **Full-Service Ecosystem**: In-house legal, painting, and cleaning services.
- **Forgot Password**: Secure email-based recovery.
- **SEO Optimized**: Modern, responsive design.
