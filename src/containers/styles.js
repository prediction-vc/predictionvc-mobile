import { Platform } from 'react-native';
import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export const ScreenWidth = Dimensions.get('window').width;
// define extended styles
export const CommonStyle = EStyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    backgroundColor: 'white'
  },

  absoluteFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },

  textCenter: {
    textAlign: 'center',
  },

  flexRow: {
    flexDirection: 'row'
  },

  flexCol: {
    flexDirection: 'column'
  },

  textGoodColor: {
    color: '$primaryColor',
  },

  textBadColor: {
    color: '$alertColor',
  },

  flexOne: {
    flex: 1,
  },

  flexOneAndHalf: {
    flex: 1.5
  },

  flexTwo: {
    flex: 2,
  },

  flexThree: {
    flex: 3,
  },

  fontBold: {
    fontWeight: 'bold'
  },

  shadow: {
    ...Platform.select({
      android: {
        elevation: 2
      },
      ios: {
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 5,
        shadowOpacity: 0.5
      }
    })
  }

});