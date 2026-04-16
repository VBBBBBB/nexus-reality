# Software Requirements Specification (SRS) - Nexus Reality

## 1. Introduction

### 1.1 Purpose
The purpose of this document is to provide a comprehensive description of the **Nexus Reality** platform. It outlines the functional and non-functional requirements, the system architecture, and the intended user roles to ensure all stakeholders have a clear understanding of the project's scope and objectives.

### 1.2 Scope
Nexus Reality is a premium real estate ecosystem built using the MERN stack (MongoDB, Express, React, Node.js). It aims to streamline property transactions (Buying, Selling, Renting) while providing integrated home-related services such as legal assistance, painting, and cleaning.

### 1.3 Definitions, Acronyms & Abbreviations
*   **MERN**: MongoDB, Express.js, React, Node.js.
*   **RBAC**: Role-Based Access Control.
*   **JWT**: JSON Web Token (used for secure authentication).
*   **SRS**: Software Requirements Specification.
*   **UPI**: Unified Payments Interface (used for sponsored listings).

### 1.4 References
*   [Project README](file:///c:/Users/VSK/Desktop/Web/nexus-reality/README.md)
*   [IEEE Standard for Software Requirements Specifications (IEEE Std 830-1998)](https://standards.ieee.org/standard/830-1998.html)

### 1.5 Overview
This document covers the overall description of the product, including its perspective, functions, and user characteristics. It also details specific requirements such as external interfaces, performance, and security attributes.

---

## 2. Overall Description

### 2.1 Product Perspective
Nexus Reality is a standalone web application designed for a modern real estate marketplace. It utilizes a centralized database for property listings and user data, providing a unified experience across different user roles.

#### 2.1.1 System Interfaces
*   **Database**: MongoDB (Atlas/Local) for data persistence.
*   **Email Engine**: Gmail SMTP for password resets and system notifications.
*   **OAuth**: Google OAuth 2.0 for simplified user authentication.

#### 2.1.2 User Interfaces
*   Responsive web interface optimized for both desktop and mobile devices.
*   Interactive property cards with image galleries and detailed specifications.
*   Admin dashboard for system-wide management and analytics.

#### 2.1.3 Hardware Interfaces
*   Browser-compatible devices (PC, Laptop, Tablet, Smartphone).

#### 2.1.4 Software Interfaces
*   **Backend**: Node.js & Express.js.
*   **Frontend**: React.js with Vite.
*   **Security**: Helmet.js, Rate Limiting, and JWT.

#### 2.1.5 Communications Interfaces
*   HTTPS for secure data transmission.
*   SMTP for email communications.

#### 2.1.6 Memory Constraints
*   Standard web hosting environment; data size handled efficiently by MongoDB indexing.

#### 2.1.7 Operations
*   User registration and multi-role login.
*   Property lifecycle management (Draft, Publish, Verify, Reject).
*   Sponsored listing upgrades via UPI payment verification.

#### 2.1.8 Site Adaptation Requirements
*   Environment configurations via `.env` files for backend and frontend URLs, API keys, and database URIs.

### 2.2 Product Functions
*   **Authentication**: Secure email/password login and Google OAuth integration.
*   **User Management**: Role-based access for Superadmin, Admin, Seller, and Buyer.
*   **Property Marketplace**: Searchable listings with filters for Location, BHK, Price, and Listing Type.
*   **Inquiry System**: Direct communication channel between Buyers and Sellers/Admins.
*   **Premium Feature**: Sponsored listings with UPI/QR code-based payment tracking.
*   **Ecosystem Services**: In-house support for legal, painting, cleaning, and document handling.

### 2.3 User Characteristics
*   **Buyers**: Individuals looking to buy or rent properties with trust and ease.
*   **Sellers**: Property owners or agents listing properties for sale/rent.
*   **Admins**: Operational staff managing property verification and user reports.
*   **Superadmins**: System owners managing administrative personnel and global settings.

### 2.4 Constraints
*   Requires active internet connection and modern web browser support.
*   Payment verification for sponsored listings is currently manual via Transaction IDs.

### 2.5 Assumptions and Dependencies
*   Users have access to Gmail for account recovery.
*   MongoDB instance is reliable and accessible via the specified connection string.

### 2.6 Apportioning of Requirements
*   Future iterations may include automated payment gateway integration (e.g., Stripe/Razorpay) and dedicated mobile applications.

---

## 3. Specific Requirements

### 3.1 External Interface Requirements
#### 3.1.1 User Interfaces
*   **Home Page**: Featured properties, search bar, and service categories.
*   **Property Detail**: High-quality images, BHK details, price, and inquiry form.
*   **Dashboards**: Tailored views for Sellers (listings) and Admins (verification).

#### 3.1.2 Hardware Interfaces
Standard browser compatibility requirements.

#### 3.1.3 Software Interfaces
Detailed in Section 2.1.4.

#### 3.1.4 Communication Interfaces
Detailed in Section 2.1.5.

### 3.2 Specific Requirements
#### 3.2.1 Data Models (Classes)
*   **User**: `name`, `email`, `password`/`googleId`, `phone`, `role`.
*   **Property**: `title`, `description`, `price`, `location`, `bhk`, `area`, `listingType`, `propertyType`, `status`.
*   **Enquiry**: `propertyId`, `buyerId`, `sellerId`, `message`.

### 3.3 Performance Requirements
*   Load time under 2 seconds for the landing page.
*   Scalable database queries to handle large sets of property listings.

### 3.4 Design Constraints
*   Premium "Nexus Reality" aesthetic: Dark mode support, glassmorphism, and glowing effects.
*   Consistency across all components (Navbar, Footer, Cards).

### 3.5 Software System Attributes
#### 3.5.1 Reliability
*   Robust error handling in backend controllers to prevent server crashes.
*   Data validation at both Schema (Mongoose) and Frontend levels.

#### 3.5.2 Availability
*   99.9% availability through deployment on reliable cloud platforms (e.g., AWS, Render, Docker).

#### 3.5.3 Security
*   JWT-based session management.
*   Password hashing using bcrypt.
*   Protection against common web vulnerabilities via Helmet.js.

#### 3.5.4 Maintainability
*   Modular directory structure (controllers, models, routes).
*   Clear separation of concerns between frontend and backend.

### 3.6 Other Requirements
*   **Data Export**: Capability to export user reports to Excel for administrative use.
*   **Deletion Policy**: Cascading deletion for users and their associated properties.

---

## 4. Supporting Information

### 4.1 Table of Contents
*   Generated automatically by the documentation renderer.

### 4.2 Appendixes
*   API Documentation (planned post-implementation).
*   User Guide for QR-based Sponsored Listings.
