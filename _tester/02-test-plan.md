# 🔐 Session 02 - TEST PLAN – Bank Frontend Application

## Test Group 1 - Authentication (Login)

These test cases verify correct and incorrect behavior of the authentication flow using the Auth Service API.

---

### 🧪 Test Case 1.0 – Login screen components are visible

- **Title**: Verify that the login screen renders correctly
- **Steps**:
  1. Navigate to the application start page
- **Expected result**:
  - The following UI elements are visible:
    - A title or label containing the word: `Login`
    - An input field for **username**
    - An input field for **password**
    - A **Login** button

---

### 🧪 Test Case 1.1 – Successful login with user1

- **Title**: Login with valid credentials (user1)
- **Input**:
  - User: `user1`
  - Password: `123456`
- **Steps**:
  1. Open login screen
  2. Enter `user1` / `123456`
  3. Submit login form
- **Expected result**:
  - Success login
  - Navigate to Find Customer view

---

### 🧪 Test Case 1.2 – Successful login with user2

- **Title**: Login with valid credentials (user2)
- **Input**:
  - User: `user2`
  - Password: `qwerty`
- **Steps**:
  1. Open login screen
  2. Enter `user2` / `qwerty`
  3. Submit login form
- **Expected result**:
  - Success login
  - Navigate to Find Customer view

---

### 🧪 Test Case 1.3 – Failed login: invalid username

- **Title**: Login with non-existing user
- **Input**:
  - User: `notarealuser`
  - Password: `123456`
- **Steps**:
  1. Open login screen
  2. Enter `notarealuser` / `123456`
  3. Submit form
- **Expected result**:
  - Error response (e.g., 401 Unauthorized)
  - UI shows: `Invalid username or password`
  - No token stored, user remains on login screen

---

### 🧪 Test Case 1.4 – Failed login: invalid password

- **Title**: Login with wrong password
- **Input**:
  - User: `user3`
  - Password: `wrongpassword`
- **Steps**:
  1. Open login screen
  2. Enter `user3` / `wrongpassword`
  3. Submit form
- **Expected result**:
  - Error response (e.g., 401 Unauthorized)
  - UI shows: `Invalid username or password`
  - No token stored, user remains on login screen

---

## 🔍 TEST GROUP 2 – Find Customer View & Search

This test group validates the customer search interface, its UI structure, and the three different search modes:
- **Birth Date Search**
- **Name Search**
- **Full-Text Search**

Both positive and negative cases are covered to ensure correctness and robustness.

---

### 🧪 Test Case 2.0 – Find Customer view components are visible

- **Title**: Verify Find Customer screen renders correctly
- **Steps**:
  1. Successfully log in (e.g., as `user1`)
  2. Navigate to Find Customer screen
- **Expected result**:
  - Visible UI elements:
    - Title or label: `Find Customer`
    - **Birth Date** input field (date picker)
    - **Name** input field
    - **Full Text Search** input field
    - Search button

---

### 🧪 Test Case 2.1 – Search by birth date (positive)

- **Title**: Exact birth date search returns multiple matches
- **Input**:
  - Birth date: `1981-05-22`
- **Steps**:
  1. Enter date in birth date picker
  2. Submit search
- **Expected result**:
  - Customer list displays at least 1 result:
    - `Jack Okuneva`, birthPlace: `Lawrence`

---

### 🧪 Test Case 2.2 – Search by birth date (negative)

- **Title**: Non-existent birth date returns no results
- **Input**:
  - Birth date: `1999-01-01`
- **Steps**:
  1. Enter date
  2. Submit search
- **Expected result**:
  - No results shown
  - Message: "No matching customers found"

---

### 🧪 Test Case 2.3 – Search by name (positive)

- **Title**: Name search works regardless of order
- **Input**:
  - Name: `Fahey Keagan` and `Keagan Fahey`
- **Steps**:
  1. Enter `Keagan Fahey`, submit → expect match
  2. Enter `Fahey Keagan`, submit → expect same match
- **Expected result**:
  - 1 result returned in both cases:
    - `Keagan Fahey`, birthDate: `1980-10-29`, birthPlace: `South Sydnee`

