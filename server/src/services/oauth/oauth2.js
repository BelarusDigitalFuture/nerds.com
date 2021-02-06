const simpleOauth2 = require('simple-oauth2');

class OAuth2Client {
  constructor(credentials, redirectUrl) {
    this.oauth2 = simpleOauth2.create(credentials);
    this.redirectUrl = redirectUrl;
  }

  getAuthUrl(scope, state) {
    return this.oauth2.authorizationCode.authorizeURL({
      redirect_uri: this.redirectUrl,
      scope: scope ? scope.join(' ') : null,
      state,
      access_type: 'offline',
      prompt: 'consent',
    });
  }

  authorize(authCode) {
    const tokenConfig = {
      code: authCode,
      redirect_uri: this.redirectUrl,
    };

    return this.oauth2.authorizationCode.getToken(tokenConfig)
      .then((result) => {
        return this.oauth2.accessToken.create(result);
      });
  }
}

module.exports = OAuth2Client;
