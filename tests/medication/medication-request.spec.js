const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @medication Medication Request Flow', async ({ api }) => {

  //  Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  expect(patientResponse.status()).toBe(201);

  const patient = await patientResponse.json();
  const patientId = patient.id;

  //  Create MedicationRequest
  const medicationPayload = {
    resourceType: "MedicationRequest",
    status: "active",
    intent: "order",
    subject: {
      reference: `Patient/${patientId}`
    },
    medicationCodeableConcept: {
      coding: [{
        system: "http://www.nlm.nih.gov/research/umls/rxnorm",
        code: "860975",
        display: "Amoxicillin"
      }]
    }
  };

  const medResponse = await api.create('MedicationRequest', medicationPayload);
  expect(medResponse.status()).toBe(201);

  const medication = await medResponse.json();
  const medId = medication.id;

  //  Validate
  const getMed = await api.get('MedicationRequest', medId);
  expect(getMed.status()).toBe(200);

  const medData = await getMed.json();
  expect(medData.subject.reference).toBe(`Patient/${patientId}`);

  // Cleanup
  await api.delete('MedicationRequest', medId);
  await api.delete('Patient', patientId);
});
