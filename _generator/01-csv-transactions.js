const fs = require("fs");
const { json2csv } = require("./lib");

const main = () => {
  const file = "./assets/db.json";
  const content = fs.readFileSync(file, "utf-8");
  const db = JSON.parse(content);

  const transactions = db.transactions
    .slice(0, 20)
    .map((transaction) => ({
      transactionDate: transaction.transactionDate
        .slice(0, 19)
        .replace("T", " "),
      amount: transaction.amount,
      type: transaction.type,
      accountNumber: transaction.accountNumber,
      description: transaction.description.slice(0, 20) + "...",
      id: transaction.id,
    }))
    .sort((a, b) => {
      return new Date(b.transactionDate) - new Date(a.transactionDate);
    });
  console.log("transactions", transactions[0]);
  const csv = json2csv(transactions);

  // write to 01-transactions.sample.csv
  fs.writeFileSync("./assets/01-transactions.sample.csv", csv);
  console.log(`01-transactions.sample.csv created`);
};

main();
