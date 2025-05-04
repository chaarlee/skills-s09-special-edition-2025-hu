const round = (value, precision = 2) => {
  const factor = Math.pow(10, precision);
  return Math.round(value * factor) / factor;
};

const csv2json = (csv, sep = "\t") => {
  const lines = csv.split("\n");
  const headers = lines[0].split(sep);
  if (lines.length < 2) {
    return [];
  }
  if (lines[1].length === 0) {
    return [];
  }
  const json = lines.slice(1).map((line) => {
    const values = line.split(sep);
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index];
    });
    return obj;
  });
  return json;
};

class Marking {
  constructor() {
    this.data = [];
  }
  add(name, expected, value, score = -1, zeroLimit = 0) {
    if (score === -1) {
      score = 1 - Math.abs(expected - value) / expected;
    }
    if (zeroLimit > 0) {
      score = (score - zeroLimit) / (1 - zeroLimit);
    }
    if (score < 0) {
      score = 0;
    }
    if (score > 1) {
      score = 1;
    }
    this.data.push({
      name: name,
      score: round(score),
      value: value,
      expected: expected,
    });
  }
}

module.exports = {
  csv2json,
  Marking,
};
