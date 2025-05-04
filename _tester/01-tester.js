const fs = require("fs");
const { csv2json } = require("../_generator/lib");

const test_customers_csv = () => {
  const file = "./assets/01-customers.csv";
  const content = fs.readFileSync(file, "utf-8");
  const solution = csv2json(content);
  console.log("solution.length", solution.length);
};

const main = () => {
  test_customers_csv();
};

main();
