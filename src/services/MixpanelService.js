import { LOCAL_CONFIG } from '../../config'
import {Platform, PushNotificationIOS} from 'react-native'
const Mixpanel = require('react-native-mixpanel')

export const MixpanelService = {
  init: async function (userId, email) {
    let mixpanelInstance = Mixpanel.default
    try {
      await mixpanelInstance.sharedInstanceWithToken(LOCAL_CONFIG.MIXPANEL.PROJECT_TOKEN)
      await mixpanelInstance.identify(userId)
      await mixpanelInstance.set({"$email": email});
      await this.setPushNotificationToken(mixpanelInstance)
      await mixpanelInstance.track("Mobile app started")
    } catch (e) {
      console.log('MixPanel error', e)
    }
  },
  setPushNotificationToken: async function (mixpanelInstance) {
    if (Platform.OS === 'android') {
      await mixpanelInstance.initPushHandling(LOCAL_CONFIG.MIXPANEL.GOOGLE_SENDER_ID)
    }
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions().then(function (response) {
        PushNotificationIOS.addEventListener('register', function (token) {
          mixpanelInstance.addPushDeviceToken(token)
        })
      })
    }
  },
}
