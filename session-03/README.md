# Session 03 / Business Service

In this session, you are required to develop a WEB API that will provide other services with statistics, reports, reconciliation and customer rating features.

You will be provided with **exact** API specifications that you need to implement. The API will replace already existing services, so it must be compatible with the existing ones.

A database schema is also provided for you, and a MySQL instance is also available for you to use.

**Your application must run on port 8989 and also make sure to allow all domain names to access your service (e.g.: 0.0.0.0:8989)**

## Database

<<< include image >>>

## Statistics

Statistics provide a summary of the data in the system. The statistics are calculated based on the data in the system and always show off the current state of the system and the business itself.

### Customers

Customer statistics provide information about the customers in the system. It provides information about the number of customers.

**GET api/statistics/customers**

Response body **200 Ok**:

```json
{
  "count": 1
}
```

### Customers by birth year

Customers by birth year provide structural information about the customers and their birth years.

**GET api/statistics/customer-by-birth-year**

Response body **200 Ok**:

```json
[
  {
    "year": 1980,
    "count": 1
  },
  {
    "year": 1981,
    "count": 10
  }
]
```

**Note**: The response must be ascending ordered by year. Years without new customers must be omitted.

### Contracts

Contracts provide the business a way to track the number of active contracts for each product.

**GET api/statistics/contracts**

Response body **200 Ok**:

```json
[
  {
    "productName": "Credit Card",
    "count": 1
  },
  {
    "productName": "Loan",
    "count": 3
  }
]
```

**Note**: The response must be ascending ordered by product name. Products without any contracts must be included as count 0.

### Products

On top of knowing the number of contracts for each product it is also vital to know how much money each product brings in or has brought in previously.

**GET api/statistics/products**

Response body **200 Ok**:

```json
[
  {
    "productName": "Credit Card",
    "totalPrice": 100.05
  },
  {
    "productName": "Loan",
    "totalPrice": 300.15
  }
]
```

**Note**: The response must be ascending ordered by product name. Products without any income must be included as totalPrice 0.

### Balances

The held money by the business is vital information, for each currency the business supports, the total balance must be provided.

Currencies used by the system are the following: `HUF, EUR, USD`


**GET api/statistics/balances**

Response body **200 Ok**:

```json
[
  {
    "currency": "HUF",
    "totalBalance": 5056984.32
  },
  {
    "productName": "EUR",
    "totalPrice": 12510.75
  }
]
```

**Note**: The response must be ascending ordered by currency.

## Reports

Reports are used to track historical data in the system going back years, it provides the bank a way to check the business's health and is needed also to provide information to the government and other authorities.

### Balance history

Balance history provides a way to track the balance of the business over time. It is a way to see how the business is doing in each month and how many accounts are in the positive or negative balance.

A transaction will be of type `credit, debit` where credit is moving money into the account and debit is moving money out of the account.

**GET api/reports/balance-history**

Response body **200 Ok**:

```json
[
  {
    "year": 2025,
    "month": 1,
    "negativeAccounts": 5,
    "positiveAccounts": 10
  },
  {
    "year": 2025,
    "month": 2,
    "negativeAccounts": 6,
    "positiveAccounts": 9
  }
]
```

**Note**: The response must be ascending ordered by year and then by month. Zero balances are considered positive.

### New customers

New customers provide a way to track the number of new customers in the system. It is a way to see how many new customers are joining the system each month.

**GET api/reports/new-customers**

Response body **200 Ok**:

```json
[
  {
    "year": 2025,
    "month": 1,
    "newCustomers": 5
  },
  {
    "year": 2025,
    "month": 2,
    "newCustomers": 6
  }
]
```

**Note**: The response must be ascending ordered by year and then by month. Months without new customers must be omitted.

## Reconciliation

Reconciliation is the process of ensuring that two sets of records (the accounts and their transactions) are in agreement. It is a way to ensure that the data in the system is accurate and up to date.

### Transaction balance

Transaction balance provides a way to track the balance of the accounts in the system. It is used to find transaction mismatches and to ensure that the data in the system is accurate.

It must calculate the total balance for each account using the transactions in the system. Then providing the difference between the calculated balance and the actual balance in the system.

Difference is equal to the difference of the account balance and the calculated transaction balance.

**GET api/reconciliation/transaction-balance**

Response body **200 Ok**:

```json
[
  {
    "accountId": "123e4567-e89b-12d3-a456-426614174000",
    "difference": 15.00
  },
  {
    "accountId": "123e4567-e89b-12d3-a456-426614174111",
    "difference": -0.01
  }
]
```

**Note**: The response must be descending by absolute difference. Balances with zero difference must be omitted.

### Transaction duplication

In some cases a transaction may appear doubled in the system this could be due to a user error (sending the money twice) or could be a software issue, where the transaction gets duplicated. Here the API must find the all transactions that are duplicated in the system.

A transaction is considered duplicated when the destination or source account and the transaction type is the same, also the second transaction happened in one hour of the original transaction.

In some rare cases, there could be multiple duplications for the same transaction. The total amount is the sum of the duplicated transactions (without the original transaction).

**GET api/reconciliation/transaction-duplication**

Response body **200 Ok**:

```json
[
  {
    "accountId": "123e4567-e89b-12d3-a456-426614174000",
    "transactionIds": [
      "123e4567-e89b-12d3-a456-426614174321"
    ],
    "totalAmount": -50.50
  },
  {
    "accountId": "123e4567-e89b-12d3-a456-426614174111",
    "transactionIds": [
      "123e4567-e89b-12d3-a456-426614174123"
    ],
    "totalAmount": 2.25
  }
]
```

**Note**: The response must be descending by absolute total amount. Transaction ids must be ascending by the transaction date.

## Customer Rating

Customer rating is a way to measure the way to rate the customers based on their behavior and the way they use the system. It is a way to measure the risk of the customer when providing them new services like loans and credit cards.

### Customer rating

An operator is interested in the customer's balance and transaction rating and whether any of their accounts have had a negative balance in the past. Rating has the following values: `Bad, Bood, Excellent`

Balance rating is used by calculating the sum of the balances in EUR. Some accounts might be in other currencies, it must be normalized to EUR before calculating the customer rating. `1 USD = 0.9 EUR` and `1 HUF = 0.0025 EUR`

Balance rating is calculated by the following formula:

```text
sum of balance in EUR is less than 0 => Bad
sum of balance in EUR is between 0 and 2000 => Good
sum of balance in EUR is greater than 2000 => Excellent
```

Transaction rating is calculated by count the number of transactions the customer has made.

Transaction rating is calculated by the following formula:

```text
count of transactions is less than 5 => Bad
count of transactions is between 5 and 50 => Good
count of transactions is greater than 50 => Excellent
```

**GET api/rating/{customerId}**

Response body **200 Ok**:

```json
{
  "balanceRating": "Good",
  "transactionRating": "Excellent",
  "hasNegativeBalanceInHistory": false
}
```

## ✅ Submission Instructions

- Submit your solution via **Git repository**
- Include:
  - Complete **source code**
  - A `README.md` with clear instructions on:
    - How to **start** the application
    - Where to configure **API URLs**
    - How to run it locally (dependencies, build steps, etc.)
