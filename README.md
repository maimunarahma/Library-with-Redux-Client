# 📚 Library Management System (Minimal - RTK Query + TypeScript)

A clean and functional full-stack **Library Management System** built with **React**, **Redux Toolkit Query (RTK Query)**, **TypeScript**, and **Node.js**. This project demonstrates proper state management, modular architecture, responsive UI, and REST API integration.

---

## 🔗 Live Site (if available)

[View Live Application](https://your-live-link.netlify.app)

---

## 🧠 Features Overview

### ✅ 1. Public Access
- All routes are open—**no authentication** required.
- Focused purely on book and borrow functionalities.

### 📘 2. Book Management
- View all books in a **responsive table**.
- Each book displays:
  - Title, Author, Genre, ISBN, Description, Copies, Availability.
- Actions:
  - **➕ Add Book**: Form to add new book.
  - **✏️ Edit Book**: Modify existing book data.
  - **🗑️ Delete Book**: Confirmation before removal.
  - **📦 Borrow Book**: Open borrow form.

#### Business Logic:
- If `copies = 0`, the book is marked as **Unavailable**.
- New books default to `available = true`.

### 📥 3. Borrow Book
- Opens a borrow form from book list.
- Fields: Quantity, Due Date.
- Validations:
  - Quantity must be ≤ available copies.
  - After borrowing, `copies` decrease.
  - If copies become 0, book is marked unavailable.
- Redirects to **borrow summary** after success.

### 📊 4. Borrow Summary
- Shows **total borrowed quantity** for each book.
- Columns: Book Title, ISBN, Total Borrowed.
- Data fetched via aggregation API.

---

## 🧭 Route Structure

| Path                 | Purpose                             |
|----------------------|--------------------------------------|
| `/books`             | Show all books with actions          |
| `/create-book`       | Add new book                         |
| `/books/:id`         | View single book details             |
| `/edit-book/:id`     | Edit book details                    |
| `/borrow/:bookId`    | Borrow a specific book               |
| `/borrow-summary`    | Summary of all borrowed books        |

---

## 🖥️ Tech Stack

| Layer         | Technology                     |
|---------------|--------------------------------|
| Frontend      | React, TypeScript              |
| State Mgmt    | Redux Toolkit + RTK Query      |
| Styling       | Tailwind CSS                   |
| Backend       | Node.js, Express.js            |
| Database      | MongoDB, Mongoose              |

---

## ⚙️ Backend Structure (MVC)

### 🗂️ Models:
- **Book**:
  - `title`, `author`, `genre`, `isbn`, `description`, `copies`, `available`
- **Borrow**:
  - `bookId`, `quantity`, `dueDate`

### 🔁 Controllers & Routes:
- **Books**:
  - Create, Read (all & single), Update, Delete
- **Borrows**:
  - Borrow book, Borrow summary (aggregated)

### 🔒 Error Handling:
- Consistent API responses
- Validations for borrow logic

---

## 🌐 API Integration (Frontend)

- All API calls handled via **RTK Query**
- Strongly typed endpoints
- Optimistic updates for smooth UX

---

## 🎨 UI/UX Highlights

- Minimalist, clean interface
- Fully **responsive** on all devices
- Easy navigation via **Navbar**
- **Toast notifications** for feedback (bonus)
- Accessible forms & intuitive layout

---

## 📁 Folder Structure (Frontend)

src/
│
├── app/ # Redux store
├── components/ # Reusable UI components
├── features/
│ ├── books/ # Book-related slices & queries
│ └── borrows/ # Borrow-related slices & queries
├── pages/ # Route components
├── routes/ # React Router setup
├── types/ # TypeScript types/interfaces
└── main.tsx # App entry


---

## 🚀 Bonus Features Implemented

| Feature                | Points |
|------------------------|--------|
| ✅ Optimistic UI       | +2     |
| ✅ Toast Notifications | +2     |
| ✅ Responsive Layout   | +4     |
| ✅ Type-Safe Forms     | +2     |

---

## 🛠️ Setup Instructions

### 📦 1. Backend

```bash
cd backend
npm install
npm run dev
# MongoDB must be running locally or via Atlas
