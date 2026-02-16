require('dotenv').config();

const { Given, When, Then } = require('@cucumber/cucumber');
const { request, expect } = require('@playwright/test');
const { getBaseUrl } = require('../../utils/env');

const baseURL = getBaseUrl();

console.log(`Running tests in ${process.env.ENV} environment`);
console.log(`BASE URL: ${baseURL}`);

Given('I create a patient', async function () {
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

  const patient = await response.json();
  this.patientId = patient.id;
});

When('I request medication', async function () {
  const medicationResponse = await this.apiContext.post(`${baseURL}/MedicationRequest`, {
    headers: {
      'Content-Type': 'application/fhir+json'
    },
    data: {
      resourceType: 'MedicationRequest',
      status: 'active',
      intent: 'order',
      subject: {
        reference: `Patient/${this.patientId}`
      },
      medicationCodeableConcept: {
        coding: [
          {
            system: 'http://www.nlm.nih.gov/research/umls/rxnorm',
            code: '860975',
            display: 'Amoxicillin 250mg'
          }
        ]
      }
    }
  });

  this.medicationResponse = medicationResponse;
});

Then('medication should be created successfully', async function () {
  expect(this.medicationResponse.status()).toBe(201);
});

