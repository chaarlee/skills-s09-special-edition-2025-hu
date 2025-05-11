const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { randomCustomer, randomContract, randomAccount } = require("./lib");

// Bank Domain
// Entities relationships:
// Customer -< Contract >- Product
// Customer -< Account >- Transaction

// Credit Card
// Loan
// Mortgage
// Insurance
// Investment
// Forex
// Online Banking
// Crypto
const PRODUCTS = [
  // change id to guid
  { id: faker.string.uuid(), name: "Credit Card" },
  { id: faker.string.uuid(), name: "Loan" },
  { id: faker.string.uuid(), name: "Mortgage" },
  { id: faker.string.uuid(), name: "Insurance" },
  { id: faker.string.uuid(), name: "Investment" },
  { id: faker.string.uuid(), name: "Forex" },
  { id: faker.string.uuid(), name: "Online Banking" },
  { id: faker.string.uuid(), name: "Crypto" },
];

const CNT = {
  customers: 500,
  products: PRODUCTS.length,
  contracts: 1500,
  accounts: 1000,
};

const main = () => {
  const db = {};

  // customers
  db.customers = faker.helpers.multiple(randomCustomer, {
    count: CNT.customers,
  });
  console.log("customer example", db.customers[0]);
  console.log(`customers: ${db.customers.length}`);

  // products
  db.products = PRODUCTS;
  console.log("product example", db.products[0]);
  console.log(`products: ${db.products.length}`);

  // contracts
  db.contracts = [];
  for (let i = 0; i < CNT.contracts; i++) {
    db.contracts.push(randomContract(db.products, db.customers));
  }
  console.log("contract example", db.contracts[0]);
  console.log(`contracts: ${db.contracts.length}`);

  // accounts
  db.accounts = [];
  const accounts = [];
  for (let i = 0; i < CNT.accounts; i++) {
    accounts.push(randomAccount(db.customers));
  }
  db.accounts = accounts.map((account) => ({
    id: account.id,
    createdAt: account.createdAt,
    customerId: account.customerId,
    accountNumber: account.accountNumber,
    currency: account.currency,
    balance: account.balance,
  }));
  console.log("account example", db.accounts[0]);
  console.log(`accounts: ${db.accounts.length}`);

  // transactions
  db.transactions = accounts.reduce((acc, curr) => {
    return [...acc, ...curr.transactions];
  }, []);
  console.log("transaction example", db.transactions[0]);
  console.log(`transactions: ${db.transactions.length}`);

  // write to db.json
  fs.writeFileSync("./assets/db.json", JSON.stringify(db, null, 2));
  console.log(`db.json created`);
};

main();
