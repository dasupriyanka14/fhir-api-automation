const { test, expect } = require('../../fixtures/test-fixture');

test.describe('Negative Scenarios - Patient API', () => {

  test('Should fail when required fields are missing', async ({ api }) => {

    const invalidPatient = {
      resourceType: "Patient"
    };

    const response = await api.create('Patient', invalidPatient);

    expect(response.status()).not.toBe(201);
  });
});