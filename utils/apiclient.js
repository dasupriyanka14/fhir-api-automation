class ApiClient {
  constructor(request, baseURL) {
    this.request = request;
    this.baseURL = baseURL;
    this.headers = {
      'Content-Type': 'application/fhir+json'
    };
  }

  async create(resourceType, body) {
    return await this.request.post(`${this.baseURL}/${resourceType}`, {
      headers: this.headers,
      data: body
    });
  }

  async get(resourceType, id) {
    return await this.request.get(`${this.baseURL}/${resourceType}/${id}`);
  }

  async update(resourceType, id, body) {
    return await this.request.put(`${this.baseURL}/${resourceType}/${id}`, {
      headers: this.headers,
      data: body
    });
  }

  async delete(resourceType, id) {
    return await this.request.delete(`${this.baseURL}/${resourceType}/${id}`);
  }
}

module.exports = { ApiClient };
