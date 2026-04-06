# ExpenseTracker

🔗 **Live Demo:** https://expense-tracker-63yd.vercel.app/

---

## 📌 Overview

The **Expense Tracker Web App** is a modern, responsive financial management application that helps users track income and expenses, analyze spending patterns, and gain actionable insights.

Built using **React, Redux, and Tailwind CSS**, the app focuses on:
- Clean UI/UX  
- Real-time updates  
- Data visualization  
- Role-based access  

---

## 🚀 Features

### 📊 Dashboard & Analytics
- Balance tracking over time using **Area Chart**
- Category-wise breakdown using **Pie Chart**
- Financial insights with intelligent analysis

---

### 💳 Transaction Management
- Add, edit, and delete transactions  
- Duplicate detection before adding entries  
- Pagination, sorting, and filtering  
- Organized transaction history  

---

### 🔍 Smart Filters
- Search by title, category, or description  
- Filter by:
  - Type (Income/Expense)  
  - Category  
  - Date  
- Filters persist using localStorage  

---

### 📈 Financial Insights
- Detects:
  - Highest spending category  
  - Monthly expense trends  
  - Percentage increase/decrease  
- Provides smart suggestions based on spending  

---

### 👤 Authentication & Roles
- Mock authentication system  
- Role-based access:
  - **Admin:** Add/Edit/Delete transactions  
  - **Viewer:** Read-only access  
- Role saved in localStorage  

---

### 🌗 UI/UX Features
- Dark / Light mode toggle  
- Fully responsive design  
- Smooth animations and transitions  
- Splash screen on app load  
- Modern glassmorphism UI  

---

### 📦 Data Handling
- Redux for global state  
- LocalStorage for persistence  
- Optimized rendering using memoization  

---

## 📌 Assignment Mapping (Zorvyn Requirements)

This project fulfills all the requirements of the Finance Dashboard UI assignment:

### 1. Dashboard Overview
- Summary cards (Balance, Income, Expenses) implemented  
- Time-based visualization using Area Chart  
- Category-based visualization using Pie Chart  

### 2. Transactions Section
- Displays transactions with date, amount, category, and type  
- Includes:
  - Search  
  - Filtering  
  - Sorting  
  - Pagination  

### 3. Role-Based UI
- Admin: Add/Edit/Delete transactions  
- Viewer: Read-only access  
- Role switching implemented on frontend  

### 4. Insights Section
- Highest spending category  
- Monthly comparison  
- Dynamic insights  

### 5. State Management
- Redux Toolkit for global state  
- LocalStorage for persistence  

### 6. UI/UX
- Responsive design  
- Dark mode  
- Handles empty states  

---

## 🧠 Approach
The application is designed with a focus on simplicity, scalability, and user experience, aligning with the assignment requirements.

### 🔹 Component-Based Architecture
The app is divided into reusable components:
- Dashboard (charts + stats)
- Transactions (list + filters + form)
- UI components (modal, input, button)

---

### 🔹 State Management
- `authSlice` → user & role management  
- `transactionsSlice` → transaction CRUD + storage  
- `filtersSlice` → filtering logic  

---

### 🔹 Data Flow

1. App loads → Splash screen  
2. Transactions fetched from service  
3. Stored in Redux + localStorage  
4. UI updates automatically  
5. Charts & insights update dynamically  

---

### 🔹 Services
- `transactionService` → handles CRUD operations  
- `authService` → handles authentication logic  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Redux Toolkit  
- Tailwind CSS  
- Recharts  
- Lucide Icons  

### State & Storage
- Redux  
- LocalStorage  

### Deployment
- Vercel  

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/the-Shikha/Expense-Tracker.git
cd frontend
```

### 2️⃣ Install Dependencies
```bash
npm install
```


### 3️⃣ Run the Development Server
```bash
npm run dev
```

### 4️⃣ Open in Browser
```bash
http://localhost:5173
```

---


## 📂 Project Structure
```bash
src/
│── components/
│   ├── dashboard/
│   │   ├── BalanceChart.jsx
│   │   ├── CategoryChart.jsx
│   │   ├── Insights.jsx
│   ├── transactions/
│   │   ├── TransactionList.jsx
│   │   ├── TransactionForm.jsx
│   │   ├── TransactionFilters.jsx
│   ├── ui/
│       ├── Button.jsx
│       ├── Card.jsx
│       ├── Input.jsx
│       ├── Modal.jsx
│       ├── Select.jsx
│
│── pages/
│   ├── Dashboard.jsx
│   ├── Auth.jsx
│
│── store/
│   ├── authSlice.js
│   ├── transactionsSlice.js
│   ├── filtersSlice.js
│   ├── store.js
│
│── services/
│   ├── authService.js
│   ├── transactionService.js
│
│── contexts/
│   ├── AuthContext.jsx
│
│── App.jsx
│── main.jsx
```

---


## 📊 How It Works

- User logs in (mock auth)
- Transactions are loaded
- Stored in Redux + localStorage
- Dashboard calculates:
    - Balance
    - Income
    - Expenses
- Charts visualize data
- Insights analyze spending
- Filters refine results

---


## 🎯 Key Highlights

- ⚡ Real-time UI updates
- 📊 Interactive charts
- 🧠 Smart insights system
- 🔐 Role-based access
- 📱 Fully responsive design
- 💾 Persistent storage

---


## 🔮 Future Improvements

- Real authentication (JWT / Firebase)
- Backend integration (Node.js + MongoDB)
- Export reports (PDF/CSV)
- Budget alerts & notifications
- Advanced analytics

---


## 👩‍💻 Author

Shikha Kumari (MERN Stack Developer)
