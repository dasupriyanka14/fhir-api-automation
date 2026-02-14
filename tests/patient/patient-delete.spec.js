const { test, expect } = require('../fixtures/test-fixture');
const { generatePatient } = require('../test-data/patientData');

test('Patient - Delete', async ({ api }) => {

  const create = await api.create('Patient', generatePatient());
  const patient = await create.json();

  const del = await api.delete('Patient', patient.id);

  expect(del.status()).toBe(200);
});
