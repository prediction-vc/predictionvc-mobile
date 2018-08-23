import { AsyncStorage } from 'react-native';
import { Base64 } from 'js-base64';

const STORAGE_KEY_ENCRYPTED = 'preferences';
const LOADING_PREFERENCES_TIMEOUT = 10000; // milliseconds

async function loadRawPreferences() {
  try {
    const enc = await AsyncStorage.getItem(STORAGE_KEY_ENCRYPTED);
    if (enc) {
      const json = Base64.decode(enc);
      return JSON.parse(json);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
  }
  return null;
}

async function saveRawPreferences(preferences) {
  try {
    const json = JSON.stringify(preferences);
    const raw = Base64.encode(json);
    await AsyncStorage.setItem(STORAGE_KEY_ENCRYPTED, raw);
  } catch (error) {
    console.log(JSON.stringify(error));
  }
}

let preferences = null;
loadRawPreferences().then((json) => {
  if (json) {
    preferences = json;
  } else {
    preferences = {};
  }
});

const timeStartLoadingPreferences = new Date().getTime();

function waitLoadingPreferences() {
  return new Promise((resolve, reject) => {
    if (preferences) {
      resolve();
    } else {
      if (new Date().getTime() - timeStartLoadingPreferences > LOADING_PREFERENCES_TIMEOUT) {
        reject(new Error('Timeout: Loading AsyncStorage'));
      }
      setTimeout(() => {
        waitLoadingPreferences().then(resolve, reject);
      }, 1000);
    }
  });
}

export const Preferences = {

  async getAll() {
    await waitLoadingPreferences();
    return preferences;
  },

  async getItem(key) {
    await waitLoadingPreferences();
    return preferences[key];
  },

  async setItem(key, value) {
    await waitLoadingPreferences();
    preferences[key] = value;
    saveRawPreferences(preferences).then();
  },

  async removeItem(key) {
    await waitLoadingPreferences();
    delete preferences[key];
    saveRawPreferences(preferences).then();
  },

  async removeMultiItem(keys) {
    await waitLoadingPreferences();
    keys.map(key => delete preferences[key]);
    saveRawPreferences(preferences).then();
  },

  async parseJsonItem(key) {
    const json = await this.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  },

  async saveItemAsJson(key, value) {
    if (value) {
      return this.setItem(key, JSON.stringify(value));
    }
    return this.removeItem(key);
  },

  async clear() {
    await AsyncStorage.clear();
  }

};

export const JWT_TOKEN = 'jwt';
export const USER_PROFILE_INFO  = 'USER_PROFILE_INFO';
export const PROJECT_TOKEN_INFO = 'PROJECT_TOKEN_INFO';
export const USER_TOKEN_NEWS    = 'USER_TOKEN_NEWS';
export const COMPLETE_TUTORIAL  = 'COMPLETE_TUTORIAL';
export const DISPLAY_COLUMNS    = 'DISPLAY_COLUMNS';