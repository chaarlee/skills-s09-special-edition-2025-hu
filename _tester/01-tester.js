const fs = require("fs");
const { csv2json, Marking } = require("./lib");
const _ = require("lodash");

const test_customers_csv = (competitorFolder) => {
  console.log("\n", "TEST:", "test_customers_csv", "\n");

  const marking = new Marking();

  const file = "./_solutions/session-01/01-customers.output.csv";
  const content = fs.readFileSync(file, "utf-8");
  const solution = csv2json(content);
  // console.log("-", "solution.length", solution.length);

  const competitorFile = `./competitors/${competitorFolder}/01-customers.output.csv`;
  try {
    const competitorContent = fs.readFileSync(competitorFile, "utf-8");
    const competitorSolution = csv2json(competitorContent);
    // console.log("-", "competitor.length", competitorSolution.length);
    marking.add("csv records", solution.length, competitorSolution.length);

    // types
    const sTypes = {
      NEW: solution.filter((x) => x.type === "NEW").length,
      PERFECT_MATCH: solution.filter((x) => x.type === "PERFECT_MATCH").length,
      PARTIAL_MATCH: solution.filter((x) => x.type === "PARTIAL_MATCH").length,
    };

    const csTypes = {
      NEW: competitorSolution.filter((x) => x.type === "NEW").length,
      PERFECT_MATCH: competitorSolution.filter(
        (x) => x.type === "PERFECT_MATCH"
      ).length,
      PARTIAL_MATCH: competitorSolution.filter(
        (x) => x.type === "PARTIAL_MATCH"
      ).length,
    };

    marking.add("count type: NEW", sTypes.NEW, csTypes.NEW, -1, 0.9);
    marking.add(
      "count type: PERFECT_MATCH",
      sTypes.PERFECT_MATCH,
      csTypes.PERFECT_MATCH,
      -1,
      0.9
    );
    marking.add(
      "count type: PARTIAL_MATCH",
      sTypes.PARTIAL_MATCH,
      csTypes.PARTIAL_MATCH,
      -1,
      0.9
    );

    // same records
    const same = solution.reduce((acc, x) => {
      const found = competitorSolution.find((y) => y.row === x.row);
      if (found) {
        _.isEqual(x, found) ? acc++ : acc;
      }
      return acc;
    }, 0);
    marking.add("same records", solution.length, same, -1, 0.8);
  } catch (error) {
    console.error("Error reading competitor file:", competitorFile);
    return;
  }

  console.table(marking.data);
};

const test_customers_json = (competitorFolder) => {
  console.log("\n", "TEST:", "test_customers_json", "\n");

  const marking = new Marking();

  const file = "./_solutions/session-01/01-db.json";
  const content = fs.readFileSync(file, "utf-8");
  const solution = JSON.parse(content);
  // console.log("-", "solution.length", solution.length);

  const competitorFile = `./competitors/${competitorFolder}/01-db.json`;
  try {
    const competitorContent = fs.readFileSync(competitorFile, "utf-8");
    const competitorSolution = JSON.parse(competitorContent);
    // console.log("-", "competitor.length", competitorSolution.length);
    marking.add(
      "json records",
      solution.customers.length,
      competitorSolution.customers.length,
      -1,
      0.95
    );

    // same records
    const same = solution.customers.reduce((acc, x) => {
      const found = competitorSolution.customers.find((y) => y.id === x.id);
      if (found) {
        _.isEqual(x, found) ? acc++ : acc;
      }
      return acc;
    }, 0);
    marking.add("same records", solution.customers.length, same, -1, 0.9);
  } catch (error) {
    console.error("Error reading competitor file:", competitorFile);
    return;
  }
  console.table(marking.data);
};

