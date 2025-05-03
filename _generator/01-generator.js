const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { randomCustomer, json2csv } = require("./lib");
const { exit } = require("process");

const main = () => {
  const file = "./assets/db.json";
  const content = fs.readFileSync(file, "utf-8");
  const db = JSON.parse(content);
  const newDb = {};

  const customerIds = db.customers.map((customer) => customer.id);
  const contractsByCustomer = {};
  const customers = db.customers.reduce((acc, customer) => {
    acc[customer.id] = customer;
    contractsByCustomer[customer.id] = db.contracts.filter(
      (contract) => contract.customerId === customer.id
    );
    return acc;
  }, {});

  const shuffledCustomerIds = customerIds.sort(() => Math.random() - 0.5);
  const cntCustomers = shuffledCustomerIds.length;

  // CBS Customers
  const cbsCustomers = shuffledCustomerIds.slice(0, cntCustomers.length);
  console.log("cbsCustomers", cbsCustomers.length);

  // Import Customers (40%)
  const importCustomers = shuffledCustomerIds.slice(
    0,
    Math.floor(cntCustomers * 0.4)
  );
  console.log("importCustomers", importCustomers.length);

  // Perfect Matches (50%)
  const perfectMatches = {};
  let importPerfectCustomers = importCustomers.slice(
    0,
    Math.floor(importCustomers.length * 0.5)
  );
  console.log("importPerfectCustomers", importPerfectCustomers.length);
  importPerfectCustomers = importPerfectCustomers.map((customerId) => {
    const customer = { ...customers[customerId] };
    customer.id = faker.string.uuid();
    customers[customer.id] = customer;
    perfectMatches[customer.id] = customerId;
    return customer.id;
  });
  console.log("importPerfectCustomers", importPerfectCustomers[0]);
  console.log("perfectMatches", Object.entries(perfectMatches)[0]);

  // Partial Matches (50%)
  const partialMatches = {};
  let importPartialCustomers = importCustomers.slice(
    Math.floor(importCustomers.length * 0.5)
  );
  console.log("importPartialCustomers", importPartialCustomers.length);
  importPartialCustomers = importPartialCustomers.map((customerId) => {
    const customer = { ...customers[customerId] };
    const newCustomer = randomCustomer();
    customer.id = newCustomer.id;
    const key = faker.helpers.arrayElement([
      "firstName",
      "lastName",
      "motherName",
      "birthDate",
      "birthPlace",
    ]);
    customer[key] = newCustomer[key];
    customers[customer.id] = customer;
    partialMatches[customer.id] = customerId;
    return customer.id;
  });
  console.log("importPartialCustomers", importPartialCustomers[0]);
  const examplePartialMatches = Object.entries(partialMatches)[0];
  console.log("examplePartialMatches", examplePartialMatches);
  // console.log(
  //   "examplePartialMatches",
  //   customers[examplePartialMatches[0]],
  //   customers[examplePartialMatches[1]]
  // );

  // New Customers (30%)
  let newCustomers = faker.helpers.multiple(randomCustomer, {
    count: Math.floor(cntCustomers * 0.3),
  });
  newCustomers = newCustomers.map((customer) => {
    customers[customer.id] = customer;
    return customer.id;
  });
  console.log("newCustomers", newCustomers.length);

  // different customers
  console.log("customers.length", Object.keys(customers).length);

  // CRM Customers
  const crmCustomers = faker.helpers.shuffle([
    ...importPerfectCustomers,
    ...importPartialCustomers,
    ...newCustomers,
  ]);
  const crmCustomerData = crmCustomers.map((customerId) => {
    const customer = { ...customers[customerId] };
    return customer;
  });
  console.log("crmCustomers", crmCustomers.length);

  // Customer Solutions
  const customerSolutions = [...cbsCustomers, ...newCustomers];
  console.log("customerSolutions", customerSolutions.length);

  newDb.customers = customerSolutions.map((customerId) => {
    const customer = { ...customers[customerId] };
    return customer;
  });
  console.log("newDb.customers", newDb.customers.length);

  // Customer CSV Log
  const customerCsvLog = crmCustomers.map((customerId) => {
    let type = "NEW";
    let crmId = customerId;
    let cbsId = customerId;
    if (importPerfectCustomers.includes(customerId)) {
      type = "PERFECT_MATCH";
      cbsId = perfectMatches[customerId];
    }
    if (importPartialCustomers.includes(customerId)) {
      type = "PARTIAL_MATCH";
      cbsId = partialMatches[customerId];
    }
    return {
      type,
      crmId,
      cbsId,
    };
  });
  console.log("customerCsvLog", customerCsvLog.length);
  console.log("customerCsvLog", customerCsvLog[0]);

  // write to 01-customers.csv
  console.log("crmCustomers", crmCustomerData[0]);
  fs.writeFileSync("./assets/01-customers.csv", json2csv(crmCustomerData));
  console.log(`01-customers.csv created`);

  // write to 01-customers.output.csv
  fs.writeFileSync(
    "./assets/01-customers.output.csv",
    json2csv(customerCsvLog)
  );
  console.log(`01-customers.output.csv created`);

  // console.log("customers", Object.values(customers).slice(0, 5));

  // write to newDb.json
  fs.writeFileSync("./assets/01-db.json", JSON.stringify(newDb, null, 2));
  console.log(`01-db.json created`);
};

main();
