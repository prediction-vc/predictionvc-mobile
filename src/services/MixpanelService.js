import { LOCAL_CONFIG } from '../../config'

const Mixpanel = require('react-native-mixpanel')

export const MixpanelService = {
  init: async function (userId, email) {
    let mixpanelInstance = Mixpanel.default
    try {
      await mixpanelInstance.sharedInstanceWithToken(LOCAL_CONFIG.MIXPANEL.PROJECT_TOKEN)
      await mixpanelInstance.identify(userId)
      await mixpanelInstance.set({"$email": email});
      await mixpanelInstance.initPushHandling(LOCAL_CONFIG.MIXPANEL.GOOGLE_SENDER_ID)
      await mixpanelInstance.track("Mobile app started")
    } catch (e) {
      console.log('MixPanel error', e)
    }

  }
}
