import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({

  settingCell: {
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  separator: {
    marginHorizontal: 40,
    marginVertical: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    height: 1,
  },

  columnIconContainer: {
    width: 35,
    height: 35,
  },

  columnText: {
    flex: 1,
    color: 'rgba(23, 23, 23, 0.5)',
    paddingHorizontal: 20,
  },

  logoutContainer: {
    height: 100,
    alignItems: 'center'
  },

  logoutButton: {
    width: 205,
    backgroundColor: '#867D7D',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1
  },

  logoutButtonText: {
    color: 'white',
    fontSize: '$textSize',
  },
  mainCell: {
    fontSize: 12,
    color: '$primaryTextColor',
  },
  subCell: {
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  badge: {
    width: 25,
    height: 25,
    marginTop: -5,
    marginLeft: 10,
    borderRadius: 12.5,
    backgroundColor: '$primaryColor',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeText: {
    fontSize: 12,
    color: 'white'
  }
});