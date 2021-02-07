module.exports = {
  mongo: {
    connection: process.env.MONGO_CONNECTION,
  },
  apiUrl: 'https://geekcon.online:8443',
  landingUrl: 'https://geekcon.online',
  cookieDomain: 'geekcon.online',
  isProduction: true,
  winston: {
    level: 'info',
  },
};
