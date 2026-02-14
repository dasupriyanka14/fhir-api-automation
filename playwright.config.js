require('dotenv').config();
const path = require('path');

function getBaseUrl() {
  const env = process.env.ENV || 'QA';

  switch (env) {
    case 'QA':
      return process.env.QA_URL;
    case 'UAT':
      return process.env.UAT_URL;
    case 'PROD':
      return process.env.PROD_URL;
    default:
      return process.env.QA_URL;
  }
}

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  testDir: './tests',

  timeout: 60000,

  expect: {
    timeout: 5000
  },

  use: {
    baseURL: getBaseUrl(),
    extraHTTPHeaders: {
      'Content-Type': 'application/fhir+json'
    }
  },

  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright']
  ],

  resolve: {
    alias: {
      fixtures: path.resolve(__dirname, './fixtures'),
      utils: path.resolve(__dirname, './utils'),
      testdata: path.resolve(__dirname, './test-data')
    }
  }
};

module.exports = config;