const test_contracts_csv = (competitorFolder) => {
  console.log("\n", "TEST:", "test_contracts_csv", "\n");

  const marking = new Marking();

  const file = "./_solutions/session-01/01-contracts.output.csv";
  const content = fs.readFileSync(file, "utf-8");
  const solution = csv2json(content);
  // console.log("-", "solution.length", solution.length);

  const competitorFile = `./competitors/${competitorFolder}/01-contracts.output.csv`;
  try {
    const competitorContent = fs.readFileSync(competitorFile, "utf-8");
    const competitorSolution = csv2json(competitorContent);
    // console.log("-", "competitor.length", competitorSolution.length);
    marking.add("csv records", solution.length, competitorSolution.length);

    // types
    const sTypes = {
      ARCHIVED: solution.filter((x) => x.type === "ARCHIVED").length,
      ACTIVE: solution.filter((x) => x.type === "IMPORTED AS ACTIVE").length,
      INACTIVE: solution.filter((x) => x.type === "IMPORTED AS INACTIVE")
        .length,
    };

    const csTypes = {
      ARCHIVED: competitorSolution.filter((x) => x.type === "ARCHIVED").length,
      ACTIVE: competitorSolution.filter((x) => x.type === "IMPORTED AS ACTIVE")
        .length,
      INACTIVE: competitorSolution.filter(
        (x) => x.type === "IMPORTED AS INACTIVE"
      ).length,
    };

    marking.add(
      "count type: ARCHIVED",
      sTypes.ARCHIVED,
      csTypes.ARCHIVED,
      -1,
      0.95
    );
    marking.add(
      "count type: IMPORTED AS ACTIVE",
      sTypes.ACTIVE,
      csTypes.ACTIVE,
      -1,
      0.95
    );
    marking.add(
      "count type: IMPORTED AS INACTIVE",
      sTypes.INACTIVE,
      csTypes.INACTIVE,
      -1,
      0.95
    );

    // same records
    const same = solution.reduce((acc, x) => {
      const found = competitorSolution.find((y) => y.row === x.row);
      if (found) {
        _.isEqual(x, found) ? acc++ : acc;
      }
      return acc;
    }, 0);
    marking.add("same records", solution.length, same, -1, 0.95);
  } catch (error) {
    console.error("Error reading competitor file:", competitorFile);
    return;
  }

  console.table(marking.data);
};

const test_contracts_json = (competitorFolder) => {
  console.log("\n", "TEST:", "test_contracts_json", "\n");

  const marking = new Marking();

  const file = "./_solutions/session-01/01-db.json";
  const content = fs.readFileSync(file, "utf-8");
  const solution = JSON.parse(content);
  // console.log("-", "solution.length", solution.length);

  const competitorFile = `./competitors/${competitorFolder}/01-db.json`;
  try {
    const competitorContent = fs.readFileSync(competitorFile, "utf-8");
    const competitorSolution = JSON.parse(competitorContent);
    // console.log("-", "competitor.length", competitorSolution.length);
    marking.add(
      "json records",
      solution.contracts.length,
      competitorSolution.contracts.length,
      -1,
      0.95
    );

    // same params
    const sameParams = solution.contracts.reduce((acc, x) => {
      const found = competitorSolution.contracts.find((y) => y.id === x.id);
      if (found) {
        _.isEqual(x.params, found.params) ? acc++ : acc;
      }
      return acc;
    }, 0);
    marking.add("same params", solution.contracts.length, sameParams, -1, 0.9);

    // same records without params
    const same = solution.contracts.reduce((acc, x) => {
      const found = competitorSolution.contracts.find((y) => y.id === x.id);
      if (found) {
        _.isEqual({ ...x, params: undefined }, { ...found, params: undefined })
          ? acc++
          : acc;
      }
      return acc;
    }, 0);
    marking.add("same records", solution.contracts.length, same, -1, 0.9);
  } catch (error) {
    console.error("Error reading competitor file:", competitorFile);
    return;
  }
  console.table(marking.data);
};

const main = () => {
  let competitorFolder = "competitor-example";
  const args = process.argv.slice(2);
  if (args.length > 0) {
    competitorFolder = args[0];
  }
  console.log("competitorFolder", competitorFolder);

  test_customers_csv(competitorFolder);
  test_customers_json(competitorFolder);
  test_contracts_csv(competitorFolder);
  test_contracts_json(competitorFolder);
};

main();
