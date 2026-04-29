# 🤖 ChatBot AI - Premium Assistant

A modern, full-stack AI-powered chat application inspired by Telegram. Features a sleek dark theme, real-time AI conversations, and persistent user authentication.

---

## ✨ Features

- 🔐 **Secure Auth**: JWT-based user registration and login with password hashing.
- 🧠 **AI Intelligence**: Integrated with OpenAI GPT-3.5-Turbo for smart, context-aware responses.
- 🎨 **Premium UI**: Telegram-inspired dark theme with glassmorphism, pulse animations, and responsive design.
- 📱 **Adaptive Layout**: Works seamlessly on mobile and desktop devices.
- 🕒 **Persistent History**: Chat history and user profiles stored securely in MongoDB.
- 🔖 **Productivity Tools**: Bookmarks, History, and Personalized Settings.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Tailwind CSS** (Styling)
- **Lucide React** (Icons)
- **Axios** (API Client)
- **React Router** (Navigation)

### Backend
- **Node.js & Express**
- **Mongoose** (MongoDB Object Modeling)
- **OpenAI SDK** (AI Core)
- **Bcryptjs** (Security)
- **JSONWebToken** (Authentication)

---

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- MongoDB Atlas account (or local MongoDB)
- OpenAI API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sruthi939/ChatBot.git
   cd ChatBot
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_random_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the App

1. **Start Backend Server**
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend Dev Server**
   ```bash
   cd frontend
   npm run dev
   ```

The app will be available at `http://localhost:5173`.

---

## 🛡️ License
Distributed under the ISC License. See `LICENSE` for more information.

## 👤 Author
**Sruthi** - [GitHub Profile](https://github.com/sruthi939)
