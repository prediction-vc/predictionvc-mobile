import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, TextInput, Modal, ScrollView } from 'react-native';
import { modalStyles } from './style';
import { CommonStyle, ScreenWidth } from '../styles';
import { Prediction } from '../../services';
import { setUserProfile } from '../../actions/user';
import { setProjectTokenInfo } from '../../actions/project';
import { Utils, Constants, MarketStatusPeriod } from '../../utils';
import { AreaChart } from 'react-native-svg-charts';
import * as d3Shape from 'd3-shape';
import { TextButton, ImageButton, RoundButton, Spinner, ImagePlaceholder } from '../../components';

class _TransactionModal extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {
      selectedTimeButtonIndex: 0,
      graphData: this.getAllTimeGraphData(props.portfolio.yearMarket),
      visible: props.visible,
      portfolioQuantity: 0,
      loading: false,
    };
    this.scrollButtonBar = null;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (this.props.visible !== visible) {
      this.setState({ visible });
    }
    if (this.props.portfolio !== nextProps.portfolio) {
      const { portfolioItems } = nextProps.user;
      const item = portfolioItems.find(item => item.token === nextProps.portfolio.symbol);
      this.setState({portfolioQuantity: item ? item.quantity : 0});
    }
  }

  getAllTimeGraphData(yearMarket = this.props.portfolio) {
    if (!yearMarket) return [];
    const { price } = yearMarket;
    let graphData = [];
    let firstExistIndex = price.length;
    for (let i = 0; i < price.length; i++) {
      if (price[i] !== 0) {
        firstExistIndex = i;
      }
      if (i >= firstExistIndex) graphData.push(price[i]);
    }
    return graphData;
  }

  getSevenDayPrediction(project) {
    let sevenDayPrediction = project.usdPrice ? project.usdPrice : 0;
    if (project.predictions) {
      sevenDayPrediction = project.predictions.sevenDay ? project.predictions.sevenDay.prediction : project.usdPrice;
    }

    return sevenDayPrediction;
  }

  getFourteenDayPrediction(project) {
    let fourteenDayPrediction = project.usdPrice ? project.usdPrice : 0;
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
      const { portfolio } = this.props;
      let graphData = [];
      switch (index) {
        case MarketStatusPeriod.AllTime:
          graphData = this.getAllTimeGraphData(portfolio.yearMarket);
          break;
        case MarketStatusPeriod.YearMarket:
          graphData = portfolio.yearMarket ? portfolio.yearMarket.price : [];
          break;
        case MarketStatusPeriod.QuarterMarket: {
          graphData = portfolio.quarterMarket ? portfolio.quarterMarket.price : [];
          break;
        }
        case MarketStatusPeriod.WeekMarket: {
          graphData = portfolio.weekMarket ? portfolio.weekMarket.price : [];
          break;
        }
        case MarketStatusPeriod.DayMarket: {
          graphData = portfolio.dayMarket ? portfolio.dayMarket.price : [];
          break;
        }
        case MarketStatusPeriod.MonthMarket:
        default: {
          graphData = portfolio.monthMarket ? portfolio.monthMarket.price : [];
          break;
        }
      }
      this.setState({selectedTimeButtonIndex: index, graphData});

    } else if (index === -1) {
      // Next button pressed.
      this.scrollButtonBar.scrollToEnd({animated: true});
    } else {
      this.setState({selectedTimeButtonIndex: index});
    }
  };

  onCloseModal = () => {
    const { onCloseTransaction } = this.props;
    if (onCloseTransaction) onCloseTransaction();
  };

  onChangeQuantity = (portfolioQuantity) => {
    this.setState({portfolioQuantity});
  };

  onSave = async (side) => {
    const { portfolio } = this.props;
    const { portfolioQuantity } = this.state;
    if (Utils.parseFloat(portfolioQuantity) === 0) {
      Utils.showAlert('Input Error', 'Please input quantity.');
      return;
    }
    if (!portfolio.usdPrice) {
      Utils.showAlert('Error', 'Price is unknown.');
      return;
    }
    try {
      this.setState({ loading: true });
      const { user } = await Prediction.updateTokenToPortfolio({
        side: side,
        symbol: portfolio.symbol,
        quantity: Utils.parseFloat(portfolioQuantity)
      });
      this.props.setUserProfile(user);
    } catch (error) {
      console.log(error);
      Utils.showAlert('Error', JSON.stringify(error));
    }
    this.setState({ loading: false });
    this.onCloseModal();
  };

  // mark - Button Action end  ////////////

  // mark - Handle App data start
  // mark - Handle App data end////////////

  // mark - Render components start
  renderPortfolio() {
    const { portfolio } = this.props;
    const readablePrice = portfolio.usdPrice ? Utils.formatCurrency(portfolio.usdPrice) : 'Unknown';
    const image = portfolio.imageUrl ?
      {uri: portfolio.imageUrl} :
      require('../../assets/images/placeholder.png');
    return <View style={modalStyles.infoContainer}>
      <ImagePlaceholder style={{}} size={44} source={image}/>
      <View style={[CommonStyle.flexOne, {paddingLeft: 20}]}>
        <Text style={modalStyles.portfolioName}>{portfolio.name}</Text>
        <Text style={modalStyles.portfolioPrice}>{readablePrice}</Text>
      </View>
      <ImageButton
        image={require('../../assets/images/icon-close.png')}
        style={modalStyles.closeButton}
        onPress={this.onCloseModal}
      />
    </View>
  }

  renderGraphView() {
    const { selectedTimeButtonIndex, graphData } = this.state;
    const { portfolio, graphTimePeriods } = this.props;
    let graphStatusIcon = portfolio.change >= 0 ?
      require('../../assets/images/icon-rise.png') :
      require('../../assets/images/icon-fall.png');

    return <View style={[modalStyles.graphContainer, CommonStyle.center]}>
      {graphData.length > 0 && <AreaChart
        style={{ width: ScreenWidth - 40, height: 160 }}
        data={ graphData }
        contentInset={{ top: 30, bottom: 0 }}
        curve={ d3Shape.curveLinear }
        svg={{ fill: Constants.chartNormalBackground }}
      />}

      <View style={[modalStyles.graphChangeContainer, CommonStyle.center]}>
        <View style={[CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={[portfolio.change >= 0 ? CommonStyle.textGoodColor : CommonStyle.textBadColor, modalStyles.graphChangeValue]}>
            {Utils.toFixed(portfolio.change, 2)}%
          </Text>
          <Image style={modalStyles.graphChangeIcon} source={graphStatusIcon}/>
        </View>
        <Text style={modalStyles.graphChangeDescription}>24H CHANGE</Text>
      </View>

      <View style={[modalStyles.graphTimeButtonBar, CommonStyle.flexRow]}>
        <TextButton
          titleLabel={graphTimePeriods[0]}
          style={selectedTimeButtonIndex === 0 ? modalStyles.timeButtonActiveBorder : {}}
          textStyle={[modalStyles.graphAllTimeButtonTitle]}
          onPress={() => { this.onGraphTimeChanged(0) }}
        />

        <ScrollView
          ref={(ref) => {this.scrollButtonBar = ref}}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {
            graphTimePeriods.map((timePeriod, index) => {
              if (index > 0 && index < 6) {
                return <TextButton
                  key={`time-button-${index}`}
                  titleLabel={timePeriod}
                  style={[modalStyles.graphCommonTimeButton, selectedTimeButtonIndex === index ? modalStyles.timeButtonActiveBorder : {}]}
                  textStyle={[modalStyles.graphCommonTimeButtonTitle, ]}
                  onPress={() => { this.onGraphTimeChanged(index) }}
                />
              }
            })
          }
        </ScrollView>

        <ImageButton
          image={require('../../assets/images/icon-right-gray.png')}
          style={modalStyles.graphNextButton}
          onPress={() => {this.onGraphTimeChanged(-1)}}
        />
      </View>
    </View>
  }

  renderTokenInfo() {
    const { portfolio, user } = this.props;
    const { portfolioQuantity } = this.state;
    const { portfolioItems } = user;
    const item = portfolioItems.find(item => item.token === portfolio.symbol);
    const quantity = item ? item.quantity : 0;
    const enteredQuantity = Utils.parseFloat(portfolioQuantity);
    const readablePrice = portfolio.usdPrice ? Utils.formatCurrency(portfolio.usdPrice) : 'Unknown';
    const volume = portfolio.usdPrice ? Utils.formatCurrency(portfolio.usdPrice * (quantity + enteredQuantity)) : 'Unknown';

    return <View style={modalStyles.transactionContainer}>
      <View>
        <View style={{justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'row'}}>
          <Text style={modalStyles.textTokenCount}>{item ? Utils.toFixed(item.quantity, 2) : '0'} tokens</Text>
          <Text style={modalStyles.blackDescription}> in your portfolio</Text>
        </View>
        <Text style={[modalStyles.grayDescription, CommonStyle.textCenter, {paddingTop: 10}]}>
          Enter the amount of tokens that have you purchased. Alternatively, get this data by connecting your exchanges and wallets
        </Text>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TextInput
          style={modalStyles.quantityInput}
          value={portfolioQuantity.toString()}
          keyboardType='numeric'
          multiline={false}
          placeholder='Quantity'
          onChangeText={this.onChangeQuantity}
          underlineColorAndroid={'rgba(0, 0, 0, 0)'}
        />
        <View style={{paddingLeft: 10}}>
          <View style={CommonStyle.flexRow}>
            <Text style={[modalStyles.grayDescription, {width: 52}]}>Price</Text>
            <Text style={modalStyles.grayDescription}>{readablePrice}</Text>
          </View>
          <View style={CommonStyle.flexRow}>
            <Text style={[modalStyles.textTotalDesc, {width: 52}]}>Total</Text>
            <Text style={modalStyles.textTotalPrice}>{volume}</Text>
          </View>
        </View>
      </View>

      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <RoundButton
          size={Constants.buttonHeight}
          titleLabel='BUY'
          buttonStyle={modalStyles.buyButton}
          textStyle={modalStyles.buyButtonText}
          onPress={() => this.onSave('buy')}
        />
        <RoundButton
          size={Constants.buttonHeight}
          titleLabel='SELL'
          buttonStyle={modalStyles.sellButton}
          textStyle={modalStyles.sellButtonText}
          onPress={() => this.onSave('sell')}
        />
      </View>
    </View>
  }

  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { visible, loading } = this.state;
    return (
      <Modal
        animationType='fade'
        onRequestClose={() => this.handleOnRequestClose()}
        supportedOrientations={['portrait']}
        transparent
        visible={visible}>
        <Spinner visible={loading}/>
        {visible && <View style={modalStyles.container}>
          <View style={modalStyles.modalContent}>
            { this.renderPortfolio() }
            { this.renderGraphView() }
            { this.renderTokenInfo() }
          </View>
        </View>}
      </Modal>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    tokenInformation: store.project.tokenInformation,
    graphTimePeriods: store.graphTimePeriods,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (profile) => dispatch(setUserProfile(profile)),
    setProjectTokenInfo: (tokens) => dispatch(setProjectTokenInfo(tokens)),
  };
}

export const TransactionModal = connect(mapStateToProps, mapDispatchToProps)(_TransactionModal);