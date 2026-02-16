require('dotenv').config();

const { Given, When, Then } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');
const { getBaseUrl } = require('../../utils/env');

const baseURL = getBaseUrl();

console.log(`Running tests in ${process.env.ENV} environment`);
console.log(`BASE URL: ${baseURL}`);

Given('I create a new patient', async function () {
  this.apiContext = await request.newContext();

  const response = await this.apiContext.post(`${baseURL}/Patient`, {
    headers: {
      'Content-Type': 'application/fhir+json'
    },
    data: {
      resourceType: 'Patient',
      name: [
        {
          family: `Automation${Date.now()}`,
          given: ['BDD']
        }
      ],
      gender: 'female',
      birthDate: '1995-01-01'
    }
  });

  if (response.status() !== 201) {
    const text = await response.text();
    console.log("FHIR error:", text);
    throw new Error(`Patient creation failed: ${response.status()}`);
  }

  this.patient = await response.json();
  this.patientId = this.patient.id;
});

When('I read the patient', async function () {
  const response = await this.apiContext.get(`${baseURL}/Patient/${this.patientId}`, {
    headers: {
      'Content-Type': 'application/fhir+json'
    }
  });

  expect(response.status()).toBe(200);
  this.readPatient = await response.json();
});

Then('patient details should be returned', function () {
  expect(this.readPatient.id).toBe(this.patientId);
});
