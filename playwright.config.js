require('dotenv').config({ quiet: true });

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',

  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      'Content-Type': 'application/fhir+json'
    }
  },

  reporter: [
    ['list'],
    ['html']
  ]
});




