import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  buttonBarContainer: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buyButton: {
    flex: 1,
    margin: 5,
    height: 32,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: '$primaryColor',
    backgroundColor: 'rgba(33, 206, 153, 0.4)',
  },
  buyButtonTitle: {
    fontSize: '$textSize',
    color: 'white',
  },
  commonBarButton: {
    flex: 1,
    margin: 5,
    height: 32,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: 'rgba(82, 82, 102, 0.5)',
    backgroundColor: 'white',
  },
  commonBarButtonTitle: {
    fontSize: '$textSize',
    color: 'rgba(82, 82, 102, 0.5)',
  },

  existTokenContainer: {
    height:32,
    backgroundColor: '#EFEFF4',
    justifyContent: 'center',
    paddingHorizontal: 15,
    marginTop: 16,
  },
  existTokenText: {
    color: '$primaryTextColor',
    fontSize: 13,
  },

  infoContainer: {
    paddingHorizontal: 16,
    height: 44,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C8C7CC',
  },

  headText: {
    fontSize: '$textSize',
    color: 'rgba(82, 82, 102, 0.5)',
  },
  nameText: {
    color: '#7C8381',
  },
  contentText: {
    textAlign: 'right',
    flex: 1,
    fontSize: '$textSize',
    color: '$primaryTextColor',
  },
  quantityInput: {
    flex: 1,
    color: '$primaryTextColor',
    fontSize: '$textSize',
    textAlign: 'right'
  },

  saveButtonContainer: {
    height: 100,
    alignItems: 'center'
  },

  saveButton: {
    width: 205,
    backgroundColor: '$primaryColor',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowRadius: 4,
    shadowOpacity: 0.1
  },

  saveButtonText: {
    color: 'white',
    fontSize: '$textSize',
  },

});