const { allure } = require('allure-playwright');
const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

const patientSchema = require('../../schemas/patient.schema.json');
const { validateSchema } = require('../../utils/schemaValidator');

test('@smoke @patient Patient - Create', async ({ api }) => {

await allure.epic('FHIR API');
  await allure.feature('Patient');
  await allure.story('Create Patient');
  
  const start = Date.now();

  const response = await api.create('Patient', generatePatient());

  const duration = Date.now() - start;

  console.log(`⏱ API Response time: ${duration} ms`);

  expect(duration).toBeLessThan(6000);

  if (duration > 3000) {
  console.warn(`⚠️ Performance warning: API took ${duration} ms`);
}

  expect(response.status()).toBe(201);

  const body = await response.json();

  validateSchema(patientSchema, body);

  expect(body.id).toBeDefined();
});
