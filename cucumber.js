module.exports = {
  default: {
    require: ["bdd/step-definitions/**/*.js"],
    format: ["allure-cucumberjs/reporter"],
    formatOptions: {
      resultsDir: "allure-results"
    }
  }
};
