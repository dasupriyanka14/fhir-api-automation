function generatePatient() {
  const unique = Date.now();

  return {
    resourceType: "Patient",
    name: [{
      family: "Automation" + unique,
      given: ["E2E"]
    }],
    gender: "female",
    birthDate: "1995-01-01"
  };
}

module.exports = { generatePatient };
