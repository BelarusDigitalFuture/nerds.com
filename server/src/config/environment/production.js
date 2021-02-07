module.exports = {
  mongo: {
    connection: process.env.MONGO_CONNECTION,
  },
  apiUrl: 'https://geekcon.online:8443',
  landingUrl: 'https://geekcon.online',
  cookieDomain: 'https://geekcon.online',
  isProduction: true,
  winston: {
    level: 'info',
  },
};
