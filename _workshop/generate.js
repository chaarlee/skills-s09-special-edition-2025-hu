const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateSkills = () => {
  // expert_id,skill_name,skill_level,years_of_experience,certified
  // E001,Web Development,Advanced,5,TRUE
  // E002,CAD Design,Intermediate,3,FALSE
  // E003,Network Security,Expert,8,TRUE
  // E004,3D Animation,Beginner,1,FALSE
  // E005,Cloud Engineering,Advanced,6,TRUE

  const skills = [
    {
      id: "E001",
      name: "Web Development",
      description: "Building and maintaining websites",
    },
    {
      id: "E002",
      name: "CAD Design",
      description: "Creating detailed 2D and 3D designs",
    },
    {
      id: "E003",
      name: "Network Security",
      description: "Protecting networks from threats",
    },
    {
      id: "E004",
      name: "3D Animation",
      description: "Creating animated 3D graphics",
    },
    {
      id: "E005",
      name: "Cloud Engineering",
      description: "Designing and managing cloud systems",
    },
    {
      id: "E006",
      name: "Software Development",
      description: "Creating software applications",
    },
    {
      id: "E007",
      name: "Data Analysis",
      description: "Analyzing data to extract insights",
    },
    {
      id: "E008",
      name: "Machine Learning",
      description: "Developing algorithms that learn from data",
    },
    {
      id: "E009",
      name: "Project Management",
      description: "Planning and executing projects",
    },
    {
      id: "E010",
      name: "Digital Marketing",
      description: "Promoting products online",
    },
  ];

  return skills.map((skill) => ({
    id: faker.string.uuid(),
    oldId: skill.id,
    name: skill.name,
    description: skill.description,
  }));
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

const generateExpert = (skill) => {
  const expert = {
    id: faker.string.uuid(),
    skillId: skill.id,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number("+1 (###) ###-####"),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zipCode: faker.location.zipCode(),
    },
    age: faker.number.int({ min: 24, max: 75 }),
    gender: faker.helpers.arrayElement(["M", "F", "F"]),
  };
  return expert;
};

const CNT = {
  skills: 10,
  experts: 20,
};

const main = async () => {
  const db = {};
  db.skills = generateSkills();

  console.log("Skills CNT:", db.skills.length);
  console.log("Skills example:", db.skills[0]);

  // Experts
  db.experts = [];
  for (skill of db.skills) {
    for (let i = 0; i < CNT.experts; i++) {
      const expert = generateExpert(skill);
      db.experts.push(expert);
    }
  }
  console.log("Expert example:", db.experts[0]);

  //   console.log(JSON.stringify(db, null, 2));
  // write to db.json
  if (!fs.existsSync("./assets")) {
    fs.mkdirSync("./assets");
  }
  fs.writeFileSync("./assets/db.json", JSON.stringify(db, null, 2));
  console.log(`db.json created`);

  // save skills to csv
  const skillsCsv = json2csv(db.skills);
  fs.writeFileSync("./assets/skills.csv", skillsCsv);
  console.log(`skills.csv created`);

  // save experts to csv
  const expertsCsv = json2csv(
    db.experts.map((expert) => ({
      ...expert,
      skillName: db.skills.find((skill) => skill.id === expert.skillId).name,
      address: JSON.stringify(expert.address),
    }))
  );
  fs.writeFileSync("./assets/experts.csv", expertsCsv);
  console.log(`experts.csv created`);
};

main();
