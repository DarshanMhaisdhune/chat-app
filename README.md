# 💬 Full Stack Chat App

A real-time chat application built with:

- 🧠 **Frontend**: React.js + WebSockets (SockJS + STOMP)
- 🔧 **Backend**: Spring Boot + WebSocket + REST API
- 🗃️ **Database**: (Add your DB here – e.g., PostgreSQL, MySQL)

---

## 📦 Project Structure

/project-root │ ├── frontend/ # React-based client app │ └── ...
│ ├── backend/ # Spring Boot backend │ └── ... │ └── README.md # You're here!

yaml
Copy
Edit

---

## 🚀 Getting Started

### 🖥️ Frontend Setup (`React`)

```bash
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

🧪 Backend Setup (Spring Boot)
bash
Copy
Edit
cd backend
./mvnw spring-boot:run
Runs on: http://localhost:8080

Make sure your backend exposes WebSocket at /ws-chat and APIs at /api/v1/rooms

🔐 Features
✅ Join/Create chat rooms

✅ Unique usernames per room

✅ Real-time messaging via WebSocket (STOMP protocol)

✅ Persistent user and room data

✅ Smooth UI with TailwindCSS

