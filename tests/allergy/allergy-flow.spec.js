const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @allergy AllergyIntolerance Flow', async ({ api }) => {

  // Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  const patient = await patientResponse.json();
  const patientId = patient.id;

  // Create Allergy
  const allergyResponse = await api.create('AllergyIntolerance', {
    resourceType: "AllergyIntolerance",
    clinicalStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
        code: "active"
      }]
    },
    verificationStatus: {
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
        code: "confirmed"
      }]
    },
    code: {
      coding: [{
        system: "http://snomed.info/sct",
        code: "91936005",
        display: "Allergy to peanuts"
      }]
    },
    patient: {
      reference: `Patient/${patientId}`
    }
  });

  expect(allergyResponse.status()).toBe(201);

  const allergy = await allergyResponse.json();
  const allergyId = allergy.id;

  // Verify
  const getAllergy = await api.get('AllergyIntolerance', allergyId);
  expect(getAllergy.status()).toBe(200);

  // Cleanup
  await api.delete('AllergyIntolerance', allergyId);
  await api.delete('Patient', patientId);
});
