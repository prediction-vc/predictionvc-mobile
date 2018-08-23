import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  userContainer: {
    position: 'relative',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginBottom: 5
  },
  userContent: {
    paddingLeft: 10
  },
  textLeaderboard: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 10,
    paddingVertical: 15,
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
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  userName: {
    color: 'rgba(0, 0, 0, 0.7)',
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
  rankContainer: {
    position: 'relative',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 22,
  },
  activeRankImage: {
    opacity: 1.0,
  },
  inactiveRankImage: {
    opacity: 0.2
  },
  activeRankText: {
    paddingTop: 8,
    color: '$primaryColor',
    fontSize: 8,
  },
  inactiveRankText: {
    paddingTop: 8,
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: 8,
  },
  rankBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 3,
    bottom: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  rankActiveBar: {
    position: 'absolute',
    bottom: 6,
    height: 3,
    left: 0,
    backgroundColor: '$primaryColor'
  },
  iconTriangle: {
    position: 'absolute',
    bottom: 1,
  },

  totalPointContainer: {
    padding: 20,
    flexDirection: 'row',
  },
  textTotalPoint: {
    color: 'rgba(0, 0, 0, 0.6)',
    fontSize: 20,
    flex: 1,
  },
  textTotalPointValue: {
    color: '$primaryColor',
    fontSize: 30,
  },
  earnMoreContainer: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  textEarnMore: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)'
  }
});