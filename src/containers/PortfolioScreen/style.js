import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const screenWidth = Dimensions.get('window').width;
const modalWidth = Math.min(screenWidth * 0.9, 345);

export const modalStyle = EStyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    width: modalWidth,
    padding: 15,
    borderRadius: 4,
    backgroundColor: 'white',
    position: 'relative',
  },
  fillContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },

  priceContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  modalTimeButtonBar: {
    height: 50,
  },

  modalNextButton: {
    paddingLeft: 15,
  },

  modalCommonTimeButtonTitle: {
    color: '$primaryTextColor',
    fontSize: '$textSizeSmall',
    paddingHorizontal: 5
  },

  modalActiveTimeButtonTitle: {
    color: 'white',
    fontSize: '$textSizeSmall',
    paddingHorizontal: 5
  },

  modalCommonTimeButton: {
    // width: (modalWidth - 30/*padding*/ - 76/*All time button width*/ - 27/*Next button width*/ ) / 3,
    width: 76,
    height: 22,
  },

  modalTimeButtonActive: {
    borderRadius: 11,
    backgroundColor: '$primaryColor',
    height: 22,
  },

  modalGraphContainer: {
    height: 120,
    position: 'relative',
  },

  modalGraphContent: {
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
  },
  modalPredictGraphContent: {
    position:'absolute',
    top: 0,
    bottom: 0,
    width: 30,
    right: 0,
  },

  modalGraphYAxis: {
    position:'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 30,
  },

  bottomContainer: {
    height: 80,
    justifyContent: 'space-between',
  },

  bottomPriceText: {
    fontWeight: 'bold',
    color: '$primaryTextColor',
    flex: 1,
    lineHeight: 34,
    fontSize: 14,
    paddingHorizontal: 10,
  },

  bottomPriceDesc: {
    fontWeight: 'bold',
    color: 'rgba(82, 82, 102, 0.5)',
    lineHeight: 34,
    fontSize: 14,
  },

  detailButtonStyle: {
    borderColor: '$primaryTextColor',
    borderWidth: 1,
    width: 90,
  },

  detailButtonTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '$primaryTextColor'
  }

});

export const styles = EStyleSheet.create({

  headText: {
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '$textSizeMedium',
    paddingTop: 10,
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
    paddingHorizontal: 10,
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
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
    height: 84,
    paddingHorizontal: 10,
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
  addButton: {
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  addButtonTitle: {
    color: '$primaryColor',
    fontSize: 15,
  },
  exchangeButton: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  exchangeButtonTitle: {
    color: '$primaryColor',
    fontSize: 10,
    width: 50,
    textAlign: 'center'
  },

  // Styles for Wallet
  walletWrapper: {
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  textWallet: {
    paddingVertical: 10,
    fontSize: 10,
    lineHeight: 15,
    color: '$primaryTextColor',
    textAlign: 'center'
  },
  buttonDeleteWallet: {
    width: 12,
    height: 15
  }
});