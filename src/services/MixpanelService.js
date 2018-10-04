import { LOCAL_CONFIG } from '../../config'

const Mixpanel = require('react-native-mixpanel')

export const MixpanelService = {
  init: async function (userId) {
    let mixpanelInstance = Mixpanel.default
    try {
      await mixpanelInstance.sharedInstanceWithToken(LOCAL_CONFIG.MIXPANEL.PROJECT_TOKEN)
      await mixpanelInstance.identify(userId)
      await mixpanelInstance.initPushHandling(LOCAL_CONFIG.MIXPANEL.GOOGLE_SENDER_ID)
      await mixpanelInstance.setPushRegistrationId(LOCAL_CONFIG.MIXPANEL.PUSH_REGISTRATION_ID)
    } catch (e) {
      console.log('MixPanel error', e)
    }

  }
}