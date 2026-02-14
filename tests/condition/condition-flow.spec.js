const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @condition Condition Flow', async ({ api }) => {

  // Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  const patient = await patientResponse.json();
  const patientId = patient.id;

  // Create Condition
  const conditionResponse = await api.create('Condition', {
    resourceType: "Condition",
    clinicalStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
        code: "active"
      }]
    },
    code: {
      coding: [{
        system: "http://snomed.info/sct",
        code: "44054006",
        display: "Diabetes mellitus type 2"
      }]
    },
    subject: {
      reference: `Patient/${patientId}`
    }
  });

  expect(conditionResponse.status()).toBe(201);

  const condition = await conditionResponse.json();
  const conditionId = condition.id;

  // Verify
  const getCondition = await api.get('Condition', conditionId);
  expect(getCondition.status()).toBe(200);

  // Cleanup
  await api.delete('Condition', conditionId);
  await api.delete('Patient', patientId);
});
