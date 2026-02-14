const { test, expect } = require('../fixtures/test-fixture');
const { generatePatient } = require('../test-data/patientData');

test('@smoke @patient Patient - Create', async ({ api }) => {

  const response = await api.create('Patient', generatePatient());

  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.resourceType).toBe('Patient');
  expect(body.id).toBeDefined();
});
