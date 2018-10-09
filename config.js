import Config from 'react-native-config'

export const APP_FAQ = `${Config.SERVER_URL}.freshdesk.com/support/home`
export const APP_PRIVACY_POLICY = `${Config.SERVER_URL}/platform/privacy-policy`
export const APP_TERMS_SERVICE = `${Config.SERVER_URL}/platform/terms-of-use`
export const APP_CONTACT = `${Config.SERVER_URL}/platform/contact`
export const MIXPANEL = {
  GOOGLE_SENDER_ID: Config.MIXPANEL_GOOGLE_SENDER_ID,
  PROJECT_TOKEN: Config.MIXPANEL_PROJECT_TOKEN,
}
console.log('%c Env: ' + Config.ENV, 'background: green; color: white; display: block;');

export const LOCAL_CONFIG = {
  ENV: Config.ENV,
  SERVER_URL: Config.SERVER_URL,
  API_URL: Config.API_URL,
  ALGOLIA_APP_ID: Config.ALGOLIA_APP_ID,
  ALGOLIA_API_KEY: Config.ALGOLIA_API_KEY,
  APP_FAQ,
  APP_PRIVACY_POLICY,
  APP_TERMS_SERVICE,
  APP_CONTACT,
  MIXPANEL
}
