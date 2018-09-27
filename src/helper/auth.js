import Cookie from "isomorphic-cookie";

class Auth{
  isLoggedIn() {
    return (Cookie.load('ys_accesstoken'));
  }

  registerLogin(result) {
    Cookie.save('ys_accesstoken', result.jwt.AccessToken, { secure: false });
    Cookie.save('ys_expires', result.jwt.ExpiresIn, { secure: false });
    Cookie.save('ys_token', result.jwt.TokenType, { secure: false });
    Cookie.save('ys_refreshtoken', result.jwt.RefreshToken, { secure: false });
    Cookie.save('ys_idtoken', result.jwt.IdToken, { secure: false });
    Cookie.save('ys_newdevicemetadata', result.jwt.NewDeviceMetadata, { secure: false });
  }

  getAuthorizationHeader() {
    return JSON.stringify({
      AccessToken: Cookie.load('ys_credentials') || '',
      ExpiresIn: Cookie.load('ys_expires') || '',
      TokenType: Cookie.load('ys_token') || '',
      RefreshToken: Cookie.load('ys_refreshtoken') || '',
      IdToken: Cookie.load('ys_idtoken') || '',
      NewDeviceMetadata: Cookie.load('ys_newdevicemetadata') || ''
    }, null, 0);
  }

  logout() {
    //--Save The Token to Cookie
    Cookie.remove('ys_accesstoken');
    Cookie.remove('ys_expires');
    Cookie.remove('ys_token');
    Cookie.remove('ys_refreshtoken');
    Cookie.remove('ys_idtoken');
    Cookie.remove('ys_newdevicemetadata');
  }
}

export default new Auth();
