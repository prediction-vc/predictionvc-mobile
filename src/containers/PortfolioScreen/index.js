import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, StatusBar, ScrollView, ListView, TouchableOpacity, Platform, Alert } from 'react-native';
import { PortfolioModal } from './PortfolioModal';
import { styles } from './style';
import { CommonStyle, ScreenWidth } from '../styles';
import { Auth, Prediction, Preferences, DISPLAY_COLUMNS } from '../../services';
import { setUserProfile } from '../../actions/user';
import { setProjectTokenInfo, setDisplayColumns } from '../../actions/project';
import { Utils, Constants, MarketStatusPeriod } from '../../utils';
import { AreaChart, LineChart } from 'react-native-svg-charts';
import * as d3Shape from 'd3-shape';
import { TextButton, NavigationBar, ImageButton, Spinner, ImagePlaceholder } from '../../components';
import { TransactionModal } from '../SearchScreen/TransactionModal';
import _ from 'lodash';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class _PortfolioScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      selectedTimeButtonIndex: 0,
      selectedGraphChangeIndex: 0,
      graphData: [],
      portfolioItems: [],
      showCurrencyModal: false,
      currentProject: {},
      compareValue: 1,
      visibleTransactionModal: false,
      transactionProject: null,
    };

    this.scrollButtonBar = null;
  }

  componentDidMount() {
    if (Platform.OS === 'ios') {
      StatusBar.setBarStyle('dark-content', true);
    } else {
      StatusBar.setBarStyle('light-content', true);
    }

    this.getInformation().then();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.user !== nextProps.user) {
      console.log('Profile has been changed');
      this.getTokenInformation(nextProps.user).then();
    }
  }

  async getInformation() {
    try {
      const displayColumns = await Preferences.getItem(DISPLAY_COLUMNS);
      if (displayColumns)
        this.props.setDisplayColumns(displayColumns);
      const profile = await Auth.getProfile();
      this.props.setUserProfile(profile);
    } catch (error) {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    }
  }

  async getTokenInformation(profile) {
    const portfolioItems = this.processPortfolioItems(profile);
    let tokenInformation = [];
    if (portfolioItems.length > 0) {
      let projectTokens = portfolioItems.map((item) => {
        return item.token;
      });
      this.setState({loading: true});
      tokenInformation = await Prediction.getProjectTokenInformation({symbol: projectTokens.toString()});
      this.setState({loading: false});
    }
    this.props.setProjectTokenInfo(tokenInformation);
    this.processGraphData();
  }

  processPortfolioItems(profile = this.props.user) {
    const { wallets } = profile;
    let portfolioItems = [];
    profile.portfolioItems.map(item => {
      let portfolioItem = _.cloneDeep(item);
      portfolioItem.isWalletOnly = false;
      portfolioItem.wallets = [];
      wallets.map(wallet => {
        const { exchange, passphrase, privateKey, publicKey, uid } = wallet;
        wallet.portfolio.map(walletItem => {
          if (item.token === walletItem.currency
            && !portfolioItem.wallets.find(portfolioItemWallet => portfolioItemWallet.exchange === exchange))
          {
            portfolioItem.wallets.push({
              exchange,
              passphrase,
              privateKey,
              publicKey,
              uid,
              ...walletItem
            });
          }
        })
      });
      if ( !portfolioItems.find(item => item.token === portfolioItem.token )) {
        portfolioItems.push(portfolioItem);
      }
      return portfolioItem;
    });
    wallets.map(wallet => {
      const { exchange, passphrase, privateKey, publicKey, uid } = wallet;
      wallet.portfolio.map(walletItem => {
        portfolioItems.map (item => {
          if (item.token === walletItem.currency && item.isWalletOnly) {
            if (!item.wallets.find(portfolioItemWallet => portfolioItemWallet.exchange === exchange)) {
              item.wallets.push({
                exchange,
                passphrase,
                privateKey,
                publicKey,
                uid,
                ...walletItem
              });
              return item;
            }
          }
        });
        if (!portfolioItems.find(item => item.token === walletItem.currency)) {
          portfolioItems.push({isWalletOnly: true, quantity: 0, price: 0, token: walletItem.currency, wallets: [{
            exchange,
            passphrase,
            privateKey,
            publicKey,
            uid,
            ...walletItem
          }]});
        }
      })
    });
    this.setState({ portfolioItems });
    return portfolioItems;
  }

  processGraphData() {
    const { histograph } = this.props.user;
    const graphData = histograph.map( histogram => histogram.value );
    this.setState({ graphData, compareValue: graphData[0] });
  }

  getSevenDayPrediction(project) {
    let sevenDayPrediction = project.usdPrice;
    if (project.predictions) {
      sevenDayPrediction = project.predictions.sevenDay ? project.predictions.sevenDay.prediction : project.usdPrice;
    }

    return sevenDayPrediction;
  }

  getFourteenDayPrediction(project) {
    let fourteenDayPrediction = project.usdPrice;
    if (project.predictions) {
      fourteenDayPrediction = project.predictions.fourteenDay ? project.predictions.fourteenDay.prediction : project.usdPrice;
    }

    return fourteenDayPrediction;
  }
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onGraphTimeChanged = (index) => {
    console.log('GraphTimeChangeButton: index=', index);
    if (index >= 0 && index <= 5) {
      const { histograph } = this.props.user;
      const graphAll = histograph.map( histogram => histogram.value );
      let numberOfHistograph = graphAll.length;
      let compareValue = graphAll[0];
      switch (index) {
        case MarketStatusPeriod.YearMarket: {
          numberOfHistograph = 24 * 365;
          break;
        }
        case MarketStatusPeriod.QuarterMarket: {
          numberOfHistograph = 24 * 90;
          break;
        }
        case MarketStatusPeriod.MonthMarket: {
          numberOfHistograph = 24 * 30;
          break;
        }
        case MarketStatusPeriod.WeekMarket: {
          numberOfHistograph = 24 * 7;
          break;
        }
        case MarketStatusPeriod.DayMarket: {
          numberOfHistograph = 24;
          break;
        }
        default: {
          numberOfHistograph = graphAll.length;
          break;
        }
      }

      let graphData;
      if (graphAll.length >= numberOfHistograph) {
        graphData = graphAll.slice(graphAll.length - numberOfHistograph);
        compareValue = graphData[0];
      } else {
        const emptyArray = new Array(numberOfHistograph - graphAll.length).fill(0);
        graphData = emptyArray.concat(graphAll);
      }
      this.setState({selectedTimeButtonIndex: index, selectedGraphChangeIndex: index, graphData, compareValue});

    } else if (index === -1) {
      // Next button pressed.
      this.scrollButtonBar.scrollToEnd({animated: true});
    } else {
      this.setState({selectedTimeButtonIndex: index});
    }
  };

  onPressCurrencyCell = (currentProject) => {
    this.setState({showCurrencyModal: true, currentProject});
  };

  onCurrencyDetail = async () => {
    const { currentProject } = this.state;
    this.setState({showCurrencyModal: false, loading: true});
    const project = await Prediction.getProject(currentProject.name);
    this.setState({loading: false}, () => {
      this.props.navigation.navigate('PortfolioDetailScreen', {portfolio: project});
    });
  };

  onCurrencyDelete = async (project) => {
    const { portfolioItems } = this.state;

    this.onModalRequestClose();
    try {
      const item = portfolioItems.find(item => item.token === project.symbol);
      this.setState({loading: true});
      const { user } = await Prediction.updateTokenToPortfolio({
        side: 'sell',
        symbol: project.symbol,
        quantity: Utils.parseFloat(item.quantity)
      });
      if (user) this.props.setUserProfile(user)
    } catch (error) {
      console.log(error);
      Utils.showAlert('Error', JSON.stringify(error));
    }
  };

  onModalRequestClose = () => {
    this.setState({showCurrencyModal: false, currentProject: {}});
  };

  onPlusPressed = () => {
    this.props.navigation.navigate('SearchScreen', {lastNavigationName: 'PortfolioScreen'});
  };

  onExchange = () => {
    this.props.navigation.navigate('ExchangeScreen');
  };

  onRemoveExchange = async(portfolio) => {
    Alert.alert(
      'Stop Tracking',
      `Are you sure you want to stop tracking ${portfolio.exchange} ?`,
      [
        {text: 'Cancel', onPress: () => console.log('Alert OK Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => this.actionRemoveExchange(portfolio), style: 'ok'},
      ],
      { cancelable: true }
    );
  };

  actionRemoveExchange = async(portfolio) => {
    // MARK - todo
    console.log(`action - Remove exchange ${portfolio.exchange}`);
    this.setState({loading: true});
    try {
      await Prediction.removeExchangePortfolio({portfolio: portfolio.exchange});
      const profile = await Auth.getProfile();
      this.props.setUserProfile(profile);
    } catch (error) {
      console.log(error);
      Utils.showAlert('Error', JSON.stringify(error));
      this.setState({loading: false});
    }
  };

  onBuySell = async (currentProject) => {
    const { transactionProject } = this.state;
    if (transactionProject && transactionProject.name === currentProject.name) {
      this.setState({ visibleTransactionModal: true});
    } else {
      const project = await Prediction.getProject(currentProject.name);
      this.setState({ visibleTransactionModal: true, transactionProject: project });
    }
  };

  onCloseTransactionModal = () => {
    this.setState({ visibleTransactionModal: false });
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  getInventoryValue() {
    let total = 0;
    const { tokenInformation } = this.props;
    const { portfolioItems } = this.state;

    portfolioItems.map((item) => {
      const itemToken = tokenInformation.find(token => token.symbol === item.token);
      if (itemToken) {
        const readablePrice = itemToken.usdPrice ? itemToken.usdPrice : 0;
        total += item.quantity * readablePrice;
      }
    });

    return total;
  }

  getProjectTrendData(project) {
    if (Utils.isEmptyObject(project)) return;
    let graphData = [];
    switch (this.state.selectedTimeButtonIndex) {
      case MarketStatusPeriod.AllTime:
      case MarketStatusPeriod.YearMarket: {
        graphData = project.yearMarket.price;
        break;
      }
      case MarketStatusPeriod.QuarterMarket: {
        graphData = project.quarterMarket.price;
        break;
      }
      case MarketStatusPeriod.PredictOneWeek:
      case MarketStatusPeriod.PredictTwoWeeks:
      case MarketStatusPeriod.MonthMarket: {
        graphData = project.monthMarket.price;
        break;
      }
      case MarketStatusPeriod.WeekMarket: {
        graphData = project.weekMarket.price;
        break;
      }
      case MarketStatusPeriod.DayMarket: {
        graphData = project.dayMarket.price;
        break;
      }
    }

    return graphData;
  }
  // mark - Handle App data end////////////

  // mark - Render components start
  renderGraphView() {
    const { selectedTimeButtonIndex, selectedGraphChangeIndex, graphData, compareValue, loading } = this.state;
    const { user, graphTimePeriods } = this.props;
    const averageChange = loading ? 0 :(this.getInventoryValue() - compareValue) / compareValue * 100;
    let graphStatusIcon;
    if (user) {
      graphStatusIcon = averageChange >= 0 ?
        require('../../assets/images/icon-rise.png') :
        require('../../assets/images/icon-fall.png');
    }

    return <View style={[styles.graphContainer, CommonStyle.center]}>
      {graphData.length > 0 && <AreaChart
        style={{ width: ScreenWidth, height: 160 }}
        data={ graphData }
        contentInset={{ top: 30, bottom: 0 }}
        curve={ d3Shape.curveLinear }
        svg={{ fill: Constants.chartNormalBackground }}
      />}

      <View style={[styles.graphChangeContainer, CommonStyle.center]}>
        <View style={[CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={[averageChange >= 0 ? CommonStyle.textGoodColor : CommonStyle.textBadColor, styles.graphChangeValue]}>
            {Utils.toFixed(averageChange, 2)}%
          </Text>
          <Image style={styles.graphChangeIcon} source={graphStatusIcon}/>
        </View>
        <Text style={styles.graphChangeDescription}>{graphTimePeriods[selectedGraphChangeIndex]} Change</Text>
      </View>

      <View style={[styles.graphTimeButtonBar, CommonStyle.flexRow]}>
        <TextButton
          titleLabel={graphTimePeriods[0]}
          style={selectedTimeButtonIndex === 0 ? styles.timeButtonActiveBorder : {}}
          textStyle={[styles.graphAllTimeButtonTitle]}
          onPress={() => { this.onGraphTimeChanged(0) }}
        />

        <ScrollView
          ref={(ref) => {this.scrollButtonBar = ref}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            graphTimePeriods.map((timePeriod, index) => {
              if (index > 0) {
                return <TextButton
                  key={`time-button-${index}`}
                  titleLabel={timePeriod}
                  style={[styles.graphCommonTimeButton, selectedTimeButtonIndex === index ? styles.timeButtonActiveBorder : {}]}
                  textStyle={[styles.graphCommonTimeButtonTitle, ]}
                  onPress={() => { this.onGraphTimeChanged(index) }}
                />
              }
            })
          }
        </ScrollView>

        <ImageButton
          image={require('../../assets/images/icon-right-gray.png')}
          style={styles.graphNextButton}
          onPress={() => {this.onGraphTimeChanged(-1)}}
        />
      </View>
    </View>
  }

  renderViewByColumn(column, item, project) {
    const { selectedTimeButtonIndex } = this.state;
    const readablePrice = project.usdPrice ? project.usdPrice : 0;
    switch (column.id) {
      case 0: //'Coin Price (US$)',
        return <Text style={styles.currencySymbol}>
          {Utils.formatCurrency(readablePrice)}
        </Text>;
      case 1: //'Holding Amount (US$)',
        return <Text style={styles.currencySymbol}>
          {Utils.formatCurrency(readablePrice * item.quantity)}
        </Text>;
      case 2: //'Holding %',
        return <Text style={styles.currencySymbol}>
          {Utils.toFixed((readablePrice * item.quantity) / this.getInventoryValue() * 100, 0)}%
        </Text>;
      case 3: //'Holding units',
        return <Text style={styles.currencySymbol}>
          {item.quantity}
        </Text>;
      case 4: //'Net gain/loss (US$)',
      {
        const gainLoss = readablePrice * item.quantity - (item.price * item.quantity);
        return <View style={[styles.gainLossContainer, CommonStyle.center, gainLoss >= 0 ? styles.goodBgColor: styles.badBgColor]}>
          <Text style={styles.textGainLoss}>{Utils.formatCurrency(gainLoss)}</Text>
        </View>;
      }
      case 5: //'Net gain/loss (%)',
      {
        const gainLoss = readablePrice * item.quantity - (item.price * item.quantity);
        const gainLossPercent = gainLoss / (readablePrice * item.quantity) * 100;
        const graphStatusIcon = gainLossPercent >= 0 ?
          require('../../assets/images/icon-rise.png'):
          require('../../assets/images/icon-fall.png');
        return <View style={[styles.gainLossContainer, CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={[styles.textGainLossPercent, gainLossPercent >= 0 ? CommonStyle.textGoodColor : CommonStyle.textBadColor]}>
            {Utils.toFixed(gainLossPercent)}%
          </Text>
          <Image source={graphStatusIcon}/>
        </View>;
      }
      case 6: //'Future gain/loss',
      {
        const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
        const futureLoss = /*forecastPrice === 0 ? 0 : */readablePrice * item.quantity - (forecastPrice * item.quantity);
        return <View style={[styles.gainLossContainer, CommonStyle.center, futureLoss >= 0 ? styles.goodBgColor: styles.badBgColor]}>
          <Text style={styles.textGainLoss}>{Utils.formatCurrency(futureLoss)}</Text>
        </View>;
      }
      case 7: //'Future gain/loss (%)',
      {
        const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
        const futureLoss = readablePrice * item.quantity - (forecastPrice * item.quantity);
        const futureLossPercent = futureLoss / (readablePrice * item.quantity) * 100;
        const graphStatusIcon = futureLossPercent >= 0 ?
          require('../../assets/images/icon-rise.png'):
          require('../../assets/images/icon-fall.png');
        return <View style={[styles.gainLossContainer, CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={[styles.textGainLossPercent, futureLossPercent >= 0 ? CommonStyle.textGoodColor : CommonStyle.textBadColor]}>
            {Utils.toFixed(futureLossPercent)}%
          </Text>
          <Image source={graphStatusIcon}/>
        </View>;
      }
      case 8: //'Trend Line',
      {
        const priceData = this.getProjectTrendData(project);
        const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
        const growing = forecastPrice >= readablePrice;
        return <View style={CommonStyle.flexRow}>
          <AreaChart
            style={{
              position:'absolute',
              width: selectedTimeButtonIndex < MarketStatusPeriod.PredictOneWeek ? 52 : 40,
              height: 40,
              left: 0 }}
            data={ priceData }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMax={Math.max(...priceData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            gridMin={0}
            svg={{
              strokeWidth: 0,
              fill: Constants.chartBackground}}
          />
          <LineChart
            style={{
              width: selectedTimeButtonIndex < MarketStatusPeriod.PredictOneWeek ? 52 : 40,
              height: 40
            }}
            data={ priceData }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMax={Math.max(...priceData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            gridMin={0}
            svg={{
              stroke: Constants.primaryTextColor,
              strokeWidth: 2}}
          />
          { selectedTimeButtonIndex === MarketStatusPeriod.PredictOneWeek && <LineChart
            style={{width: 12, height: 40 }}
            data={ [priceData[priceData.length-1], this.getSevenDayPrediction(project)] }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMin={0}
            gridMax={Math.max(...priceData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            svg={{
              stroke: growing ? Constants.primaryColor : Constants.alertColor,
              strokeWidth: 2}}
          />}
          { selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks && <LineChart
            style={{width: 12, height: 40 }}
            data={ [priceData[priceData.length-1], this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project)] }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMin={0}
            gridMax={Math.max(...priceData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            svg={{
              stroke: growing ? Constants.primaryColor : Constants.alertColor,
              strokeWidth: 2}}
          />}
        </View>
      }
    }
    return <View/>
  }

  renderVirtualWallet(item) {
    const { tokenInformation } = this.props;
    const project = tokenInformation.find(project => item.token === project.symbol);
    if (!project) return;
    const { usdPrice, symbol, change } = project;
    const { quantity } = item;
    const readablePrice = usdPrice ? Utils.formatCurrency(usdPrice) : 'Unknown';
    return <View style={styles.walletWrapper} key={`wallet-cell-${symbol}-virtual-wallet`}>
      <View style={[CommonStyle.center, CommonStyle.flexRow, CommonStyle.flexOne]}>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>Virtual Wallet</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexThree]}>
          <Text style={styles.textWallet}>{`Price\n${readablePrice}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>{`Balance\n${Utils.toFixed(quantity, 4)}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>{`Change\n${Utils.toFixed(change, 2)}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexThree]}>
          <Text style={styles.textWallet}>
            {`Value\n${readablePrice !== 'Unknown' ? Utils.formatCurrency(Utils.parseFloat(usdPrice) * Utils.parseFloat(quantity)) : '$0'}`}
          </Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexOne]}>
          <ImageButton
            image={require('../../assets/images/icon-wallet.png')}
            style={{padding: 10}}
            imageStyle={styles.buttonDeleteWallet}
            onPress={() => this.onBuySell(project)}
          />
        </View>
      </View>
    </View>
  }

  renderWalletCell(portfolio) {
    const { tokenInformation } = this.props;
    const project = tokenInformation.find(project => portfolio.currency === project.symbol);
    if (!project) return;
    const { usdPrice, symbol, change } = project;
    const { exchange, balance } = portfolio;
    const readablePrice = usdPrice ? Utils.formatCurrency(usdPrice) : 'Unknown';
    return <View style={styles.walletWrapper} key={`wallet-cell-${symbol}-${exchange}`}>
      <View style={[CommonStyle.center, CommonStyle.flexRow, CommonStyle.flexOne]}>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>{exchange}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexThree]}>
          <Text style={styles.textWallet}>{`Price\n${readablePrice}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>{`Balance\n${Utils.toFixed(balance, 4)}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
          <Text style={styles.textWallet}>{`Change\n${Utils.toFixed(change, 2)}`}</Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexThree]}>
          <Text style={styles.textWallet}>
            {`Value\n${readablePrice !== 'Unknown' ? Utils.formatCurrency(Utils.parseFloat(usdPrice) * Utils.parseFloat(balance)) : '$0'}`}
          </Text>
        </View>
        <View style={[CommonStyle.center, CommonStyle.flexOne]}>
          <ImageButton
            image={require('../../assets/images/icon-delete.png')}
            style={{padding: 10}}
            imageStyle={styles.buttonDeleteWallet}
            onPress={() => this.onRemoveExchange(portfolio)}
          />
        </View>
      </View>
    </View>
  }

  renderCurrencyCell(item /* from tokenInformation */) {
    const { tokenInformation, displayColumns } = this.props;
    const project = tokenInformation.find(project => item.token === project.symbol);
    return <View>
      <TouchableOpacity
        style={[styles.currencyCell, CommonStyle.center]}
        onPress={ () => this.onPressCurrencyCell(project) }
      >
        { project && <View style={[CommonStyle.center, CommonStyle.flexRow, CommonStyle.flexOne]}>
          <View style={[CommonStyle.center, CommonStyle.flexTwo]}>
            <ImagePlaceholder
              style={{}}
              size={35}
              source={{uri: `${project.imageUrl}`}}
            />
            <Text style={styles.currencySymbol}>{project.symbol}</Text>
          </View>
          {
            displayColumns.map(column =>
              <View key={`currency-cell-${project.symbol}-${column.id}`} style={[CommonStyle.center, {flex: 3}]}>
                {this.renderViewByColumn(column, item, project)}
              </View>
            )
          }
        </View> }
      </TouchableOpacity>
      { !item.isWalletOnly && this.renderVirtualWallet(item)}
      { item.wallets.map(wallet => this.renderWalletCell(wallet)) }
    </View>
  }

  renderTokenInformation() {
    const { tokenInformation, displayColumns } = this.props;
    const { selectedTimeButtonIndex, portfolioItems } = this.state;

    return tokenInformation && <View style={styles.portfolioContainer}>

      <View style={[styles.currencyHeading, CommonStyle.center]}>
        <Text style={styles.currencyTitle}>Your Portfolio</Text>

        <View style={CommonStyle.flexRow}>
          <TextButton
            titleLabel='+ Add'
            style={styles.addButton}
            textStyle={styles.addButtonTitle}
            onPress={this.onPlusPressed}
          />
          <TextButton
            titleLabel='Connect Exchange'
            style={styles.exchangeButton}
            textStyle={styles.exchangeButtonTitle}
            onPress={this.onExchange}
            numberOfLines={2}
          />
        </View>
      </View>

      <View style={[styles.currencyHeading, styles.borderBottom]}>
        <View style={[CommonStyle.center, styles.headingLabelContainer, {flex: 2}]}>
        </View>
        {
          displayColumns.map(column => {
            let suffix = '';
            if (column.id === 6 || column.id === 7) {
              suffix = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? '\n(+14d)' : '\n(+7d)';
            }
            return <View
              key={`currency-heading-${column.id}`}
              style={[CommonStyle.center, styles.headingLabelContainer, {flex: 3}]}
            >
              <Text style={styles.headingLabel}> {`${column.displayName.toUpperCase()}${suffix}`} </Text>
            </View>
          })
        }
      </View>

      {portfolioItems.length > 0 && tokenInformation.length > 0 && <ListView
        style={CommonStyle.container}
        dataSource={ds.cloneWithRows(portfolioItems)}
        renderRow={this.renderCurrencyCell.bind(this)}
        enableEmptySections
      />}
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const {
      loading,
      showCurrencyModal,
      currentProject,
      selectedTimeButtonIndex,
      portfolioItems,
      transactionProject,
      visibleTransactionModal
    } = this.state;

    const { user, tokenInformation } = this.props;

    return (
      <View style={CommonStyle.container}>
        <Spinner
          visible={loading}
          animation='fade'
        />
        {portfolioItems.length > 0 && <PortfolioModal
          visible={showCurrencyModal}
          project={currentProject}
          timePeriodIndex={selectedTimeButtonIndex}
          onDetails={this.onCurrencyDetail}
          onDelete={this.onCurrencyDelete}
          onModalRequestClose={this.onModalRequestClose}
          portfolioItems={portfolioItems}
        />}
        {transactionProject && <TransactionModal
          visible={visibleTransactionModal}
          portfolio={transactionProject}
          onCloseTransaction={this.onCloseTransactionModal}
        />}
        <NavigationBar
          titleLabel='Total Portfolio Value'
          titleStyle={styles.headText}
        />
        { user && <View style={CommonStyle.container}>
          <Text style={styles.headPrice}>{Utils.formatCurrency(this.getInventoryValue())}</Text>
          { this.renderGraphView() }
          { tokenInformation.length > 0 && this.renderTokenInformation() }
        </View> }

      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    tokenInformation: store.project.tokenInformation,
    graphTimePeriods: store.graphTimePeriods,
    displayColumns: store.selectedCurrencyColumns,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (profile) => dispatch(setUserProfile(profile)),
    setProjectTokenInfo: (tokens) => dispatch(setProjectTokenInfo(tokens)),
    setDisplayColumns: (columns) => dispatch(setDisplayColumns(columns)),
  };
}

export const PortfolioScreen = connect(mapStateToProps, mapDispatchToProps)(_PortfolioScreen);