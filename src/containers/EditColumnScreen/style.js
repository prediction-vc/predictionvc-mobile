import EStyleSheet from 'react-native-extended-stylesheet';

export const styles = EStyleSheet.create({

  currencyCell: {
    height: 52,
    marginHorizontal: 20,
    borderBottomColor: '$borderLightColor',
    borderBottomWidth: 0.5,
  },

  columnIcon: {
    width: 18,
    height: 18,
    borderRadius: 9,
  },

  inactiveColumnIcon: {
    borderColor: '#c7c7cc',
    borderWidth: 0.5,
    marginRight: 20,
  },

  activeColumnIcon: {
    backgroundColor: '$primaryColor',
    marginRight: 20,
  },

  columnCheckIcon: {
    width: 20,
    height: 20,
  },

  inActiveColumnText: {
    flex: 1,
    color: '$primaryTextColor',
    opacity: 0.5,
  },

  activeColumnText: {
    flex: 1,
    color: '$primaryColor',
  }
});