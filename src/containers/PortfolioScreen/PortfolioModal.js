import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { View, Text, Modal, TouchableHighlight, Image, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { styles, modalStyle } from './style';
import { CommonStyle } from '../styles';
import { Utils, Constants, MarketStatusPeriod } from '../../utils';
import { TextButton, ImageButton, RoundButton, ImagePlaceholder } from '../../components';
import { AreaChart, LineChart } from 'react-native-svg-charts';
import * as d3Shape from 'd3-shape';

class _PortfolioModal extends Component {

  // Prop types
  static propTypes = {
    timePeriodIndex: PropTypes.number.isRequired,
    project: PropTypes.object.isRequired,
    onDetails: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onModalRequestClose: PropTypes.func,
    portfolioItems: PropTypes.array.isRequired,
  };

  // Initialize
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedTimeButtonIndex: props.timePeriodIndex,
      graphData: [],
    };
    this.scrollButtonBar = null;
    this.updateGraphData();
  }

  componentWillReceiveProps(nextProps) {
    const { visible } = nextProps;
    if (this.props.visible !== visible) {
      this.setState({ visible });
    }
    if (this.props.project !== nextProps.project) {
      this.updateGraphData(nextProps.project);
    }
  }

  updateGraphData(project = this.props.project) {
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

    this.setState({ graphData });
  }

  getInventoryValue() {

    let total = 0;
    const { tokenInformation, portfolioItems } = this.props;

    portfolioItems.map((item) => {
      const itemToken = tokenInformation.find(token => token.symbol === item.token);
      if (itemToken) {
        const readablePrice = itemToken.usdPrice ? itemToken.usdPrice : 0;
        total += item.quantity * readablePrice;
      }
    });

    return total;
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
  ///////////////

  // Modal Actions
  handleOnRequestClose = () => {
    const { onModalRequestClose } = this.props;
    if (onModalRequestClose) {
      onModalRequestClose();
      return;
    }
    this.setState({visible: false});
  };

  onGraphTimeChanged = (index) => {
    console.log('GraphTimeChangeButton: index=', index);
    if (index >= 0) {
      this.setState({selectedTimeButtonIndex: index}, () => {
        this.updateGraphData();
      });
    } else if (index === -1) {
      // Next button pressed.
      this.scrollButtonBar.scrollToEnd({animated: true});
    }
  };

  onNotification = () => {
    console.log('Notification button pressed');
  };

  onDelete = () => {
    const { project, onDelete } = this.props;
    Alert.alert(
      `Delete ${project.symbol} project`,
      'Are you sure you want to delete this project?',
      [
        {text: 'Cancel', onPress: () => console.log('Alert OK Pressed'), style: 'cancel'},
        {text: 'Delete', onPress: () => onDelete(project), style: 'ok'},
      ],
      { cancelable: true }
    );
  };
  /////////////////

  // Render Components
  renderBottomInformation() {
    const { project, onDetails, portfolioItems } = this.props;
    const item = portfolioItems.find(item => item.token === project.symbol);
    const readablePrice = project.usdPrice ? project.usdPrice : 0;
    const price = readablePrice * item.quantity;

    return <View style={[modalStyle.bottomContainer]}>
      <View style={[CommonStyle.flexRow, styles.borderBottom]}>
        <Text style={modalStyle.bottomPriceText}>{Utils.formatCurrency(price)}</Text>
        <Text style={modalStyle.bottomPriceDesc}>Price (24h)</Text>
      </View>

      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <View style={[CommonStyle.flexOne, {justifyContent: 'center'}]}>
          <RoundButton
            size={Constants.normalButtonHeight}
            titleLabel='Details'
            buttonStyle={modalStyle.detailButtonStyle}
            textStyle={modalStyle.detailButtonTitle}
            onPress={onDetails}
          />
        </View>
        <ImageButton
          image={require('../../assets/images/icon-alert.png')}
          style={styles.graphNextButton}
          onPress={this.onNotification}
        />
        <ImageButton
          image={require('../../assets/images/icon-delete.png')}
          style={modalStyle.modalNextButton}
          onPress={this.onDelete}
        />
      </View>
    </View>
  }

  renderGraph() {
    const { graphData, selectedTimeButtonIndex } = this.state;
    const { project, portfolioItems } = this.props;
    const readablePrice = project.usdPrice ? project.usdPrice : 0;
    const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
    const growing = forecastPrice >= readablePrice;
    return <View style={[modalStyle.modalGraphContainer, CommonStyle.flexRow]}>
      <LineChart
        style={[modalStyle.modalGraphContent,
          {right : selectedTimeButtonIndex < MarketStatusPeriod.PredictOneWeek ? 0 : 30}
        ]}
        data={ graphData }
        contentInset={{ top: 5, bottom: 5 }}
        numberOfTicks={ 5 }
        curve={ d3Shape.curveLinear }
        gridMin={0}
        gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
        svg={{
          stroke: Constants.primaryTextColor,
          strokeWidth: 2}}
      >
      </LineChart>
      <AreaChart
        style={[modalStyle.modalGraphContent,
          {right : selectedTimeButtonIndex < MarketStatusPeriod.PredictOneWeek ? 0 : 30}
        ]}
        data={ graphData }
        contentInset={{ top: 5, bottom: 5 }}
        curve={ d3Shape.curveLinear }
        gridMin={0}
        gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
        svg={{
          strokeWidth: 0,
          fill: Constants.chartBackground }}
      />
      { selectedTimeButtonIndex === MarketStatusPeriod.PredictOneWeek && <LineChart
        style={modalStyle.modalPredictGraphContent}
        data={ [graphData[graphData.length-1], this.getSevenDayPrediction(project)] }
        contentInset={{ top: 5, bottom: 5 }}
        curve={ d3Shape.curveLinear }
        gridMin={0}
        gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
        svg={{
          stroke: growing ? Constants.primaryColor : Constants.alertColor,
          strokeWidth: 2}}
      />}
      { selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks && <LineChart
        style={modalStyle.modalPredictGraphContent}
        data={ [graphData[graphData.length-1], this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project)] }
        contentInset={{ top: 5, bottom: 5 }}
        curve={ d3Shape.curveLinear }
        gridMin={0}
        gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
        svg={{
          stroke: growing ? Constants.primaryColor : Constants.alertColor,
          strokeWidth: 2}}
      />}
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
        const futureLoss = readablePrice * item.quantity - (forecastPrice * item.quantity);
        return <View style={[styles.gainLossContainer, CommonStyle.center, futureLoss >= 0 ? styles.goodBgColor: styles.badBgColor]}>
          <Text style={styles.textGainLoss}>{Utils.formatCurrency(futureLoss)}</Text>
        </View>;
      }
      case 7: //'Future gain/loss (%)',
      {
        const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
        const futureLoss = (forecastPrice * item.quantity) - readablePrice * item.quantity;
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
        // const priceData = project.monthMarket.price;
        const { graphData } = this.state;
        const forecastPrice = selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks ? project.forecast14Day : project.forecast7Day;
        const growing = forecastPrice >= readablePrice;
        return <View style={CommonStyle.flexRow}>
          <AreaChart
            style={{
              position:'absolute',
              width: selectedTimeButtonIndex < MarketStatusPeriod.PredictOneWeek ? 52 : 40,
              height: 40,
              left: 0 }}
            data={ graphData }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
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
            data={ graphData }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            gridMin={0}
            svg={{
              stroke: Constants.primaryTextColor,
              strokeWidth: 2}}
          />
          { selectedTimeButtonIndex === MarketStatusPeriod.PredictOneWeek && <LineChart
            style={{width: 12, height: 40 }}
            data={ [graphData[graphData.length-1], this.getSevenDayPrediction(project)] }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMin={0}
            gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            svg={{
              stroke: growing ? Constants.primaryColor : Constants.alertColor,
              strokeWidth: 2}}
          />}
          { selectedTimeButtonIndex === MarketStatusPeriod.PredictTwoWeeks && <LineChart
            style={{width: 12, height: 40 }}
            data={ [graphData[graphData.length-1], this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project)] }
            contentInset={{ top: 5, bottom: 10 }}
            curve={ d3Shape.curveLinear }
            gridMin={0}
            gridMax={Math.max(...graphData, this.getSevenDayPrediction(project), this.getFourteenDayPrediction(project))}
            svg={{
              stroke: growing ? Constants.primaryColor : Constants.alertColor,
              strokeWidth: 2}}
          />}
        </View>
      }
    }
    return <View/>
  }

  renderCurrencyInformation() {
    const { project, displayColumns, portfolioItems } = this.props;
    const item = portfolioItems.find(item => item.token === project.symbol);

    return <View style={[CommonStyle.flexRow, CommonStyle.center]}>

      <View style={[CommonStyle.center, CommonStyle.flexOne]}>
        <ImagePlaceholder
          style={{}}
          size={35}
          source={{uri: `${project.imageUrl}`}}
        />
        <Text style={styles.currencySymbol}>{project.symbol}</Text>
      </View>

      {
        displayColumns.map(column =>
          <View key={`currency-cell-${project.symbol}-${column.id}`} style={[CommonStyle.center, CommonStyle.flexTwo]}>
            {this.renderViewByColumn(column, item, project)}
          </View>
        )
      }
    </View>
  }

  renderGraphPeriodBar() {
    const { selectedTimeButtonIndex } = this.state;
    const { graphTimePeriods } = this.props;
    return <View style={[modalStyle.modalTimeButtonBar, CommonStyle.flexRow, CommonStyle.center]}>
      <TextButton
        titleLabel={graphTimePeriods[0]}
        style={selectedTimeButtonIndex === 0 ? modalStyle.modalTimeButtonActive : {}}
        textStyle={selectedTimeButtonIndex === 0 ? modalStyle.modalActiveTimeButtonTitle : modalStyle.modalCommonTimeButtonTitle}
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
                style={[modalStyle.modalCommonTimeButton, selectedTimeButtonIndex === index ? modalStyle.modalTimeButtonActive : {}]}
                textStyle={[modalStyle.modalCommonTimeButtonTitle, selectedTimeButtonIndex === index ? modalStyle.modalActiveTimeButtonTitle : modalStyle.modalCommonTimeButtonTitle]}
                onPress={() => { this.onGraphTimeChanged(index) }}
              />
            }
          })
        }
      </ScrollView>

      <ImageButton
        image={require('../../assets/images/icon-right-gray.png')}
        style={modalStyle.modalNextButton}
        onPress={() => {this.onGraphTimeChanged(-1)}}
      />
    </View>
  }

  renderProjectContent() {
    return <TouchableHighlight
      underlayColor='rgba(0, 0, 0, 0.25)'
      activeOpacity={1}
      style={[modalStyle.modalContainer, CommonStyle.center]}
      onPress={this.handleOnRequestClose}
    >
      <View style={modalStyle.content}>
        <TouchableOpacity
          style={modalStyle.fillContent}
          onPress={() => {}}
        />
        {this.renderCurrencyInformation()}
        {this.renderGraphPeriodBar()}
        {this.renderGraph()}
        {this.renderBottomInformation()}
      </View>
    </TouchableHighlight>
  }

  render() {
    const { visible } = this.state;
    return (
      <Modal
        animationType='fade'
        onRequestClose={() => this.handleOnRequestClose()}
        supportedOrientations={['portrait']}
        transparent
        visible={visible}>
        {visible && this.renderProjectContent()}
      </Modal>
    );
  }
  /////////////////////
}

function mapStateToProps(store) {
  return {
    user: store.user,
    tokenInformation: store.project.tokenInformation,
    graphTimePeriods: store.graphTimePeriods,
    displayColumns: store.selectedCurrencyColumns,
  }
}

export const PortfolioModal = connect(mapStateToProps, {})(_PortfolioModal);