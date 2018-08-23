import EStyleSheet from 'react-native-extended-stylesheet';

// define extended styles
export const styles = EStyleSheet.create({

  /* Tutorial Styles*/
  description: {
    fontSize: '$textSize',
    color: '$primaryTextColor',
    opacity: 0.7,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  tutorialContainer1: {
    flex: 4,
    paddingVertical: 40,
    position: 'relative'
  },

  startButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 142,
    alignItems: 'center'
  },

  startButton: {
    width: 205,
    height: 48,
    borderRadius: 24,
    backgroundColor: '$primaryColor',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1
  },

  startButtonText: {
    color: 'white',
    fontSize: '$textSize',
  },

  startButtonIcon: {
    marginLeft: 10,
    width: 14,
    height: 9,
  },

  tutorialContainer2: {
    flex: 3,
    paddingVertical: 40,
  },

  tutorialTitle: {
    fontSize: '$titleSize',
    color: '$primaryColor',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  /* Swiper Styles*/
  swiperDot: {
    backgroundColor:'$secondaryColor',
    opacity: 0.3,
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 30,
  },
  activeDot: {
    backgroundColor:'$primaryColor',
    opacity: 1,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 30,
  },

  /* Bottom Button Styles */
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 30,
    right: 30,
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    color: 'rgba(139, 139, 156, 0.7)',
    fontSize: '$textSize'
  },
  nextButton: {
    color: '$primaryColor',
    opacity: 1.0,
    fontSize: '$textSize'
  }
});