const defaultValues = () => ({
  user: {
    portfolioItems: [],
  },
  project: {
    tokenInformation: [],
    news: [],
    opinions: null,
  },
  graphTimePeriods: [
    'ALL TIME', '24H', 'WEEK', 'MONTH', 'QUARTER', 'YEAR', '+WEEK', '+2 WEEKS'
  ],
  currencyColumns: [
    {id: 0, name: 'Coin Price (US$)',     displayName: 'Coin\nPrice (US$)'},
    {id: 1, name: 'Holding Amount (US$)', displayName: 'Holding\nAmount (US$)'},
    {id: 2, name: 'Holding %',            displayName: 'Holdings'},
    {id: 3, name: 'Holding units',        displayName: 'Holding\nunits'},
    {id: 4, name: 'Net gain/loss (US$)',  displayName: 'Net\ngain/loss (US$)'},
    {id: 5, name: 'Net gain/loss (%)',    displayName: 'Net\ngain/loss (%)'},
    {id: 6, name: 'Future gain/loss',     displayName: 'Future\ngain/loss'},
    {id: 7, name: 'Future gain/loss (%)', displayName: 'Future\ngain/loss (%)'},
    {id: 8, name: 'Trend Line',           displayName: 'Trend'},
  ],
  selectedCurrencyColumns: [
    {id: 0, name: 'Coin Price (US$)',     displayName: 'Coin\nPrice (US$)'},
    {id: 6, name: 'Future gain/loss',     displayName: 'Future\ngain/loss'},
    {id: 8, name: 'Trend Line',           displayName: 'Trend'},
  ],
  allRanks: [
    { name: 'Newbie', image: require('../assets/images/icon-rewards-newbie.png') },
    { name: 'Explorer', image: require('../assets/images/icon-rewards-explorer.png') },
    { name: 'Junior', image: require('../assets/images/icon-rewards-junior.png') },
    { name: 'Knight of Data', image: require('../assets/images/icon-rewards-knight.png') },
    { name: 'Senior', image: require('../assets/images/icon-rewards-senior.png') },
    { name: 'Hodler', image: require('../assets/images/icon-rewards-hodler.png') },
    { name: 'Mentor', image: require('../assets/images/icon-rewards-mentor.png') },
  ],
  exchangeConnections: [
    {
      id: 1,
      value: 1,
      name: 'Bittrex',
      label: 'Bittrex',
      apiKey: true,
      apiSecret: true,
      passphrase: false,
      help: 'https://predictionvc.freshdesk.com/support/solutions/articles/35000082640-how-do-i-connect-my-bittrex-account-to-predictionvc-s-portfolio-',
      uid: false,
      web: 'http://bittrex.com/',
      image: 'https://www.trackico.io/media/img/exchange/bittrex/bittrex-logo.jpg'
    },
    {
      id: 2,
      value: 2,
      name: 'Binance',
      label: 'Binance',
      apiKey: true,
      apiSecret: true,
      passphrase: false,
      help: 'https://predictionvc.freshdesk.com/support/solutions/articles/35000082637-how-do-i-connect-my-binance-account-to-predictionvc-s-portfolio-',
      web: 'https://binance.com',
      uid: false,
      image: 'https://miro.medium.com/fit/c/240/240/1*Q_kiasWmguU0uvd2RJsINg.png'
    },
    {
      id: 3,
      value: 3,
      name: 'Bitstamp',
      label: 'Bitstamp',
      apiKey: true,
      apiSecret: true,
      help: 'https://predictionvc.freshdesk.com/support/solutions/articles/35000082641-how-do-i-connect-my-bitstamp-account-to-predictionvc-s-portfolio-',
      web: 'https://www.bitstamp.com/',
      passphrase: false,
      uid: true,
      image: 'https://pbs.twimg.com/profile_images/866625488059600896/cuNpnAQe_400x400.jpg'
    },
    {
      id: 4,
      value: 4,
      name: 'Coinbase Pro',
      label: 'Coinbase Pro',
      apiKey: true,
      apiSecret: true,
      help: 'https://predictionvc.freshdesk.com/support/solutions/articles/35000082643-how-do-i-connect-my-coinbase-pro-account-to-predictionvc-s-portfolio-',
      web: 'https://gdax.com/',
      passphrase: true,
      uid: false,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKen6bYu4ZCGseqKSe7Jg8itpkrKLc2LCVe0TtbtzE9GB8Fqo3'
    },
    {
      id: 5,
      value: 5,
      name: 'Bitfinex',
      label: 'Bitfinex',
      apiKey: true,
      apiSecret: true,
      help: 'https://bitfinex.com',
      web: 'https://bitfinex.com/',
      passphrase: false,
      uid: false,
      image: 'https://www.bitfinex.com/assets/bfx-stacked.png'
    },
  ],
});

export default defaultValues();