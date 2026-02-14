#  FHIR API Automation Framework – Playwright

A production-ready **Healthcare API Automation Framework** built using **Playwright + JavaScript** to validate FHIR-compliant healthcare systems.
This project demonstrates scalable, maintainable, and real-world test automation aligned with enterprise healthcare workflows.

---

##  Key Features

*  End-to-end healthcare workflow automation
*  FHIR-compliant API testing
*  Modular and scalable architecture
*  Custom API client with logging
*  Environment-based execution (QA / UAT / PROD)
*  Test tagging (Smoke, Regression, E2E)
*  Schema validation using AJV
*  Allure reporting with request/response attachments
*  Docker execution support
*  CI/CD integration with GitHub Actions

---

##  Project Structure

```
fhir-api-automation/
│
├── tests/
│   ├── patient/
│   ├── appointment/
│   ├── allergy/
│   ├── condition/
│   ├── medication/
│   ├── immunization/
│   ├── observation/
│   └── e2e/
│
├── fixtures/
├── utils/
├── test-data/
├── .github/workflows/
├── Dockerfile
└── playwright.config.js
```

---

##  Healthcare Modules Covered

This framework automates critical healthcare workflows:

* Patient Management
* Appointment Scheduling
* Allergy & Condition Tracking
* Medication & Immunization
* Coverage & Insurance
* Observation & Vital Signs
* Full Visit Lifecycle (E2E)

---

##  Installation

```bash
npm install
```

---

##  Run Tests

Run all tests:

```bash
npm test
```

Run regression suite:

```bash
npm run test:regression
```

Run smoke suite:

```bash
npm run test:smoke
```

Run E2E workflow:

```bash
npm run test:e2e
```

---

##  Environment Execution

Supports multiple environments using `.env`:

```bash
npm run test:uat
npm run test:prod
```

---

##  Reporting

Generate Allure report:

```bash
npx allure serve
```

Includes:

* Request & response attachments
* Test execution insights
* Failure analysis

---

##  Docker Execution

Run framework inside Docker:

```bash
docker build -t fhir-playwright .
docker run --env-file .env fhir-playwright
```

---

##  CI/CD Integration

GitHub Actions pipeline automatically runs tests on:

* Pull requests
* Code commits
* Continuous validation

---

##  Tech Stack

* Playwright
* JavaScript (Node.js)
* FHIR Healthcare Standard
* AJV Schema Validation
* Allure Reporting
* Docker
* GitHub Actions

---

##  Why This Framework?

This project reflects real-world enterprise healthcare testing:

* Scalable architecture
* Clean code practices
* Domain-driven automation
* Continuous integration readiness

---

