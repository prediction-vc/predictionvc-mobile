import React, { Component } from 'react';
import { Image, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { CommonStyle } from '../styles';
import { TextButton, ImageButton, Grid } from '../../components';
import { Utils, Constants } from '../../utils';
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

export class PortfolioGraph extends Component {

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

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onGraphExpand = () => {
    this.props.navigation.navigate('GraphScreen', {portfolio: this.state.portfolio});
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
  renderGraph() {
    const { graphType, volumeData, priceData, loadingGraph } = this.state;
    const { onGraphExpand, statisticsLabel } = this.props;
    const fill = 'rgba(0, 0, 0, 0.2)';
    const contentInset = { top: 10, bottom: 10 };
    let yAxisData = [];
    if (graphType === GraphType.VOLUME) yAxisData = volumeData;
    else if (graphType === GraphType.PRICE) yAxisData = priceData;
    return <View>
      <View style={[styles.compareWrapper]}>
        <Text style={{fontSize: 17}}>{!statisticsLabel ? 'Compare Statistics' : statisticsLabel}</Text>
        <ImageButton
          image={require('../../assets/images/icon-graph-expand.png')}
          onPress={onGraphExpand ? onGraphExpand : this.onGraphExpand}
        />
      </View>
      <View style={[styles.graphContainer, CommonStyle.center]}>
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
            numberOfTicks={ 10 }
            formatLabel={ value => `${value}` }
          />
          <View style={CommonStyle.flexOne}>
            {graphType === GraphType.VOLUME && volumeData.length > 0 && <BarChart
              style={{ position: 'absolute', left: 10, right: 10, top: 0, bottom: 0 }}
              data={ volumeData }
              svg={{ fill }}
              contentInset={contentInset}
              numberOfTicks={ 10 }
            >
              <Grid />
            </BarChart>}

            {graphType === GraphType.PRICE && priceData.length > 0 && <LineChart
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
      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <TextButton
          titleLabel={'Price'}
          style={graphType === GraphType.PRICE ? styles.activeGraphButton : styles.inactiveGraphButton}
          textStyle={graphType === GraphType.PRICE ? styles.buttonTitleWhite : styles.buttonTitleGreen}
          onPress={this.onToggleGraphPriceButton}
        />

        <TextButton
          titleLabel={'Volume'}
          style={graphType === GraphType.VOLUME ? styles.activeGraphButton : styles.inactiveGraphButton}
          textStyle={graphType === GraphType.VOLUME ? styles.buttonTitleWhite : styles.buttonTitleGreen}
          onPress={this.onToggleGraphVolumeButton}
        />
      </View>
    </View>
  }

  renderGraphPeriods() {
    const { activeGraphPeriod, textGraphPeriod } = this.state;
    const { graphPeriods } = this;
    return <View style={styles.graphPeriodContainer}>
      <View style={[CommonStyle.flexRow, CommonStyle.flexOne, { marginHorizontal: 10 }]}>
        {
          graphPeriods.map((period, index) => <TextButton
            key={`graphPeriodButton-${index}`}
            titleLabel={period}
            style={CommonStyle.flexOne}
            textStyle={index === activeGraphPeriod ? styles.buttonTitleGreen : styles.buttonTitleBlack}
            onPress={() => this.onGraphPeriodChange(index)}
          />)
        }
      </View>
      <View style={[CommonStyle.center, CommonStyle.flexOne, styles.graphPeriodWrapper]}>
        <Text style={styles.textPeriod}>{textGraphPeriod}</Text>
      </View>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <View>
      {this.renderGraph()}
      {this.renderGraphPeriods()}
    </View>
  }
}

const styles = StyleSheet.create({
  compareWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  graphContainer: {
    paddingLeft: 10,
    paddingRight: 20,
    marginBottom: 20,
    height: 200,
  },
  activeGraphButton: {
    margin: 10,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Constants.primaryColor,
    width: 70,
    height: 25,
    backgroundColor: Constants.primaryColor
  },
  inactiveGraphButton: {
    margin: 10,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: Constants.primaryColor,
    width: 70,
    height: 25,
    backgroundColor: 'white',
  },
  buttonTitleWhite: {
    fontSize: 10,
    color: 'white',
  },
  buttonTitleGreen: {
    fontSize: 10,
    color: Constants.primaryColor,
  },
  buttonTitleBlack: {
    fontSize: 10,
    color: Constants.primaryTextColor,
  },

  graphPeriodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  graphPeriodWrapper: {
    borderWidth: 0.5,
    borderRadius: 3,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    paddingVertical: 8,
    marginHorizontal: 10
  },
  textPeriod: {
    fontSize: 10,
    color: Constants.primaryTextColor
  }
});