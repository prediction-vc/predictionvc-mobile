import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  newsItemContainer: {
    position: 'relative',
    padding: 15,
    height: 73
  },
  newsImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  borderBottomView: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 0,
    height: 0.5,
    backgroundColor: '#C8C7CC',
  },
  newsContent: {
    paddingLeft: 10,
    justifyContent: 'center'
  },
  newsTitle: {
    color: '$primaryTextColor',
    fontSize: '$textSize',
  },
  newsDescriptionContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  newsDescription: {
    color: '$primaryTextColor',
    fontSize: '$textSizeMedium',
    opacity: 0.5
  },
  newsDot: {
    marginHorizontal: 10,
    width: 2,
    height: 2,
    backgroundColor: '$primaryTextColor',
    opacity: 0.5
  }
});