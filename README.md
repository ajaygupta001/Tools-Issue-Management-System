# 🧰 Tools Issue Management System

A full-stack MERN (MongoDB, Express, React, Node.js) web application to manage tools issued and returned by mechanics, with secure admin and mechanic authentication.

---

## 📌 Features

### ✅ Admin Panel
- Admin login with protected access
- Add new tools with name, category, quantity, and image
- View all available tools
- Protected routes via JWT & Role-based authorization

### ✅ Mechanic Panel
- Mechanic registration with:
  - Name, Email, Mobile, Password, Picture, and Level
- Login with authentication
- View available tools
- Issue a tool (only if available)
- Return issued tools
- View Issue Register
- Logout

---

## 🛠 Tech Stack

| Frontend | Backend | Database |
|----------|---------|----------|
| React.js | Node.js + Express.js | MongoDB |

Other Tools:
- Axios
- JWT Authentication
- Multer (for file uploads)
- Tailwind CSS / Basic CSS

---

## 🚀 Installation & Setup

### 1. Clone the repo

//Backend
--npm i 
--npm run start

//frontend
--npm i
--npm run dev

```bash
git clone https://github.com/ajaygupta001/Tools-Issue-Management-System.git
cd Tools-Issue-Management-System

//add .env file 
PORT=5000
MONGO_URI=mongodb://localhost:27017/tools-management
JWT_SECRET=your_jwt_secret_key
