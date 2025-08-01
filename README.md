# 📚 Booked – Frontend

**Booked** is a modern online bookstore inspired by the original Amazon.com. This frontend project is built with React, allowing users to browse, borrow, and purchase books while admins manage the store. It supports two user roles with distinct capabilities.


## Backend Repo    
https://github.com/corenetabitha/booked-backend

##  User Stories

###  Admin
- Login to the system
- Add, update, and delete books
- View all books
- Approve or reject book purchase orders
- Approve or reject lending requests

###  User
- Register and log in
- View all books in the store and library
- Search for books by name or genre
- Filter books by price, genre, and date uploaded
- Add books to purchasing or lending carts
- Checkout from both carts
- Pay for approved orders
- Request returns for lent books
- View past purchases and lendings

---

##  Features

- JWT Authentication (Login & Sign Up)
- Role-based access control
- Admin dashboard for book management
- User dashboard with cart, history, and search
- Book filters and genre-based browsing
- Tailwind CSS styled UI with responsive design
- Axios-powered API integration

---

##  Tech Stack

- **Frontend:** React + Vite
- **State Management:** Redux Toolkit
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios

---

## Local Setup

```bash
# Clone the repository
git clone https://github.com/corenetabitha/project-frontend.git
cd booked-frontend

# Install dependencies
npm install

# Start the development server
npm run dev
