import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  userContainer: {
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userRank: {
    fontSize: 20,
    color: '$primaryColor',
    alignItems: 'center',
    width: 55,
    paddingRight: 15,
    paddingVertical: 5,
    textAlign: 'center'
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  borderBottomView: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 0.5,
    backgroundColor: '#C8C7CC',
  },
  newsContent: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  userName: {
    color: '$primaryColor',
    fontSize: 14,
  },
  userPosition: {
    paddingTop: 2,
    color: '$primaryTextColor',
    fontSize: 10,
  },
  userScore: {
    marginRight: 15,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: '$primaryColor',
    color: '$primaryColor',
    paddingVertical: 4,
    width: 56,
    textAlign: 'center',
    fontSize: 11,
  },
  scrollTabBar: {
    height: 45,
    borderBottomWidth: 0,
  },
  scrollTabBarUnderline: {
    height: 5,
    backgroundColor: '$primaryColor',
  },
  daysContainer: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  activeDayButton: {
    width: 130,
    borderWidth: 0.5,
    borderColor: '$primaryColor',
  },
  inactiveDayButton: {
    width: 130,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.3)',
  },
  activeDayButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '$primaryTextColor',
  },
  inactiveDayButtonText: {
    fontSize: 12,
    color: '$primaryTextColor',
  }
});