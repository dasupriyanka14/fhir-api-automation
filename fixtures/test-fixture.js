const base = require('@playwright/test');
const { ApiClient } = require('../utils/apiclient');

exports.test = base.test.extend({
  api: async ({ request, baseURL }, use) => {
    const api = new ApiClient(request, baseURL);
    await use(api);
  }
});

exports.expect = base.expect;
