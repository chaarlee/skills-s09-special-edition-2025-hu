# Session 02 / Customer Identification and 360 View 🧍‍♂️🔍

In this session, you will build a simple Bank Frontend Application that connects to the **Core Banking System** via a JSON server and use Authentication API. The goal is to implement a basic **customer identification tool**, which allows users to search for a customer and view their full **Customer 360 profile**.

---

## 🧩 Key Objectives

- Authenticate via the **Auth Service API** before accessing data.
- Provide a **search interface** to identify customers.
- Display a **detailed customer profile**, including:
  - Personal data
  - Contracts and params
  - Accounts
  - Transactions

---

## 🔐 Authentication

Before any other action, the user must log in using credentials via the Auth Service API.

- Input: **user and password**
- Handle login errors gracefully (status code: 401 Unauthorized).
- Example users:
  - `user1 / 123456`
  - `user2 / qwerty`
  - `user3 / asdf`

---

## 🔍 Customer Search

Users must be able to search for customers using the following input fields:

- **BirthDate** – date picker input
- **Name** – search by first and last name; support input like "Anna Kovács" or "Kovács Anna"
- **Full text search** – split the query by spaces and match each part against:
  - `firstName`
  - `lastName`
  - `motherName`
  - `birthPlace`
  - `birthDate`

> Every part of the full text search must match **at least one** of the fields above.

### 📝 Example queries
- `"Anna Budapest"` → matches if `firstName == Anna` and `birthPlace == Budapest`
- `"Schneider 1980"` → matches if `lastName == Schneider` and `birthDate` contains `"1980"`

---

## 📋 List of Matches

- After a successful search, show a table with **all matching customers**.
- Display fields: `firstName`, `lastName`, `birthDate`, `birthPlace`, `motherName`, `gender`, `joinedAt`
- Let the user **select one** customer to view their 360 profile.

---

## 👤 Customer 360 View

When a customer is selected:

### Personal Info
- Show the customer’s details (name, ID, contact info, etc.)

### Contracts
- List all contracts with:
  - `product name`
  - `contractDate`
  - `status` (`active` / `inactive`)
  - `price`
  - Show the **parsed params** from the contract (structure may vary by product)

### Accounts
- List accounts with:
  - `accountNumber`
  - `balance`
  - `currency`
  - `createdAt`

### Transactions
- Allow the user to select one account and display related transactions in `descending` order by `transactionDate`:
  - `transactionDate`
  - `amount`
  - `type` (credit/debit)
  - `accountNumber`
  - `description`
  - `transaction ID`

---

## 🔧 Technical Requirements

- Use the **JSON Server API** as the backend for customer, contract, and account data.
- Use the **Auth Service API** for login/authentication.
- You have to optimize the application to desktop view.

---

## ✅ Submission Instructions

- Submit your solution via **Git repository**
- Include:
  - Complete **source code**
  - A `README.md` with clear instructions on:
    - How to **start** the application
    - Where to configure **API URLs**
    - How to run it locally (dependencies, build steps, etc.)
