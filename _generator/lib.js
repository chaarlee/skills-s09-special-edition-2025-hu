const { faker } = require("@faker-js/faker");

faker.setDefaultRefDate(new Date());

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const round = (value, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const dateAddDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const convertPhone = (phone) => {
  return phone.replace(/[^0-9]/g, "");
};

const randomCustomer = () => {
  const joinedAt = faker.date.past({ years: 5 });
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    birthDate: faker.date
      .birthdate({
        min: 18,
        max: 99,
        mode: "age",
      })
      .toISOString()
      .split("T")[0],
    birthPlace: faker.location.city(),
    motherName: faker.person.fullName(),
    gender: faker.helpers.arrayElement(["F", "M", ""]),
    postalCode: faker.location.zipCode().split("-")[0],
    email: faker.internet.email().toLocaleLowerCase(),
    phone: convertPhone(faker.phone.number().split(" ")[0]),
    membership: faker.helpers.arrayElement([
      "normal",
      "normal",
      "normal",
      "normal",
      "normal",
      "normal",
      "normal",
      "gold",
      "gold",
      "vip",
    ]),
    joinedAt: joinedAt.toISOString().slice(0, 10),
  };
};

const randomContract = (products, customers) => {
  const date = faker.date.past({ years: 5 });
  const product = faker.helpers.arrayElement(products);
  const params = {};
  if (product.name === "Credit Card") {
    params.expiredAt = dateAddDays(
      date,
      randomNumber(1, 365 * 5)
    ).toISOString();
    params.number = faker.finance.creditCardNumber();
    params.cvv = faker.finance.creditCardCVV();
  }
  if (product.name === "Loan" || product.name === "Mortgage") {
    params.loanAmount = parseFloat(
      faker.finance.amount({ min: 1000, max: 100000, precision: 0 })
    );
  }
  if (product.name === "Online Banking") {
    params.pin = faker.finance.pin();
    params.username = faker.internet.userName();
  }
  return {
    id: faker.string.uuid(),
    customerId: faker.helpers.arrayElement(customers).id,
    productId: product.id,
    contractDate: date.toISOString(),
    status: faker.helpers.arrayElement([
      "active",
      "active",
      "active",
      "inactive",
    ]),
    price: parseFloat(
      faker.finance.amount({ min: 10, max: 100, precision: 0 })
    ),
    params: params,
  };
};

const randomAccount = (customers) => {
  const date = faker.date.past({ years: 5 });
  let transactions = [];
  const id = faker.string.uuid();

  // generate random transactions
  for (let i = 0; i < randomNumber(1, 100); i++) {
    transactions.push(randomTransaction(id));
  }
  transactions = transactions.sort((a, b) => {
    return new Date(b.transactionDate) - new Date(a.transactionDate);
  });
  transactions[transactions.length - 1].amount = round(
    parseFloat(
      faker.finance.amount({
        min: 100,
        max: 1000,
        precision: 2,
      })
    ),
    0
  );
  transactions[transactions.length - 1].type = "credit";
  transactions[transactions.length - 1].description =
    "Initial deposit to account";

  return {
    id: id,
    createdAt: date.toISOString(),
    customerId: faker.helpers.arrayElement(customers).id,
    accountNumber: faker.finance.accountNumber(24),
    currency: faker.helpers.arrayElement(["EUR", "USD", "HUF"]),
    balance: round(
      transactions.reduce((acc, transaction) => {
        return (
          acc + transaction.amount * (transaction.type === "credit" ? 1 : -1)
        );
      }, 0)
    ),
    transactions: transactions,
  };
};

const randomTransaction = (accountId) => {
  const date = faker.date.past({ years: 5 });
  const amount = parseFloat(
    faker.finance.amount({ min: -1000, max: 1000, precision: 2 })
  );
  const type = amount < 0 ? "debit" : "credit";

  return {
    id: faker.string.uuid(),
    accountId,
    accountNumber: faker.helpers.arrayElement([
      faker.finance.accountNumber(16),
      faker.finance.accountNumber(24),
      faker.finance.iban(),
    ]),
    transactionDate: date.toISOString(),
    amount: Math.abs(amount),
    type: type,
    description: faker.commerce.productDescription(),
  };
};

const json2csv = (json, sep = "\t") => {
  const headers = Object.keys(json[0]);
  let csv = headers.join(sep) + "\n";
  csv += json
    .map((row) => {
      return headers
        .map((header) => {
          const value = row[header];
          return value;
        })
        .join(sep);
    })
    .join("\n");
  return csv;
};

module.exports = {
  randomNumber,
  round,
  shuffle,
  dateAddDays,
  convertPhone,
  randomCustomer,
  randomContract,
  randomAccount,
  randomTransaction,
  json2csv,
};
