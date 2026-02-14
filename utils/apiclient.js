const { allure } = require('allure-playwright');

class ApiClient {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;

    this.headers = {
      'Content-Type': 'application/fhir+json'
    };
  }

  // CREATE
  async create(resourceType, body) {
  let retries = 2;
  let response;

  for (let i = 0; i <= retries; i++) {
    try {
      console.log(`\n[REQUEST] POST ${resourceType}`);
      console.log("Payload:\n", JSON.stringify(body, null, 2));

      await allure.attachment(
        `Request - ${resourceType}`,
        JSON.stringify(body, null, 2),
        'application/json'
      );

      response = await this.request.post(`${this.baseURL}/${resourceType}`, {
        headers: this.headers,
        data: body
      });

      const data = await response.json();

      console.log(`[RESPONSE] Status: ${response.status()}`);
      console.log("Response:\n", JSON.stringify(data, null, 2));

      await allure.attachment(
        `Response - ${resourceType}`,
        JSON.stringify(data, null, 2),
        'application/json'
      );

      if (response.status() < 500) {
        return response;
      }

      console.warn(`Retrying API... attempt ${i + 1}`);

    } catch (error) {
      console.warn(`API error. Retry attempt ${i + 1}`);
    }
  }

  return response;
}

  // GET
  async get(resourceType, id) {
    console.log(`\n[REQUEST] GET ${resourceType}/${id}`);

    const response = await this.request.get(`${this.baseURL}/${resourceType}/${id}`, {
      headers: this.headers
    });

    console.log(`[RESPONSE] Status: ${response.status()}`);

    const data = await response.json();
    console.log("Response:\n", JSON.stringify(data, null, 2));

    return response;
  }

  // UPDATE
  async update(resourceType, id, body) {
    console.log(`\n[REQUEST] PUT ${resourceType}/${id}`);
    console.log("Payload:\n", JSON.stringify(body, null, 2));

    const response = await this.request.put(`${this.baseURL}/${resourceType}/${id}`, {
      headers: this.headers,
      data: body
    });

    console.log(`[RESPONSE] Status: ${response.status()}`);

    const data = await response.json();
    console.log("Response:\n", JSON.stringify(data, null, 2));

    return response;
  }

  // DELETE
  async delete(resourceType, id) {
    console.log(`\n[REQUEST] DELETE ${resourceType}/${id}`);

    const response = await this.request.delete(`${this.baseURL}/${resourceType}/${id}`, {
      headers: this.headers
    });

    console.log(`[RESPONSE] Status: ${response.status()}`);

    if (response.status() !== 200 && response.status() !== 204) {
      console.warn(`⚠️ Delete failed for ${resourceType}/${id}, continuing...`);
    }

    return response;
  }
}

module.exports = { ApiClient };
