const { test, expect } = require('../fixtures/test-fixture');
const { generatePatient } = require('../test-data/patientData');

test('Patient - Read existing', async ({ api }) => {

  const create = await api.create('Patient', generatePatient());
  expect(create.status()).toBe(201);

  const patient = await create.json();

  const get = await api.get('Patient', patient.id);
  expect(get.status()).toBe(200);

  const body = await get.json();
  expect(body.id).toBe(patient.id);
});
