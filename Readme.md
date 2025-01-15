

# **Project Documentation: Financial Management Website**

## **1. Introduction**

This web application is built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. The platform focuses on:
- **Financial Education**: Educational articles to enhance users' financial literacy.
- **Expense Management**: Expense tracking with data visualization (using Chart.js) and CSV export functionality.
- **Loan Management**: Mock data to demonstrate loan and payment handling.

---

## **2. Features Overview**

### **2.1 Financial Education**
- Browse financial articles organized by categories like budgeting, savings, and investments.
- Search functionality to find specific topics.
- Like and bookmark articles for quick access.

### **2.2 Expense Management**
- Add, edit, and delete expense records.
- Visualize expenses using dynamic charts (e.g., pie charts, line charts).
- Export expense records as a CSV file.
- Sort expenses by category, date, or amount.

### **2.3 Loan Management**
- Display loan and repayment information using mock data.
- Visualize loan balances, repayments, and due dates.

---

## **3. Tech Stack**

### **3.1 Frontend**
- **React.js**: For building the user interface.
- **Chart.js**: For creating interactive and visually appealing charts.
- **CSS Framework**: Tailwind CSS or Material-UI for a clean and responsive design.

### **3.2 Backend**
- **Node.js**: Server-side runtime.
- **Express.js**: For building REST APIs.

### **3.3 Database**
- **MongoDB**: For storing articles and expense data.
- **Mock Data**: Static JSON files for loan management.

### **3.4 Additional Tools**
- **CSV Parsing Libraries**: For generating CSV files (e.g., `papaparse` or `json2csv`).
- **JWT Authentication**: Secure user sessions.

---

## **4. Directory Structure**

```
project/
│
├── client/                # React Frontend
│   ├── public/            # Static files
│   ├── src/
│       ├── components/    # Reusable components
│       ├── pages/         # Pages (Home, Articles, Expenses, Loans)
│       ├── styles/        # CSS/SCSS
│       ├── utils/         # Helper functions
│       ├── App.js         # Main app entry point
│
├── server/                # Node.js Backend
│   ├── models/            # MongoDB Models
│   ├── routes/            # API Routes
│   ├── controllers/       # Business Logic
│   ├── middlewares/       # Middleware (e.g., auth)
│   ├── server.js          # Main server entry point
│
├── mock-data/             # JSON files for mock loan data
│   ├── loans.json
│
├── package.json           # Dependencies and scripts
├── README.md              # Documentation
```

---

## **5. Features and Functionalities**

### **5.1 Financial Education**
- **APIs**:
  - `POST /api/articles` - Add a new article.
  - `GET /api/articles` - Fetch all articles.
  - `GET /api/articles/:id` - Fetch a specific article by ID.
  - `PUT /api/articles/:id` - Update an article.
  - `DELETE /api/articles/:id` - Delete an article.
- **Frontend Features**:
  - Display articles in a card layout.
  - Filter by categories or search by keywords.
  - Bookmark articles for future reference.

### **5.2 Expense Management**
- **APIs**:
  - `POST /api/expenses` - Add a new expense.
  - `GET /api/expenses` - Fetch all expenses.
  - `GET /api/expenses/reports` - Fetch categorized expense data.
  - `PUT /api/expenses/:id` - Update an expense.
  - `DELETE /api/expenses/:id` - Delete an expense.
- **Frontend Features**:
  - Add expenses with fields: amount, category, date, and description.
  - Display expense data in a tabular format.
  - Sort expenses by category, date, or amount.
  - Visualize expenses using Chart.js (e.g., pie chart for category distribution).
  - Export expenses to a CSV file.

### **5.3 Loan Management**
- **Mock Data**:
  - Stored in a `loans.json` file:
    ```json
    [
      {
        "loanId": "1",
        "type": "Personal Loan",
        "amount": 5000,
        "balance": 2000,
        "dueDate": "2025-02-01",
        "status": "Ongoing"
      },
      {
        "loanId": "2",
        "type": "Home Loan",
        "amount": 200000,
        "balance": 150000,
        "dueDate": "2025-06-15",
        "status": "Ongoing"
      }
    ]
    ```
- **Frontend Features**:
  - Display loan details in a card format.
  - Show repayment schedules and due dates.
  - Visualize loan balances with simple bar charts.

---

## **6. Home Page Design**

### **6.1 UI Layout**
- **Header**: Navigation menu with links to Financial Education, Expense Management, Loan Management, and User Profile.
- **Hero Section**: A clean banner introducing the application.
- **Feature Highlights**: 
  - Cards summarizing key features: "Learn Finance," "Track Expenses," and "Manage Loans."
- **Footer**: Basic footer with links and contact information.

### **6.2 Clean UI Principles**
- Use a minimalistic design to enhance clarity.
- Maintain a consistent color scheme (e.g., green and white for financial themes).
- Ensure responsive design for all devices.

---

## **7. Installation and Setup**

### **7.1 Prerequisites**
- Node.js and npm installed.
- MongoDB database setup.

### **7.2 Steps**
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project folder:
   ```bash
   cd project
   ```
3. Install dependencies:
   ```bash
   npm install
   cd client && npm install
   ```
4. Configure environment variables:
   - Backend: Create a `.env` file with:
     ```env
     PORT=5000
     MONGO_URI=<your-mongodb-uri>
     JWT_SECRET=<your-jwt-secret>
     ```
   - Frontend: Add API base URL to `.env`.

5. Start the application:
   - Backend:
     ```bash
     npm run server
     ```
   - Frontend:
     ```bash
     npm start
     ```

---

## **8. Future Enhancements**
- Add more sorting and filtering options for expenses.
- Introduce article recommendations based on user preferences.
- Enable loan application and repayment tracking with real-time data.

---

This documentation covers the main requirements of your project. Let me know if you need help with implementation or any specific section!
