import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles
const screenWidth = Dimensions.get('window').width;

export const styles = EStyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 100,
    bottom: 100,
    left: 0,
    right: 0,
  }
});

export const modalStyles = EStyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    flex: 1,
  },
  modalContent: {
    backgroundColor: 'white',
    flex: 1,
  },
  // Graph part - styles
  graphContainer: {
    height: 160,
  },

  graphChangeContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },

  graphChangeDescription: {
    width: '100%',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: 8,
    textAlign: 'right',
    paddingHorizontal: 20
  },

  graphChangeValue: {
    fontSize: 30,
    textAlign: 'right',
    paddingHorizontal: 10,
    flex: 1,
  },

  graphChangeIcon: {
    marginRight: 15
  },

  graphTimeButtonBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
  },

  graphAllTimeButtonTitle: {
    color: '$primaryTextColor',
    fontSize: '$textSizeSmall',
    paddingHorizontal: 20,
  },

  graphNextButton: {
    paddingHorizontal: 15,
  },

  graphCommonTimeButtonTitle: {
    color: '$primaryTextColor',
    fontSize: '$textSizeSmall',
  },

  graphCommonTimeButton: {
    width: (screenWidth - 116 - 42) / 3,
    height: 40,
  },

  timeButtonActiveBorder: {
    borderBottomWidth: 2,
    borderBottomColor: '$primaryColor'
  },

  // Portfolio part - styles
  portfolioContainer: {
    flex: 1,
    marginTop: 15,
  },

  headPrice: {
    textAlign: 'center',
    color: '$primaryTextColor',
    fontSize: 40
  },

  currencyTitle: {
    fontSize: 20,
    color: '$primaryTextColor',
    flex: 1,
  },

  borderBottom: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C8C7CC',
  },

  currencyHeading: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  headingLabelContainer: {
    height: 50,
  },
  headingLabel: {
    color: '#A8A8B2',
    fontSize: 8,
    textAlign: 'center',
    padding: 5,
  },

  currencyCell: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#C8C7CC',
    height: 84,
    paddingHorizontal: 15,
  },
  currencyImage: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
  },
  currencySymbol: {
    lineHeight: 24,
    fontSize: '$textSizeMedium',
    color: '$primaryTextColor',
  },
  gainLossContainer: {
    borderRadius: 4,
    width: 80,
    height: 25,
  },
  goodBgColor: {
    backgroundColor: '$primaryColor',
  },
  badBgColor: {
    backgroundColor: '$alertColor',
  },
  textGainLoss: {
    color: 'white',
    fontSize: '$textSizeMedium',
  },
  textGainLossPercent: {
    fontSize: '$textSizeMedium',
    marginRight: 5
  },

  infoContainer: {
    padding: 20,
    position: 'relative',
    flexDirection: 'row'
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 50,
    height: 50,
  },
  imagePortfolio: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  portfolioName: {
    fontSize: 25,
    color: '$primaryTextColor',
  },
  portfolioPrice: {
    fontSize: 15,
    color: '$primaryColor',
  },

  transactionContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  quantityInput: {
    width: 105,
    height: 45,
    color: '$primaryTextColor',
    fontSize: 14,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
    paddingHorizontal: 10
  },

  buyButton: {
    width: 95,
    height: 45,
    backgroundColor: '$primaryColor',
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    fontSize: 11,
    color: 'white'
  },
  sellButton: {
    marginLeft: 30,
    width: 95,
    backgroundColor: 'white',
    borderColor: 'rgba(0, 0, 0, 0.15)',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sellButtonText: {
    fontSize: 11,
    color: '$primaryTextColor'
  },

  textTokenCount: {
    fontSize: 22,
    color: '$primaryColor',
  },
  blackDescription: {
    fontSize: 12,
    color: '$primaryTextColor',
    paddingBottom: 4,
  },
  grayDescription: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.4)',
    paddingBottom: 5,
  },
  textTotalPrice: {
    fontSize: 15,
    color: '$primaryColor',
  },
  textTotalDesc: {
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.4)',
  }
});