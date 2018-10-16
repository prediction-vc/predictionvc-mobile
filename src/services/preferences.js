import { AsyncStorage } from 'react-native';
import { Base64 } from 'js-base64';

const STORAGE_KEY_ENCRYPTED = 'preferences';

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

class Preference {
  preferences: undefined;

  async init() {
    try {
      this.preferences = await loadRawPreferences();
      if (!this.preferences) {
        await saveRawPreferences({'testing':'yup'})
      }
    } catch (e) {
      console.log('Preferences.init error', e)
    }
  };

  async getAll() {
    return this.preferences;
  };

  async getItem(key) {
    try {
      if (!this.preferences){
        await this.init();
      }
      return this.preferences[key];
    } catch (e) {
      return {}
    }

  };

  async setItem(key, value) {
    if (!this.preferences){
      await this.init();
    }
    this.preferences[key] = value;
    await saveRawPreferences(this.preferences)
  };

  async removeItem(key) {
    if (!this.preferences){
      await this.init();
    }
    delete this.preferences[key];
    await saveRawPreferences(this.preferences)
  };

  async removeMultiItem(keys) {
    if (!this.preferences){
      await this.init();
    }
    keys.map(key => delete this.preferences[key]);
    await saveRawPreferences(this.preferences)
  };

  async parseJsonItem(key) {
    const json = await this.getItem(key);
    if (json) {
      return JSON.parse(json);
    }
    return null;
  };

  async saveItemAsJson(key, value) {
    if (value) {
      return this.setItem(key, JSON.stringify(value));
    }
    return this.removeItem(key);
  };

  async clear() {
    await AsyncStorage.clear();
  }

}

export const Preferences = new Preference();

export const JWT_TOKEN = 'jwt';
export const USER_PROFILE_INFO  = 'USER_PROFILE_INFO';
export const PROJECT_TOKEN_INFO = 'PROJECT_TOKEN_INFO';
export const USER_TOKEN_NEWS    = 'USER_TOKEN_NEWS';
export const COMPLETE_TUTORIAL  = 'COMPLETE_TUTORIAL';
export const DISPLAY_COLUMNS    = 'DISPLAY_COLUMNS';
