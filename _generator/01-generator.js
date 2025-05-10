const fs = require("fs");
const { faker } = require("@faker-js/faker");
const { randomCustomer, randomContract, json2csv } = require("./lib");

const main = () => {
  const file = "./assets/db.json";
  const content = fs.readFileSync(file, "utf-8");
  const db = JSON.parse(content);
  const newDb = {};

  // -- Customers

  const customerIds = db.customers.map((customer) => customer.id);
  const contractsByCustomer = {};
  const customers = db.customers.reduce((acc, customer) => {
    acc[customer.id] = customer;
    contractsByCustomer[customer.id] = db.contracts.filter(
      (contract) => contract.customerId === customer.id
    );
    return acc;
  }, {});
  // console.log("customers.length", Object.keys(customers).length);
  // console.log(
  //   "contractsByCustomer.length",
  //   Object.keys(contractsByCustomer).length
  // );

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

  const importCustomersMap = { ...perfectMatches, ...partialMatches };

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

  // Customer CSV Log
  const customerCsvLog = crmCustomers.map((customerId, i) => {
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
      row: i + 1,
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

  // -- Contracts
  const newContracts = [];
  for (let i = 0; i < crmCustomers.length * 5; i++) {
    newContracts.push(randomContract(db.products, crmCustomerData));
  }
  console.log("contracts.length", newContracts.length);

  // FIX: add new contracts to customers
  newContracts.forEach((contract) => {
    const customerId = contract.customerId;
    if (!customers[customerId]) {
      console.log("customer not found", customerId);
      return;
    }
    if (!contractsByCustomer[customerId]) {
      contractsByCustomer[customerId] = [];
    }
    contractsByCustomer[customerId].push(contract);
  });
  // END FIX

  // Contracts CSV Log
  const contractCsvLog = newContracts.map((contract, i) => {
    if (!contractsByCustomer[contract.customerId]) {
      contractsByCustomer[contract.customerId] = [];
    }
    const customerId =
      importCustomersMap[contract.customerId] ?? contract.customerId;
    const sameTypeActiveContracts = contractsByCustomer[customerId].filter(
      (c) =>
        c.type === contract.type &&
        c.status === "active" &&
        c.contractDate > contract.contractDate
    );
    const type =
      contract.status === "inactive"
        ? "ARCHIVED"
        : sameTypeActiveContracts.length > 0
        ? "IMPORTED AS INACTIVE"
        : "IMPORTED AS ACTIVE";
    return {
      row: i + 1,
      type,
      id: contract.id,
    };
  });
  console.log("contractCsvLog", contractCsvLog.length);
  console.log(
    "contractCsvLog",
    // contractCsvLog.find((c) => c.type === "ARCHIVED")
    // contractCsvLog.find((c) => c.type === "IMPORTED AS ACTIVE")
    contractCsvLog.find((c) => c.type === "IMPORTED AS INACTIVE")
  );

  // write to 01-contracts.csv
  fs.writeFileSync(
    "./assets/01-contracts.csv",
    json2csv(
      newContracts.map((c) => {
        return {
          ...c,
          params: JSON.stringify(c.params),
        };
      })
    )
  );
  console.log(`01-contracts.csv created`);

  // write to 01-contracts.output.csv
  fs.writeFileSync(
    "./assets/01-contracts.output.csv",
    json2csv(contractCsvLog)
  );
  console.log(`01-contracts.output.csv created`);

  // -- New DB

  newDb.customers = customerSolutions.map((customerId) => {
    const customer = { ...customers[customerId] };
    return customer;
  });
  console.log("newDb.customers", newDb.customers.length);

  newDb.contracts = [
    ...db.contracts,
    ...newContracts
      .filter((c) => c.status === "active")
      .map((c) => {
        return {
          ...c,
          customerId: importCustomersMap[c.customerId] ?? c.customerId,
        };
      }),
  ];
  console.log("newDb.contracts", newDb.contracts.length);

  // write to newDb.json
  fs.writeFileSync("./assets/01-db.json", JSON.stringify(newDb, null, 2));
  console.log(`01-db.json created`);
};

main();
