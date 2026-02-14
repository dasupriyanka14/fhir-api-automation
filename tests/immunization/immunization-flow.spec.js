const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @immunization Immunization Flow', async ({ api }) => {

  // Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  expect(patientResponse.status()).toBe(201);

  const patient = await patientResponse.json();
  const patientId = patient.id;

  // Create Immunization
  const immunizationResponse = await api.create('Immunization', {
    resourceType: "Immunization",
    status: "completed",

    vaccineCode: {
      coding: [
        {
          system: "http://hl7.org/fhir/sid/cvx",
          code: "207",
          display: "COVID-19 vaccine"
        }
      ]
    },

    patient: {
      reference: `Patient/${patientId}`
    },

    occurrenceDateTime: new Date().toISOString(),

    primarySource: true
  });

  expect(immunizationResponse.status()).toBe(201);

  const immunization = await immunizationResponse.json();
  const immunizationId = immunization.id;

  // Read Immunization
  const readResponse = await api.get('Immunization', immunizationId);
  expect(readResponse.status()).toBe(200);

  // Cleanup
  await api.delete('Immunization', immunizationId);
  await api.delete('Patient', patientId);
});
