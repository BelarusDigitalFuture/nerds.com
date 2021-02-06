module.exports = {
  mongo: {
    connection: process.env.MONGO_CONNECTION,
  },
  apiUrl: 'http://3.130.192.243:3000',
  landingUrl: 'http://3.130.192.243',
  cookieDomain: 'nerds',
  isProduction: true,
  winston: {
    level: 'info',
  },
};
