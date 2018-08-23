import EStyleSheet from 'react-native-extended-stylesheet';
import { Constants } from '../../utils/constants';

export const styles = EStyleSheet.create({
  headerInformation: {
    paddingHorizontal: 20,
  },
  coinImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  coinTitle: {
    marginLeft: 10,
    fontSize: 30,
  },
  coinPrice: {
    fontSize: 30,
    color: '$primaryColor',
  },
  addButtonWrapper: {
    paddingTop: 20,
    alignItems: 'center'
  },
  buttonAdd: {
    width: 120,
    backgroundColor: '$primaryColor',
  },
  buttonAddTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white'
  },
  changeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
  },
  changeDescriptionWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  coinFall: {
    fontSize: 30,
    color: '$alertColor',
  },
  changeDescription: {
    paddingTop: 4,
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: 8,
  },

  scrollTabView: {
    marginTop: 20,
  },
  scrollTabBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    height: 45,
    borderBottomWidth: 0,
  },
  scrollTabBarUnderline: {
    height: 3,
    backgroundColor: '$primaryColor',
  },

});

export const graphScreenStyles = EStyleSheet.create({
  navigationContainer: {
    paddingTop: 20,
    paddingHorizontal: 15,
    height: Constants.navigationBarSize + 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },

  landscapeNavigationContainer: {
    paddingHorizontal: 15,
    height: 75,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  navigationCoinRise: {
    fontSize: 25,
    color: '$primaryColor',
  },
  navigationCoinFall: {
    fontSize: 25,
    color: '$alertColor',
  },

  navigationButton: {
    height: Constants.navigationBarSize,
  },

  navigationTitleImage: {
    width: 25,
    height: 25,
    borderRadius: 12.5,
  },
  navigationTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: '$primaryTextColor'
  },

  headerInformation: {
    paddingHorizontal: 40,
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },

  compareWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  graphContainer: {
    position: 'absolute',
    left: 10,
    right: 20,
    bottom: 20,
    top: 0,
  },
  activeGraphButton: {
    margin: 10,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Constants.primaryColor,
    width: 70,
    height: 25,
    backgroundColor: Constants.primaryColor
  },
  inactiveGraphButton: {
    margin: 10,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Constants.primaryColor,
    width: 70,
    height: 25,
    backgroundColor: 'white',
  },
  buttonTitleWhite: {
    fontSize: 10,
    color: 'white',
  },
  buttonTitleGreen: {
    fontSize: 10,
    color: Constants.primaryColor,
  },
  buttonTitleBlack: {
    fontSize: 10,
    color: Constants.primaryTextColor,
  },

  graphPeriodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  graphPeriodWrapper: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
    marginHorizontal: 10
  },
  textPeriod: {
    fontSize: 10,
    color: Constants.primaryTextColor
  }
});