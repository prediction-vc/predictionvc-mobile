import EStyleSheet from 'react-native-extended-stylesheet';
// define extended styles

export const styles = EStyleSheet.create({
  notificationItemContainer: {
    position: 'relative',
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
  },
  notificationImage: {
    marginTop: 5,
    width: 17,
    height: 20,
  },
  notificationContent: {
    paddingLeft: 10,
    justifyContent: 'flex-start'
  },
  newsSourceTitle: {
    color: '$primaryColor',
    fontSize: 14,
    paddingLeft: 10
  },
  notificationTime: {
    paddingTop: 4,
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 10,
  },
});