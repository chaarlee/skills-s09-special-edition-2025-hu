const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { randomCustomer, randomContract, randomAccount } = require("./lib");

const main = () => {
  const file = "./assets/db.json";
  const content = fs.readFileSync(file, "utf-8");
  const db = JSON.parse(content);

  console.log(db.customers.slice(0, 5));

  // write to 01-customers.csv
  // fs.writeFileSync("./assets/01-customers.csv", json2csv(customers));
  // console.log(`01-customers.csv created`);
};

main();
