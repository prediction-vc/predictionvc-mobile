import * as App from './app.json';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export const APP_ID = DeviceInfo.getBundleId();
export const APP_VERSION = App.version;
export const APP_NAME = App.displayName;
export const API_URL = `${App.server_url}/api`;
export const ALGOLIA_APP_ID = '1BR267WPJC';
export const ALGOLIA_API_KEY = '2e8732a18aa6eabe08ad40e6e28a8706';
export const APP_FAQ = `${App.server_url}.freshdesk.com/support/home`;
export const APP_PRIVACY_POLICY = `${App.server_url}/platform/privacy-policy`;
export const APP_TERMS_SERVICE = `${App.server_url}/platform/terms-of-use`;
export const APP_CONTACT = `${App.server_url}/platform/contact`;
export const MIXPANEL = {
  GOOGLE_SENDER_ID: '1023812219271',
  PROJECT_TOKEN: '873fa4dd540c036fc53d3b434f457b3b',
  PUSH_REGISTRATION_ID: 'AAAA7l_2sYc:APA91bFfN03lc6dJ40X4d2IDYl--nyiTNsb9awKTfD8KaJrgjZRp4XUoc7ctBWaJICB7lj3XWNd-9ukXy_sQvuRAH-tL9u-dO7sl4NzabQYVf-dV9LLfAKaUEAULZRfb83OME0DX7cuK',
}

export const APP_STORE_LINK = Platform.OS === 'ios' ?
  'itms-apps://itunes.apple.com/au/app/${app_name}/${appid}?mt=8'
  :
  'market://details?id={package_name}';

export const LOCAL_CONFIG = {
  ENV: App.env,
  SERVER_URL: App.server_url,
  APP_STORE_LINK,
  API_URL,
  ALGOLIA_APP_ID,
  ALGOLIA_API_KEY,
  APP_FAQ,
  APP_PRIVACY_POLICY,
  APP_TERMS_SERVICE,
  APP_CONTACT,
  MIXPANEL
};