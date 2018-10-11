import * as App from './app.json'
import * as LocalConfig from './app.local.json'
import * as StagingConfig from './app.staging.json'
import * as ProductionConfig from './app.production.json'

let loadConfig = function () {
  let logColor = 'green'
  if (App.env === 'production') {
    Config = ProductionConfig
    logColor = 'red'
  } else if (App.env === 'staging') {
    Config = StagingConfig
    logColor = 'orange'
  } else {
    Config = LocalConfig
  }
  console.log('%c Env: ' + Config.env, 'background: ' + logColor + '; color: white; display: block;')
}

loadConfig()

export const LOCAL_CONFIG = {
  ENV: Config.env,
  SERVER_URL: Config.serverUrl,
  API_URL: Config.apiUrl,
  ALGOLIA_APP_ID: Config.algolia.appId,
  ALGOLIA_API_KEY: Config.algolia.apiKey,
  APP_FAQ: `${Config.serverUrl}.freshdesk.com/support/home`,
  APP_PRIVACY_POLICY: `${Config.serverUrl}/platform/privacy-policy`,
  APP_TERMS_SERVICE: `${Config.serverUrl}/platform/terms-of-use`,
  APP_CONTACT: `${Config.serverUrl}/platform/contact`,
  MIXPANEL: {
    GOOGLE_SENDER_ID: Config.mixpanel.googleSenderId,
    PROJECT_TOKEN: Config.mixpanel.projectToken,
  }
}
