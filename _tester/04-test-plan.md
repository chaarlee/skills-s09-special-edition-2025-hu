# 📱 Test Plan – Mobile CRM App (Credit Pre-Qualification)

This application is designed for mobile use by salespeople. It provides access to a searchable customer list, simplified profile views, a credit pre-qualification check (rating report), and the ability to send that report by email.

---

## 🔍 TEST GROUP 1 – Customer List

---

### 🧪 Test Case 1.0 – UI components are visible

- **Title**: Customer list screen renders all necessary elements
- **Steps**:
  1. Open the application
- **Expected result**:
  - Visible components:
    - Page title: `Customer Management`
    - Search input field with icon
    - Table header with columns: `Customer ID`, `Name`, `Actions`
    - List of customers
    - Pagination controls (if more than 1 page of data)

---

### 🧪 Test Case 1.1 – Customer table displays expected structure

- **Title**: Table rows are rendered correctly
- **Steps**:
  1. Open the app
- **Expected result**:
  - Each row in the list shows:
    - `Customer ID` in format `#xxxxx`
    - Full name (First + Last)
    - A right arrow icon for action
  - Data is aligned under correct columns
  - Rows are visually distinguishable (e.g. separated or zebra-styled)

---

### 🧪 Test Case 1.2 – Search filters the list

- **Title**: List is filtered by name or customer ID
- **Steps**:
  1. Enter text into the search field (e.g., "Sarah")
- **Expected result**:
  - Matching rows are shown
  - Non-matching rows disappear
  - Case-insensitive
  - If no match: display “No results found”

---

### 🧪 Test Case 1.3 – Pagination controls are functional

- **Title**: Users can navigate between pages
- **Precondition**: More customers exist than fit on one screen (e.g., >10)
- **Steps**:
  1. Tap the right (`>`) or left (`<`) pagination arrows
- **Expected result**:
  - Current page of customers is updated accordingly
  - Pagination info (e.g., “Showing 1–3 of 24”) is updated
  - Arrows are disabled at boundaries (e.g., `<` disabled on page 1)

---

## 👤 TEST GROUP 2 – Customer Details

---

### 🧪 Test Case 2.0 – Customer detail layout renders all sections

- **Title**: Main sections are visible in the customer detail screen
- **Steps**:
  1. Tap on any customer in the customer list
- **Expected result**:
  - The following sections are clearly visible:
    - `Profile` (Name, ID, Email, Phone)
    - `Accounts` list
    - `Contracts` list
    - `Actions` section (including rating report generation button)

---

### 🧪 Test Case 2.1 – Profile section shows core customer data

- **Title**: The profile section includes essential customer info
- **Expected result**:
  - Elements visible:
    - Full name
    - Customer ID
    - Email address
    - Phone number

---

### 🧪 Test Case 2.2 – Accounts section displays each account

- **Title**: Account list shows type, masked number, and balance
- **Expected result**:
  - Each account has:
    - Account type (e.g., "Checking Account")
    - Masked account number (e.g., `**** 1234`)
    - Current balance formatted properly (e.g., `$12,450.00`)
  - Multiple accounts should be listed in a stacked layout

---

### 🧪 Test Case 2.3 – Contracts section lists current contracts

- **Title**: Contracts are listed with type and ID
- **Expected result**:
  - Each contract has:
    - Product type (e.g., “Home Loan”)
    - Contract ID (e.g., `#HL-2025-001`)
  - Layout is clear and uniform

---

### 🧪 Test Case 2.4 – Actions section includes rating report trigger

- **Title**: "Generate Rating Report" action is available
- **Expected result**:
  - Section titled `Actions` is present
  - Button labeled `Generate Rating Report` is clearly tappable
  - Button placement is aligned with mobile UI expectations

---

## 🧾 TEST GROUP 3 – Customer Report (Pre-Qualification)

---

### 🧪 Test Case 3.0 – Rating report screen shows both main sections

- **Title**: Rating screen renders all key evaluation blocks
- **Steps**:
  1. Tap `Generate Rating Report` from the customer details view
- **Expected result**:
  - Two sections are clearly visible:
    - `Bank Rating`
    - `Government Information`
  - Sections are separated and properly labeled

---

### 🧪 Test Case 3.1 – Bank Rating section displays evaluation fields

- **Title**: All internal financial indicators are visible and styled
- **Expected result**:
  - Subfields shown:
    - `Balance Rating` (e.g. Excellent / Bad)
    - `Transaction Rating`
    - `Negative Balance History`
  - Each value is displayed with label and optional status icon or color
  - Layout is clear and scrollable if needed

---

### 🧪 Test Case 3.2 – Government Information section shows all status flags

- **Title**: Government-related risk factors are listed
- **Expected result**:
  - Flags or icons displayed for:
    - `Criminal Record`
    - `Sanctions`
    - `Bankruptcy`
    - `Debt Collection`
  - Each field shows either ✓ or ⚠️/✘ style status
  - Proper alignment and spacing

---

### 🧪 Test Case 3.3 – Email icon is visible for sending the report

- **Title**: Email button is present and clearly tappable
- **Expected result**:
  - ✈️ icon or “Send Report” button is shown in header or footer
  - Touch target is mobile-optimized

---

### 🧪 Test Case 3.4 – Tapping send triggers email with rating summary

- **Title**: Email sending uses the template and confirms on success
- **Steps**:
  1. Tap the send icon
- **Expected result**:
  - Email is sent to the customer's email address
  - A predefined template includes:
    - Customer name
    - All bank + government rating values
  - Success message shown (e.g., “Report sent successfully”)

---

## 💡 TEST GROUP 4 – Mobile UX & Layout Behavior

---

### 🧪 Test Case 4.1 – Layout fits on small screens

- **Title**: App is usable on phone-sized screens
- **Expected result**:
  - No horizontal scrolling
  - All buttons and text are visible
  - Sections scroll vertically as needed

---

### 🧪 Test Case 4.2 – Tap targets are large and spaced

- **Title**: UI elements are touch-friendly
- **Expected result**:
  - Buttons are not too small or crowded
  - Taps do not trigger neighboring elements

---

### 🧪 Test Case 4.3 – Screen transitions are clear

- **Title**: Navigation is smooth and logical
- **Expected result**:
  - Back button goes to previous view
  - Transitions (e.g., list → details, details → report) are fast and clear