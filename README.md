#  FHIR API Automation Framework – Playwright + BDD

A **production-ready Healthcare API Automation Framework** built using **Playwright, JavaScript, and Cucumber (BDD)** to validate FHIR-compliant healthcare systems.
This project demonstrates **enterprise-level automation, real-world healthcare workflows, and modern DevOps practices**.

---

##  Key Highlights

✔ End-to-end healthcare workflow automation
✔ FHIR-compliant API validation
✔ Hybrid framework: Playwright + Cucumber (BDD)
✔ Modular, scalable, and maintainable architecture
✔ Custom reusable API client with logging & retry
✔ Schema validation using AJV
✔ Tag-based and parallel execution
✔ Environment-based testing (QA / UAT / PROD)
✔ Allure reporting with request & response attachments
✔ Dockerized execution
✔ CI/CD integration with GitHub Actions

---

##  Healthcare Workflows Covered

This framework automates critical real-world healthcare modules:

• Patient Management
• Appointment Scheduling
• Allergy & Condition Tracking
• Medication & Immunization
• Coverage & Insurance
• Observation & Vital Signs
• Full Visit Lifecycle (End-to-End)

---

##  Automation + BDD Strategy

This project combines:

• **Robust API Automation using Playwright**
• **Business-driven test scenarios using Cucumber (BDD)**

Supports:
• Parallel execution
• Tag-based runs (@smoke, @regression, @e2e)
• Clean reusable step definitions
• Scalable test design

---

##  Quick Setup

```bash
npm install
```

Run all Playwright tests:

```bash
npm test
```

Run BDD scenarios:

```bash
npm run test:bdd
```

Run regression suite:

```bash
npm run test:regression
```

---

##  Environment Configuration

Supports multi-environment execution via `.env`:

```bash
ENV=QA | UAT | PROD
```

This enables seamless testing across different healthcare environments.

---

##  Reporting

Generate Allure report:

```bash
npx allure serve
```

Includes:
• Request & response logs
• Failure debugging
• Execution insights
• Rich visual dashboards

---

##  Docker Support

Run the framework inside Docker:

```bash
docker build -t fhir-playwright .
docker run --env-file .env fhir-playwright
```

---

##  CI/CD Integration

Automated execution using GitHub Actions:

• Runs on commits and pull requests
• Continuous healthcare validation
• DevOps-ready automation pipeline

---

##  Tech Stack

• Playwright
• JavaScript (Node.js)
• Cucumber (BDD)
• FHIR Healthcare Standard
• AJV Schema Validation
• Allure Reporting
• Docker
• GitHub Actions

---

##  Why This Project?

This framework reflects **real enterprise healthcare testing**:

✔ Domain-driven automation
✔ Scalable and reusable architecture
✔ Clean coding and best practices
✔ Continuous integration readiness
✔ Real-world healthcare workflows

----
