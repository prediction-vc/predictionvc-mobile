import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$primaryColor',
  },

  logoContainer: {
    height: 180,
  },

  scrollContent: {
    flex: 1,
    marginHorizontal: 30,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  activeButtonText: {
    color: '$primaryColor',
    fontSize: '$textSize'
  },

  buttonText: {
    color: 'white',
    fontSize: '$textSize'
  },

  activeButton: {
    backgroundColor: 'white',
    flex: 1
  },

  inactiveButton: {
    backgroundColor: 'transparent',
    flex: 1
  },

  forgotPasswordButton: {
    marginTop: 20,
    color: 'white',
    fontSize: '$textSize'
  },

  bottomContainer: {
    paddingHorizontal: 30,
    paddingTop: 10,
    height: 70,
  },

  termsCondition: {
    textAlign: 'center',
    color: 'white',
    fontSize: '$textSizeSmall',
  }
});