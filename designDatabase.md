
---

### **Database Structure**

#### **Collections:**
1. **Users**
2. **Expenses**
3. **Loans**
4. **Payments**
5. **CreditScores**

---

### 1. **Users Collection**
This collection stores information about users, including basic details and their financial data (like current debts and credit scores).

**Schema:**

```js
{
  _id: ObjectId,              // Unique identifier for the user
  username: String,           // Username of the user
  email: String,              // User's email
  passwordHash: String,       // Hashed password (for authentication)
  profilePicture: String,     // URL to the user's profile picture
  phone: String,              // User's phone number (optional)
  createdAt: Date,            // Account creation timestamp
  updatedAt: Date,            // Last updated timestamp
  creditScore: Number,        // Basic credit score (from 0 to 100)
  transactions: [             // List of transactions for a quick overview
    {
      type: String,           // 'expense' or 'loan'
      amount: Number,         // Amount involved in the transaction
      date: Date,             // Date of the transaction
      involvedUsers: [        // List of users involved in the transaction
        { userId: ObjectId, amount: Number }
      ]
    }
  ]
}
```

**Explanation**:
- `username`, `email`, and `passwordHash` are the basic credentials for each user.
- `profilePicture` is optional, but it could be used to store a URL for their profile image.
- `creditScore` is dynamically calculated based on timely repayments and loan history.
- `transactions` are used to keep a history of user-related financial activities (like loan and expense tracking).

---

### 2. **Expenses Collection**
The **Expenses** collection tracks individual or group expenses shared among users.

**Schema:**

```js
{
  _id: ObjectId,              // Unique identifier for the expense record
  amount: Number,             // Total amount of the expense
  description: String,        // Description of the expense (e.g., "Dinner at Mike's")
  date: Date,                 // Date of the expense
  payer: {                    // User who paid the expense
    userId: ObjectId,
    amountPaid: Number        // The amount paid by this user
  },
  participants: [             // Users who participated in the expense
    { userId: ObjectId, amountOwed: Number }
  ],
  isSettled: Boolean,         // Whether the expense has been fully settled
  createdAt: Date,            // Timestamp when the expense was created
  updatedAt: Date             // Timestamp when the expense was last updated
}
```

**Explanation**:
- `amount` represents the total amount of the expense.
- `payer` contains information about the user who paid the full amount.
- `participants` contains an array of users who shared the expense, with the amount they owe.
- `isSettled` tracks whether the expense has been paid off by all participants.

---

### 3. **Loans Collection**
This collection manages loans between friends and tracks the repayment status.

**Schema:**

```js
{
  _id: ObjectId,              // Unique loan identifier
  borrower: {                  // The user who borrowed money
    userId: ObjectId,
    amountBorrowed: Number,   // Amount borrowed
    dueDate: Date,            // Loan repayment due date
    interestRate: Number,     // Interest rate applied (if any)
    repaymentStatus: String   // 'pending', 'paid', 'overdue'
  },
  lender: {                    // The user who lent money
    userId: ObjectId,
    amountLent: Number        // Amount lent
  },
  repaymentHistory: [          // History of repayments made by borrower
    {
      amountPaid: Number,      // Amount paid in each transaction
      date: Date               // Date of repayment
    }
  ],
  createdAt: Date,             // Timestamp of loan creation
  updatedAt: Date              // Timestamp of the last update to the loan
}
```

**Explanation**:
- `borrower` and `lender` track who is borrowing and lending money.
- `repaymentHistory` stores the list of payments made towards the loan.
- `repaymentStatus` can be `pending`, `paid`, or `overdue` to reflect the loan's current state.

---

### 4. **Payments Collection**
This collection manages the payments made between users to settle debts, either for expenses or loans.

**Schema:**

```js
{
  _id: ObjectId,              // Unique identifier for the payment record
  amount: Number,             // Amount paid
  payer: {                    // User making the payment
    userId: ObjectId,
    paymentMethod: String     // Payment method (e.g., UPI, PayPal)
  },
  receiver: {                 // User receiving the payment
    userId: ObjectId
  },
  paymentDate: Date,          // Date of the payment
  relatedExpenseId: ObjectId, // Reference to the related expense (if any)
  relatedLoanId: ObjectId,    // Reference to the related loan (if any)
  createdAt: Date,            // Timestamp when the payment was made
  updatedAt: Date             // Timestamp when the payment was last updated
}
```

**Explanation**:
- `payer` and `receiver` track the users involved in the payment transaction.
- `paymentMethod` can be `UPI`, `PayPal`, or other available gateways.
- `relatedExpenseId` or `relatedLoanId` will reference the respective expense or loan being settled by this payment.

---

### 5. **CreditScores Collection**
A collection to track and update the credit scores of users based on repayment history.

**Schema:**

```js
{
  _id: ObjectId,              // Unique identifier for the credit score record
  userId: ObjectId,           // The user whose credit score is being tracked
  score: Number,              // The credit score (e.g., between 0 and 100)
  updatedAt: Date,            // Timestamp of the last score update
  reason: String              // Reason for the score update (e.g., "Loan Repayment", "Payment Overdue")
}
```

**Explanation**:
- The credit score will be updated based on user behaviors like loan repayments and financial transactions.
- `reason` explains why the credit score was updated (e.g., timely loan repayment, late payment, etc.).

---

## **Database Relationships**

1. **Users and Expenses**: A user can be a participant in multiple expenses. Each expense will store the `userId` of the participants.
2. **Users and Loans**: A user can borrow and lend money. The loans collection stores the borrower and lender details.
3. **Users and Payments**: Payments are made between users to settle debts from expenses or loans. The payments collection tracks these transactions.
4. **Expenses and Payments**: An expense can be paid off through multiple payments. The `Payments` collection references the `Expenses` collection.
5. **Loans and Payments**: Similar to expenses, a loan can be paid back over time with multiple payments. Each payment is linked to a loan in the `Loans` collection.
6. **Users and CreditScores**: Credit scores are updated based on the user's financial activity (e.g., repayment of loans and timely payments).

---

## **Indexes**

- **Indexes on user identifiers** (`userId`) in all collections to optimize queries that involve looking up users' transactions, loans, payments, and credit scores.
- **Indexes on dates** (`date`, `createdAt`, `updatedAt`) for sorting and filtering records by time.
- **Index on repaymentStatus** in the `Loans` collection to allow quick filtering of loans by their repayment state (`pending`, `paid`, `overdue`).

---

## **Conclusion**

This database design captures the essential features of the **SplitEasy** app, such as expense tracking, loan management, payments, and credit scoring. The design leverages MongoDB's flexibility to store data in a way that is both scalable and easy to manage. This structure can be expanded in the future as more features are added to the application.
