const { test, expect } = require('../../fixtures/test-fixture');
const { generatePatient } = require('../../test-data/patientData');

test('@regression @appointment Create Appointment', async ({ api }) => {

  // Step 1: Create Patient
  const patientResponse = await api.create('Patient', generatePatient());
  expect(patientResponse.status()).toBe(201);

  const patient = await patientResponse.json();
  const patientId = patient.id;

  // Step 2: Create Appointment
  const appointmentPayload = {
    resourceType: "Appointment",
    status: "booked",
    participant: [
      {
        actor: {
          reference: `Patient/${patientId}`
        },
        status: "accepted"
      }
    ],
    start: "2026-01-01T10:00:00Z",
    end: "2026-01-01T10:30:00Z"
  };

  const appointmentResponse = await api.create('Appointment', appointmentPayload);
  expect(appointmentResponse.status()).toBe(201);

  const appointment = await appointmentResponse.json();
  const appointmentId = appointment.id;

  // Step 3: Validate appointment
  const getAppointment = await api.get('Appointment', appointmentId);
  expect(getAppointment.status()).toBe(200);

  const appointmentData = await getAppointment.json();
  expect(appointmentData.participant[0].actor.reference)
    .toBe(`Patient/${patientId}`);

  // Step 4: Cleanup
  await api.delete('Appointment', appointmentId);
  await api.delete('Patient', patientId);
});
