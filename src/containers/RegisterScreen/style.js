import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({

  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '$primaryColor',
  },

  navigationBar: {
    height: 50,
    marginHorizontal: 10,
    position: 'relative',
    justifyContent: 'center',
  },

  navigationTitle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 44,
    right: 44,
    textAlign: 'center',
    lineHeight: 50,
    fontSize: '$textNavigationTitle',
    color: 'white',
  },

  navigationLeftButton: {
    width: 40,
    height: 40,
  },

  scrollContent: {
    flex: 1,
    marginHorizontal: 30,
  },

  activeButtonText: {
    color: '$primaryColor',
    fontSize: '$textSize'
  },

  activeButton: {
    backgroundColor: 'white',
    width: '70%',
  },

  forgotPasswordButton: {
    marginTop: 20,
    color: 'white',
    fontSize: '$textSize'
  },

  bottomContainer: {
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 50,
    height: '$buttonHeight',
  },
});