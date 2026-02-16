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
      return process.env.BASE_URL;
  }
}

module.exports = { getBaseUrl };
