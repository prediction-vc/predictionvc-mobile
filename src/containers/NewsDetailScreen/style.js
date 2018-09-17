import EStyleSheet from 'react-native-extended-stylesheet'
// define extended styles

export const styles = EStyleSheet.create({
  newsImage: {
    alignSelf: 'center',
    height: 150,
    width: 150,
  },
  newsTitle: {
    color: '$primaryTextColor',
    fontSize: '$textSize',
    fontWeight: 'bold'
  },
  newsDot: {
    marginHorizontal: 10,
    width: 2,
    height: 2,
    backgroundColor: '$primaryTextColor',
    opacity: 0.5
  },
  timeAgo: {
    color: 'grey',
    textAlignVertical: 'center',
    marginRight: 12
  },
  marginTop: {
    marginTop: 12
  },
  tag: {
    backgroundColor: '#1abc9c',
    color: 'white',
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginLeft: 5,
    paddingLeft: 5,
    paddingRight: 5
  }
})