const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } =  require('../../test-data/patientData');

test.describe('@e2e Full Visit Lifecycle', () => {

  test('Should complete visit flow end-to-end', async ({ api }) => {

    // 1️⃣ Create Patient
    const patientResponse = await api.create('Patient', generatePatient());
    expect(patientResponse.status()).toBe(201);
    const patient = await patientResponse.json();
    const patientId = patient.id;

    // 2️⃣ Create Practitioner
    const practitionerResponse = await api.create('Practitioner', {
      resourceType: "Practitioner",
      name: [{
        family: "Doctor" + Date.now(),
        given: ["John"]
      }]
    });

    expect(practitionerResponse.status()).toBe(201);
    const practitioner = await practitionerResponse.json();
    const practitionerId = practitioner.id;

    // 3️⃣ Create Encounter
    const encounterResponse = await api.create('Encounter', {
      resourceType: "Encounter",
      status: "finished",
      class: {
        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
        code: "AMB"
      },
      subject: { reference: `Patient/${patientId}` },
      participant: [{
        individual: { reference: `Practitioner/${practitionerId}` }
      }]
    });

    expect(encounterResponse.status()).toBe(201);
    const encounter = await encounterResponse.json();
    const encounterId = encounter.id;

    // Cleanup
    await api.delete('Encounter', encounterId);
    await api.delete('Practitioner', practitionerId);
    await api.delete('Patient', patientId);

  });

});
