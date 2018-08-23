import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native';
const ScreenWidth = Dimensions.get('window').width;
// define extended styles

export const styles = EStyleSheet.create({
  scrollContent: {
    width: ScreenWidth,
    backgroundColor: 'white'
  },
  selectionContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textHead: {
    fontSize: 17,
    color: '$primaryTextColor',
  },
  textSelectDescription: {
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 20,
    paddingBottom: 40,
    textAlign: 'center'
  },
  infoText: {
    paddingVertical: 15,
    fontSize: 12,
    color: '$primaryTextColor',
  },
  warnText: {
    fontSize: 12,
    color: '$alertColor',
    paddingBottom: 15,
  },
  connectionInput: {
    padding: 15,
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    marginVertical: 8,
  },
  btnSynchronize: {
    marginVertical: 20,
    backgroundColor: '$primaryColor',
    width: 150,
  },
  btnSynchronizeTitle: {
    color: 'white',
    fontSize: 14,
  },
  tokenGrid: {
    marginTop: 10,
    width: ScreenWidth - 40,
  },
  tokenHeadWrapper: {
    paddingVertical: 10,
    flexDirection: 'row',
  },
  tokenHead: {
    fontSize: 12,
    color: '$primaryTextColor',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tokenText: {
    fontSize: 10,
    color: '$primaryTextColor',
    textAlign: 'center',
  },
  tokenWrapper: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center'
  },
  tokenImage: {
    marginLeft: 10,
  }
});

export const pickerStyles = EStyleSheet.create({
  viewContainer: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)'
  },
  inputIOSContainer: {
    padding: 15,
  },
  modalViewMiddle: {
    justifyContent: 'flex-end'
  },
  placeholderColor: {
    color: 'rgba(0, 0, 0, 0.5)'
  },
  inputIOS: {
    color: '$primaryTextColor'
  }
});