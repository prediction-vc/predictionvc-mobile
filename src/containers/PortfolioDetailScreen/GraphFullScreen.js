import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ActivityIndicator } from 'react-native';
import { styles, graphScreenStyles } from './style';
import { CommonStyle } from '../styles';
import { Utils, Constants } from '../../utils';
import { ImageButton, TextButton, Grid, ImagePlaceholder } from '../../components';
import Orientation from 'react-native-orientation';
import { BarChart, YAxis, LineChart } from 'react-native-svg-charts';
import moment from 'moment';

const GraphPeriod = {
  DAY: 0,
  WEEK: 1,
  MONTH: 2,
  QUARTER: 3,
  YEAR: 4,
};

const GraphType = {
  PRICE: 0,
  VOLUME: 1,
};

class _GraphFullScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    const { monthMarket } = params.portfolio;
    this.state = {
      loadingGraph: false,
      portfolio: params.portfolio,
      graphType: GraphType.VOLUME,
      activeGraphPeriod: GraphPeriod.MONTH,
      volumeData: monthMarket ? monthMarket.volume : [],
      priceData: monthMarket ? monthMarket.price : [],
      xAxis: [],
      textGraphPeriod: `${moment().subtract(1, 'months').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`
    };

    this.graphPeriods = ['1D', '1W', '1M', '3M', '1Y'];
  }

  componentDidMount() {
    Orientation.lockToLandscape();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onToggleGraphPriceButton = () => {
    this.setState({loadingGraph: true});
    setTimeout(() => {
      this.setState({loadingGraph:false, graphType: GraphType.PRICE});
    }, 100);
  };

  onToggleGraphVolumeButton = () => {
    this.setState({loadingGraph: true});
    setTimeout(() => {
      this.setState({loadingGraph:false, graphType: GraphType.VOLUME});
    }, 100);
  };

  onGraphPeriodChange = (period) => {
    if (period === this.state.activeGraphPeriod) return;
    this.setState({ activeGraphPeriod: period });
    this.updateGraphData(period);
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  getCoinIcon() {
    const { portfolio } = this.state;
    if (portfolio.imageUrl) {
      return {uri: portfolio.imageUrl};
    }
    return require('../../assets/images/placeholder.png');
  }

  updateGraphData(period) {

    const { dayMarket, weekMarket, monthMarket, quarterMarket, yearMarket } = this.state.portfolio;
    let marketData = null;
    let textGraphPeriod = '';
    switch (period) {
      case GraphPeriod.DAY:
        marketData = dayMarket;
        textGraphPeriod = `${moment().subtract(1, 'days').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`;
        break;
      case GraphPeriod.WEEK:
        marketData = weekMarket;
        textGraphPeriod = `${moment().subtract(1, 'weeks').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`;
        break;
      case GraphPeriod.MONTH:
        marketData = monthMarket;
        textGraphPeriod = `${moment().subtract(1, 'months').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`;
        break;
      case GraphPeriod.QUARTER:
        marketData = quarterMarket;
        textGraphPeriod = `${moment().subtract(3, 'months').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`;
        break;
      case GraphPeriod.YEAR:
        marketData = yearMarket;
        textGraphPeriod = `${moment().subtract(1, 'years').format('YYYY.MM.DD')} - ${moment().format('YYYY.MM.DD')}`;
        break;
    }
    let volume = marketData ? marketData.volume : [];
    let price = marketData ? marketData.price : [];
    this.setState({loadingGraph: true, textGraphPeriod});
    setTimeout(() => {
      this.setState({loadingGraph:false, volumeData: volume, priceData: price});
    }, 100);
  }
  // mark - Handle App data end////////////

  // mark - Render components start
  renderNavigationBar() {
    const { portfolio } = this.state;
    const { portfolioItems } = this.props.user;
    const { usdPrice, change } = portfolio;
    const readablePrice = usdPrice ? usdPrice : 0;
    const coinStatusIcon = change >= 0 ?
      require('../../assets/images/icon-rise.png') :
      require('../../assets/images/icon-fall.png');
    const item = portfolioItems.find(item => item.token === portfolio.symbol);

    return <View style={graphScreenStyles.landscapeNavigationContainer}>
      <ImageButton
        image={require('../../assets/images/icon_back_green.png')}
        style={graphScreenStyles.navigationButton}
        onPress={this.onBackButtonPressed}
      />
      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <ImagePlaceholder style={{}} size={25} source={this.getCoinIcon()}/>
        <Text style={graphScreenStyles.navigationTitle}>{`${portfolio.name} / ${portfolio.symbol}`}</Text>
      </View>
      <View style={CommonStyle.flexRow}>
        <View style={{alignItems: 'center', padding: 10}}>
          <Text style={{fontSize: 15}}>{Utils.toFixed(item.quantity, 2)}</Text>
          <Text style={styles.changeDescription}>HOLDING</Text>
        </View>

        <View style={{alignItems: 'center', padding: 10}}>
          <Text style={{fontSize: 15}}>{Utils.formatCurrency(readablePrice)}</Text>
          <Text style={styles.changeDescription}>MARKET PRICE</Text>
        </View>

        <View style={{alignItems: 'center', padding: 10}}>
          <Text style={{fontSize: 15}}>{Utils.formatCurrency(item.quantity * readablePrice)}</Text>
          <Text style={styles.changeDescription}>NET COST</Text>
        </View>
      </View>
      <View style={{alignItems: 'flex-end'}}>
        <View style={[CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={change >= 0 ? graphScreenStyles.navigationCoinRise : graphScreenStyles.navigationCoinFall}> {Utils.formatCurrency(readablePrice)} </Text>
          <Image source={coinStatusIcon}/>
        </View>
        <Text style={styles.changeDescription}>PROFIT / LOSS</Text>
      </View>
    </View>
  }

  renderGraph() {
    const { graphType, volumeData, priceData, loadingGraph } = this.state;
    const fill = 'rgba(0, 0, 0, 0.2)';
    const contentInset = { top: 10, bottom: 0 };
    let yAxisData = [];
    if (graphType === GraphType.VOLUME) yAxisData = volumeData;
    else if (graphType === GraphType.PRICE) yAxisData = priceData;
    return <View style={[CommonStyle.flexOne, {position: 'relative'}]}>
      <View style={[graphScreenStyles.graphContainer, CommonStyle.center]}>
        {loadingGraph && <ActivityIndicator size={'small'}/>}
        {!loadingGraph && <View style={[CommonStyle.flexOne, CommonStyle.flexRow]}>
          <YAxis
            style={{paddingHorizontal:5}}
            data={ yAxisData }
            contentInset={ contentInset }
            svg={{
              fill: 'rgba(82, 82, 102, 0.5)',
              fontSize: 10,
            }}
            numberOfTicks={ 8 }
            formatLabel={ value => `${value}` }
          />
          <View style={CommonStyle.flexOne}>
            {graphType === GraphType.VOLUME && <BarChart
              style={{ position: 'absolute', left: 10, right: 10, top: 0, bottom: 0 }}
              data={ volumeData }
              svg={{ fill }}
              contentInset={contentInset}
              numberOfTicks={ 8 }
            >
              <Grid />
            </BarChart>}

            {graphType === GraphType.PRICE && <LineChart
              style={{ position: 'absolute', left: 10, right: 10, top: 0, bottom: 0 }}
              data={ priceData }
              svg={{ stroke: Constants.primaryColor }}
              contentInset={contentInset}
            >
              <Grid />
            </LineChart>}

          </View>
        </View>}
      </View>
    </View>
  }

  renderGraphPeriods() {
    const { graphType, activeGraphPeriod, textGraphPeriod } = this.state;
    const { graphPeriods } = this;
    return <View style={graphScreenStyles.graphPeriodContainer}>
      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <TextButton
          titleLabel={'Price'}
          style={graphType === GraphType.PRICE ? graphScreenStyles.activeGraphButton : graphScreenStyles.inactiveGraphButton}
          textStyle={graphType === GraphType.PRICE ? graphScreenStyles.buttonTitleWhite : graphScreenStyles.buttonTitleGreen}
          onPress={this.onToggleGraphPriceButton}
        />

        <TextButton
          titleLabel={'Volume'}
          style={graphType === GraphType.VOLUME ? graphScreenStyles.activeGraphButton : graphScreenStyles.inactiveGraphButton}
          textStyle={graphType === GraphType.VOLUME ? graphScreenStyles.buttonTitleWhite : graphScreenStyles.buttonTitleGreen}
          onPress={this.onToggleGraphVolumeButton}
        />
      </View>
      <View style={[CommonStyle.flexRow, CommonStyle.flexOne, { marginHorizontal: 10 }]}>
        {
          graphPeriods.map((period, index) => <TextButton
            key={`graphPeriodButton-${index}`}
            titleLabel={period}
            style={CommonStyle.flexOne}
            textStyle={index === activeGraphPeriod ? graphScreenStyles.buttonTitleGreen : graphScreenStyles.buttonTitleBlack}
            onPress={() => this.onGraphPeriodChange(index)}
          />)
        }
      </View>
      <View style={[CommonStyle.center, CommonStyle.flexOne, graphScreenStyles.graphPeriodWrapper]}>
        <Text style={graphScreenStyles.textPeriod}>{textGraphPeriod}</Text>
      </View>
      <ImageButton
        style={{paddingHorizontal: 10}}
        image={require('../../assets/images/icon-graph-collapse.png')}
        onPress={this.onBackButtonPressed}
      />
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <View style={CommonStyle.container}>
      {this.renderNavigationBar()}
      {this.renderGraphPeriods()}
      {this.renderGraph()}
    </View>
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export const GraphFullScreen = connect(mapStateToProps, mapDispatchToProps)(_GraphFullScreen);