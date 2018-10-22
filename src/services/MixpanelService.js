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
      await mixpanelInstance.track(this.EVENTS.MIXPANEL_INIT)
    } catch (e) {
      console.log('MixPanel error', e)
    }
  },
  setPushNotificationToken: async function (mixpanelInstance) {
    if (Platform.OS === 'android') {
      await mixpanelInstance.initPushHandling(LOCAL_CONFIG.MIXPANEL.GOOGLE_SENDER_ID)
      await mixpanelInstance.track(MixpanelService.EVENTS.PUSH_TOKEN_SET_ANDROID)
    }
    if (Platform.OS === 'ios') {
      PushNotificationIOS.requestPermissions().then(function (response) {
        mixpanelInstance.track(MixpanelService.EVENTS.ASKED_PUSH_NOTIFICATION)
        PushNotificationIOS.addEventListener('register', function (token) {
          mixpanelInstance.addPushDeviceToken(token)
          mixpanelInstance.track(MixpanelService.EVENTS.PUSH_TOKEN_SET_IOS + token)
        })
      })
    }
  },
  track: async function (event) {
    try {
      Mixpanel.default.track(event);
    } catch (e) {
      console.log('MixPanel error', e)
    }
  },
  EVENTS: {
    'MIXPANEL_INIT': 'Mobile app: mixpanel initialized',
    'LOGGED_IN': 'Mobile app: user logged in',
    'LOGGED_OUT': 'Mobile app: user logged out',
    'ASKED_PUSH_NOTIFICATION': 'Mobile app: Asked user for push notification',
    'PUSH_TOKEN_SET_IOS': 'Mobile app: Push token set ios ',
    'PUSH_TOKEN_SET_ANDROID': 'Mobile app: Push token set android'
  }
}
