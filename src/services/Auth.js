import { post } from './request';
import jwtDecode from 'jwt-decode';
import {
  Preferences,
  JWT_TOKEN,
  USER_PROFILE_INFO,
  PROJECT_TOKEN_INFO,
  USER_TOKEN_NEWS
} from './preferences';

export const Auth = {

  async signup(body) {
    return post('account/register', { body, store: JWT_TOKEN });
  },

  async signin(body) {
    return post('account/authenticate', { body, store: JWT_TOKEN });
  },

  async getProfile() {
    return post('account/userinfo', { authorize: true, store: USER_PROFILE_INFO })
  },

  async recoveryPassword(body) {
    return post('user/recover', { body });
  },

  async resetPassword(resetToken, password) {
    return post('user/password/change', { body: { password, token:resetToken } });
  },

  async isAuthenticated() {
    const jwt = await Preferences.getItem(JWT_TOKEN);
    if (jwt) {
      console.log("JWT TOKEN:", jwt);
      const jwtDecoded = jwtDecode(jwt);
      if ((new Date().getTime()) < jwtDecoded.exp * 1000) {
        return true;
      }
    }
    return false;
  },

  async logout() {
    await Preferences.removeMultiItem([
      JWT_TOKEN,
      USER_PROFILE_INFO,
      PROJECT_TOKEN_INFO,
      USER_TOKEN_NEWS
    ]);
    // return Promise.all([
    //   Preferences.removeItem(JWT_TOKEN),
    //   Preferences.removeItem(USER_PROFILE_INFO),
    //   Preferences.removeItem(PROJECT_TOKEN_INFO),
    //   Preferences.removeItem(USER_TOKEN_NEWS),
    // ]);
  },

};
