# Fullstack Golang React Project

Project ini merupakan aplikasi **Fullstack Web Application** yang dibuat pada bootcamp **Fullstack Golang React** dari Santri Coding.  
Aplikasi ini menggunakan **Golang (Gin Framework)** sebagai backend API dan **React + Typescript** sebagai frontend.

---

## 🚀 Tech Stack

### Backend
- Go (Golang)
- Gin Framework
- Golang Router
- GORM (ORM Golang)
- Air (Hot Reload Development)

### Frontend
- React
- React Router
- TanStack Query
- Axios
- TypeScript
- JS Cookie
- Tailwind CSS

---

## 📂 Project Structure

```
project-root
│
├── api-golang        # Backend Golang API
│   ├── config
│   ├── controllers
│   ├── database
│   ├── helpers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── structs
│   └── main.go
│
└── client    # Frontend React App
```

---

## ⚙️ Backend Setup (Golang)

1. Masuk ke folder backend

```bash
cd api-golang
```

2. Install dependencies

```bash
go mod tidy
```

3. Copy file environment

```bash
cp .env.example .env
```

4. Jalankan server

```bash
air
```

atau

```bash
go run main.go
```

Server akan berjalan di:

```
http://localhost:8080
```

---

## 💻 Frontend Setup (React)

1. Masuk ke folder frontend

```bash
cd client
```

2. Install dependencies

```bash
npm install
```

3. Jalankan project

```bash
npm run dev
```

Frontend akan berjalan di:

```
http://localhost:5173
```

---

## 🔐 Environment Variables

Contoh konfigurasi `.env`

```
APP_PORT=8080

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=database_name

JWT_SECRET=your_secret_key
```

---

## 📦 Features

- Authentication (Login / Register)
- JWT Authentication
- RESTful API
- Protected Routes
- Data Fetching dengan TanStack Query
- Cookie Authentication
- Responsive UI dengan Tailwind CSS
- CRUD Data User
- Dashboard

---

## 🎓 Learning Source

Project ini dibuat sebagai bagian dari pembelajaran pada bootcamp:

**Santri Coding – Fullstack Golang React**

---

## 📜 License

Project ini dibuat untuk tujuan pembelajaran.