---

### 🧪 Test Case 2.4 – Search by name (negative)

- **Title**: Wrong name returns no match
- **Input**:
  - Name: `Xyz Notreal`
- **Steps**:
  1. Enter into Name field
  2. Submit search
- **Expected result**:
  - No results found

---

### 🧪 Test Case 2.5 – Full-text search (positive #1)

- **Title**: Full-text search matches multiple fields
- **Input**:
  - Full-text: `Keagan South`
- **Steps**:
  1. Enter into full-text search field
  2. Submit search
- **Expected result**:
  - Result found:
    - `firstName = Keagan`, `birthPlace = South Sydnee`

---

### 🧪 Test Case 2.6 – Full-text search (positive #2)

- **Title**: Full-text search matches mother name and birth date
- **Input**:
  - Full-text: `Heather 1946`
- **Steps**:
  1. Enter into full-text search field
  2. Submit search
- **Expected result**:
  - Match found:
    - `motherName = Heather Grady-Fahey`, `birthDate = 1946-08-30`
    - `firstName = Dejuan`, `lastName = Schmitt`

---

### 🧪 Test Case 2.7 – Full-text search (positive #3)

- **Title**: Full-text search matches last name, birth place, and birth date
- **Input**:
  - Full-text: `Okuneva Lawrence 1981`
- **Steps**:
  1. Enter into full-text search field
  2. Submit search
- **Expected result**:
  - Match found:
    - `Jack Okuneva`, `birthPlace = Lawrence`, `birthDate = 1981-05-22`

---

### 🧪 Test Case 2.8 – Full-text search (negative)

- **Title**: Incomplete full-text match returns nothing
- **Input**:
  - Full-text: `Keagan 1979`
- **Steps**:
  1. Enter into full-text search field
  2. Submit search
- **Expected result**:
  - No customers found (birthDate mismatch)

### 🧪 Test Case 2.9 – Full-text search returns multiple results

- **Title**: Full-text search returns more than one match
- **Input**:
  - Full-text: `Okuneva 05`
- **Steps**:
  1. Enter `Okuneva 05` into the full-text search field
  2. Submit search
- **Expected result**:
  - At least 2 customers are returned
  - Example matches:
    - `Jack Okuneva`, birthDate: `1981-05-22`, birthPlace: `Lawrence`
    - `Stacy Gutmann-Okuneva`, birthDate: `1956-11-05`, birthPlace: `South Junior`

### 🧪 Test Case 2.10 – Result list table format is correct

- **Title**: Verify result list table has correct columns
- **Precondition**: A search returns at least one customer (e.g., full-text: `Keagan South`)
- **Steps**:
  1. Submit a search that returns at least one match
  2. Observe the customer list rendered in a table
- **Expected result**:
  - The table is visible
  - The table contains the following columns, in this order:
    1. `First Name`
    2. `Last Name`
    3. `Birth Date`
    4. `Birth Place`
    5. `Mother Name`
    6. `Gender`
    7. `Joined At`
  - Each row shows the correct values for the matched customers

## 👁️‍🗨️ TEST GROUP 3 – Customer 360 View


### 🧪 Test Case 3.0 – Customer 360 screen components are visible

- **Title**: View renders all required sections after selection
- **Steps**:
  1. Log in
  2. Search and select `Vincenzo Romaguera`
- **Expected result**:
  - Screen shows:
    - Customer profile section
    - Contract list section
    - Account list section

---

### 🧪 Test Case 3.1 – Customer profile data is correct

- **Title**: Customer profile is displayed fully
- **Expected result**:
  - Fields:
    - First Name: Vincenzo
    - Last Name: Romaguera
    - Birth Date: 1966-11-02
    - Birth Place: North Maximeside
    - Mother Name: Oliver Wiegand
    - Gender: F
    - Postal Code: 40653
    - Email: lenny.skiles@hotmail.com
    - Phone: 8808548309
    - Membership: gold
    - Joined At: 2022-03-29

---

### 🧪 Test Case 3.2 – Contracts list displays active records with params

