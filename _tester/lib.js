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

module.exports = {
  csv2json,
};
