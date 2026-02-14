# FHIR API Automation Framework

A comprehensive test automation framework for FHIR (Fast Healthcare Interoperability Resources) APIs using Playwright.

## 📋 Overview

This project implements automated API testing for FHIR-compliant healthcare systems using Playwright's test runner. It includes test cases for CRUD operations on FHIR resources, negative test scenarios, and end-to-end workflows.

**Current Coverage:** Patient, Practitioner, and Encounter resources with full lifecycle testing.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fhir-api-automation
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Create .env file from template
cp .env.example .env

# Edit .env with your FHIR API endpoint
BASE_URL=https://hapi.fhir.org/baseR4
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with debug mode
npm run test:debug

# Run tests with UI mode (interactive)
npm run test:ui

# Run specific test suites
npm run test:smoke       # Smoke tests only
npm run test:regression  # Regression tests only
npm run test:e2e         # End-to-end tests only

# View test report
npm run report
```

## 📁 Project Structure

```
fhir-api-automation/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI/CD workflow
├── fixtures/
│   └── test-fixture.js           # Custom Playwright fixtures
├── test-data/
│   └── patientData.js            # Test data generators
├── tests/
│   ├── patient-create.spec.js    # Create patient tests
│   ├── patient-read.spec.js      # Read patient tests
│   ├── patient-update.spec.js    # Update patient tests
│   ├── patient-delete.spec.js    # Delete patient tests
│   ├── patient-negative.spec.js  # Negative scenario tests
│   └── e2e-patient-visit.spec.js # End-to-end workflow tests
├── utils/
│   └── apiclient.js              # FHIR API client wrapper
├── playwright.config.js          # Playwright configuration
├── package.json                  # Dependencies and scripts
├── .env.example                  # Environment variables template
└── README.md                      # This file
```

## 🛠️ Key Components

### ApiClient (`utils/apiclient.js`)

A wrapper around Playwright's request API for FHIR API operations:

```javascript
const { ApiClient } = require('../utils/apiclient');

// Usage in tests
const api = new ApiClient(request, baseURL);

// Create resource
const response = await api.create('Patient', patientData);

// Read resource
const response = await api.get('Patient', patientId);

// Update resource
const response = await api.update('Patient', patientId, updatedData);

// Delete resource
const response = await api.delete('Patient', patientId);
```

### Custom Test Fixture (`fixtures/test-fixture.js`)

Provides the `api` fixture for all tests, pre-configured with the `ApiClient`:

```javascript
test('Example test', async ({ api }) => {
  const response = await api.create('Patient', generatePatient());
  expect(response.status()).toBe(201);
});
```

### Test Data Generators (`test-data/patientData.js`)

Generates valid FHIR resources with unique identifiers:

```javascript
const { generatePatient } = require('../test-data/patientData');

const patient = generatePatient();
// Returns a valid FHIR Patient resource
```

## 📊 Test Categories

Tests are organized by tags for selective execution:

- **@smoke** - Quick smoke tests for critical functionality
- **@regression** - Full regression test suite
- **@e2e** - End-to-end workflows testing multiple resources
- **@patient** - Patient-related tests

## 🔄 CI/CD Integration

The project includes a GitHub Actions workflow (`.github/workflows/playwright.yml`) that:

1. Runs on push to `main` and pull requests
2. Sets up Node.js 18
3. Installs dependencies and Playwright browsers
4. Executes full test suite
5. Generates HTML report

## 📝 Test Examples

### Create Test
```javascript
test('@smoke @patient Patient - Create', async ({ api }) => {
  const response = await api.create('Patient', generatePatient());
  expect(response.status()).toBe(201);
  
  const body = await response.json();
  expect(body.resourceType).toBe('Patient');
  expect(body.id).toBeDefined();
});
```

### Read Test
```javascript
test('Patient - Read existing', async ({ api }) => {
  const create = await api.create('Patient', generatePatient());
  const patient = await create.json();
  
  const get = await api.get('Patient', patient.id);
  expect(get.status()).toBe(200);
  expect((await get.json()).id).toBe(patient.id);
});
```

### E2E Test
```javascript
test('Should complete visit flow end-to-end', async ({ api }) => {
  // Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  const patient = await patientResponse.json();
  
  // Create Practitioner
  const practitionerResponse = await api.create('Practitioner', practitionerData);
  
  // Create Encounter linking Patient and Practitioner
  const encounterResponse = await api.create('Encounter', encounterData);
  
  // Cleanup
  await api.delete('Encounter', encounterId);
  await api.delete('Practitioner', practitionerId);
  await api.delete('Patient', patientId);
});
```

## 🔧 Configuration

### Playwright Config (`playwright.config.js`)

Key settings:

- **testDir**: `./tests` - Location of test files
- **baseURL**: From `.env` BASE_URL - FHIR API endpoint
- **headers**: Default FHIR+JSON content type
- **reporter**: List and HTML reporters

```javascript
use: {
  baseURL: process.env.BASE_URL,
  extraHTTPHeaders: {
    'Content-Type': 'application/fhir+json'
  }
}
```

## 📚 Environment Variables

See `.env.example` for available options:

- `BASE_URL` - FHIR API base URL (required)

## 🚨 Common Issues

### Tests fail with 401/403
- Verify the `BASE_URL` in `.env` is correct and accessible
- Check if the API requires authentication headers

### Tests fail with connection errors
- Ensure the FHIR API server is running and reachable
- Check firewall/proxy settings

### Playwright browsers not found
```bash
npx playwright install --with-deps
```

## 📖 Resources

- [Playwright Documentation](https://playwright.dev/)
- [FHIR Specification](https://www.hl7.org/fhir/)
- [HAPI FHIR Server](https://hapifhir.io/)

## 🤝 Contributing

1. Create feature branch (`git checkout -b feature/test-for-feature`)
2. Write tests following existing patterns
3. Ensure all tests pass (`npm test`)
4. Commit changes and push to branch
5. Create pull request

## 📄 License

ISC

## ✅ Checklist - Next Steps

- [ ] Update API credentials/authentication if needed
- [ ] Add tests for additional FHIR resource types
- [ ] Implement test data validation schema
- [ ] Add performance/load testing
- [ ] Set up test result aggregation/reporting
- [ ] Add Slack/email notifications for CI/CD
