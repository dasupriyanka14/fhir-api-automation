const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @patient Patient - Update', async ({ api }) => {
    
  const create = await api.create('Patient', generatePatient());
  const patient = await create.json();

  const updatedPatient = {
    ...patient,
    active: false
  };

  const update = await api.request.put(
    `${api.baseURL}/Patient/${patient.id}`,
    {
      headers: api.headers,
      data: updatedPatient
    }
  );

  expect(update.status()).toBe(200);
});