- **Title**: All relevant contracts are listed with proper data
- **Expected result**:
  - At least one contract is listed in a visible table
  - Table contains the following columns:
    - Product
    - Contract Date
    - Status
    - Price
    - Params
  - Params are fully visible (not hidden or expandable)
    - Example row:
      - Product: Online Banking
      - Contract Date: 2022-08-27
      - Status: active
      - Price: 81.59
      - Params:
        - `pin`: 9495
        - `username`: Harmon.Schulist
  - No "ID" column should be shown

---

### 🧪 Test Case 3.3 – Accounts table shows all accounts

- **Title**: Multiple accounts listed correctly
- **Expected result**:
  - At least 3 accounts listed
  - Example:
    - Account Number: `386701271266034591675160`
    - Balance: -2816.29
    - Currency: USD
    - Created At: 2022-09-28
  - Table columns:
    - Account Number
    - Balance
    - Currency
    - Created At

### 🧪 Test Case 3.4 – No account selected → no transactions visible

- **Title**: Transactions section remains empty until an account is selected
- **Steps**:
  - On the Customer 360 screen, verify the transactions section before any account is selected
- **Expected result**:
  - No transactions are displayed
  - Message shown: `Please select an account to view transactions` *(or similar)*

---

### 🧪 Test Case 3.5 – Selecting account displays correct transactions

- **Title**: Selecting an account loads its transactions
- **Steps**:
  1. Select the account `386701271266034591675160` (USD)
- **Expected result**:
  - Transactions related to that account are listed
  - Each row contains:
    - Date
    - Type (credit/debit)
    - Amount
    - Description
    - Account Number
  - All records shown must match the selected account ID

---

### 🧪 Test Case 3.6 – Switching account updates transactions accordingly

- **Title**: Switching selection changes the transaction list
- Steps:
  1. Select first account (e.g. USD)
  2. Verify transactions shown
  3. Select another account (e.g. EUR or HUF)
- **Expected result**:
  - Transaction list is refreshed
  - Only transactions belonging to the **newly selected account** are shown
  - Transactions from previously selected account are not visible

---

### 🧪 Test Case 3.7 – Transactions ordered by most recent date

- **Title**: Transaction list is sorted by `transactionDate` descending
- **Precondition**: Any account is selected and has multiple transactions
- **Steps**:
  1. Select account with at least 2 transactions
  2. Check order of `transactionDate`
- **Expected result**:
  - Transactions appear in descending order (latest date first)
  - First row = most recent transaction


## 🎨 UX Evaluation – Subjective Criteria (Desktop-focused, non-functional)

These aspects focus on the overall user experience as perceived visually and emotionally, beyond functional correctness. They are intended for desktop-only evaluation.

---

### 1. 🧭 Flow & Cognitive Clarity

- Does the application feel intuitive to use without explanation?
- Are screen transitions and the step-by-step journey (login → search → profile) logically structured?
- Is the interface free of unnecessary friction or confusion?
- Are screen titles, section headings, and action labels meaningful and self-explanatory?

---

### 2. 🎨 Visual Consistency & Aesthetic Quality

- Are layout, spacing, and alignment clean and coherent across all screens?
- Is the visual hierarchy effective (e.g. what stands out vs. what blends in)?
- Are UI elements (buttons, tables, panels) styled consistently?
- Does the interface have a professional and polished look suitable for a banking application?

---

### 3. 💡 Interface Feedback & Emotional Tone

- Are state changes (e.g. loading, selection, no results) communicated clearly?
- Do visual cues (highlighted rows, selected items, disabled buttons) support user understanding?
- Are feedback messages helpful, friendly, and confidence-inspiring?
- Does the experience feel calm and focused rather than overwhelming or chaotic?

---

### 4. 🖥️ Desktop Usability & Accessibility Perception

- Is the interface usable at common desktop resolutions (e.g. 1280×720 and above)?
- Are all actions accessible using a mouse and/or keyboard (optional but ideal)?
- Are contrast levels, font sizes, and component dimensions comfortable for prolonged desktop use?
- Does the interface respect desktop UI conventions (e.g. scrollbars, hover states, form input styles)?