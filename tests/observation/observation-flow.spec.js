const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @observation Observation Flow', async ({ api }) => {

  // Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  expect(patientResponse.status()).toBe(201);

  const patient = await patientResponse.json();
  const patientId = patient.id;

  // Create Observation (Blood Pressure)
  const observationResponse = await api.create('Observation', {
    resourceType: "Observation",
    status: "final",

    category: [{
      coding: [{
        system: "http://terminology.hl7.org/CodeSystem/observation-category",
        code: "vital-signs"
      }]
    }],

    code: {
      coding: [{
        system: "http://loinc.org",
        code: "85354-9",
        display: "Blood pressure panel"
      }]
    },

    subject: {
      reference: `Patient/${patientId}`
    },

    component: [
      {
        code: {
          coding: [{
            system: "http://loinc.org",
            code: "8480-6",
            display: "Systolic"
          }]
        },
        valueQuantity: {
          value: 120,
          unit: "mmHg"
        }
      },
      {
        code: {
          coding: [{
            system: "http://loinc.org",
            code: "8462-4",
            display: "Diastolic"
          }]
        },
        valueQuantity: {
          value: 80,
          unit: "mmHg"
        }
      }
    ]
  });

  expect(observationResponse.status()).toBe(201);

  const observation = await observationResponse.json();
  const observationId = observation.id;

  // Read
  const read = await api.get('Observation', observationId);
  expect(read.status()).toBe(200);

  // Cleanup
  await api.delete('Observation', observationId);
  await api.delete('Patient', patientId);
});
