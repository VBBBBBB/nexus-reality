# Nexus Reality - Premium Real Estate Ecosystem

Nexus Reality is a comprehensive MERN stack platform designed to streamline the property buying, selling, and management experience. Beyond just listings, it provides an entire ecosystem of home-related services.

---

## 🚀 Teammate Setup Guide

Welcome to the team! Follow these steps to get the environment running on your local machine.

### 1. Prerequisites
Ensure you have the following installed:
- **Node.js**: (v16+ recommended)
- **Git**: For version control
- **MongoDB**: Access to a MongoDB Atlas cluster or a local MongoDB instance.
- **Google Account**: For setting up Gmail SMTP and Google OAuth.

### 2. Clone the Repository
```bash
git clone https://github.com/VBBBBBB/nexus-reality.git
cd nexus-reality
```

### 3. Backend Implementation
Navigate to the backend folder and prepare the environment.
```bash
cd backend
npm install
```

**Create a `.env` file in the `backend` folder:**
```env
# Database & Server
MONGO_URI=your_mongodb_connection_string
PORT=5000
NODE_ENV=development

# Security
JWT_SECRET=generate_strong_random_key_here

# Auth
GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Email Configuration (for Forgot Password)
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_16_char_app_password
EMAIL_FROM=your_gmail@gmail.com

# Deployment/Local Links
FRONTEND_URL=http://localhost:5173

# Master Credentials (for Seed Script)
ADMIN_EMAIL=admin@nexusreality.com
ADMIN_PASSWORD=admin123
```

**Run Backend:**
```bash
npm run dev
```

### 4. Frontend Implementation
Open a new terminal, navigate to the frontend folder.
```bash
cd frontend
npm install
```

**Create a `.env` file in the `frontend` folder:**
```env
VITE_API_URL=http://localhost:5000
```

**Run Frontend:**
```bash
npm run dev
```

---

## ✨ Features Implemented

### 🛡️ Authentication & Authorization
- **Dual-Login System**: Secure Email/Password login or 1-click **Google OAuth**.
- **Role-Based Access Control (RBAC)**: 
  - **Superadmin**: Can create Admins and manage all users.
  - **Admin**: Can manage properties and regular users (Buyer/Seller).
  - **Seller/Buyer**: Standard user roles.
- **Secure Sessions**: JWT-based authentication with `Helmet` security headers and Rate Limiting.

### 👥 User Management & Security
- **Admin Dashboard**:
  - **User List**: Search by Name, Email, Phone, Role, or Date.
  - **Excel Export**: Download full user reports.
  - **Deletion Policy**: Admins can delete users (cascading delete of properties).
- **Self-Service**: Users can delete their own accounts via the "Danger Zone" in Profile.
- **Account Recovery**: Full email-based password reset flow.

### 🏠 Property Marketplace
- **Comprehensive Listings**: Add properties with details like Listing Type (Rent, Resale, New), BHK, Area, and Price.
- **Dynamic Search**: Filter properties by Location, BHK, Budget, and Listing Type.
- **Sponsored Listings**: Sellers can instantly publish properties by paying a premium via UPI (integrated QR code system).
- **Admin Oversight**: Dedicated admin panel to **Verify**, **Reject**, or **Delete** properties and track transaction IDs.

### 📨 Communication & Inquiries
- **Direct Interest**: Buyers can send inquiries directly from property detail pages.
- **Inquiry Management**: Buyers can track their previous inquiries; Sellers/Admins can manage leads effortlessly.

### 🤝 Ecosystem Services
- **Full Support**: Information on professional in-house services:
    - In-house Legal Team for title verification.
    - Premium Painting Services.
    - Professional Document Handling.
    - Deep Cleaning & Move-in ready services.

---

## 🛠️ Key Scripts

| Command | Location | Description |
| :--- | :--- | :--- |
| `npm run dev` | /backend | Starts the Express server with Nodemon (Port 5000) |
| `npm run dev` | /frontend | Starts the Vite development server (Port 5173) |
| `npm run create-admin` | /backend | Seed script to create a standard Admin account |
| `npm run create-superadmin` | /backend | Seed script to create a Superadmin account |
| `npm run delete-admin` | /backend | Maintenance script to remove admin privileges |
