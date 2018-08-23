import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  newsItemContainer: {
    position: 'relative',
    padding: 15,
  },
  newsImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
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