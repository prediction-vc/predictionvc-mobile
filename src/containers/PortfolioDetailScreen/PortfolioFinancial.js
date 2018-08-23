import React, { Component } from 'react';
import { Image, View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../styles';
import { Utils, Constants } from '../../utils';
import { PortfolioGraph } from './PortfolioGraph';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import _ from 'lodash';

export class PortfolioFinancial extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
      exchangeShowMore: false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onToggleExchangeMore = () => {
    const { exchangeShowMore } = this.state;
    this.setState({ exchangeShowMore: !exchangeShowMore });
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  // mark - Handle App data end////////////

  // mark - Render components start
  renderFinancialSummary() {
    const { portfolio } = this.state;
    const readablePrice = portfolio.usdPrice ? Utils.formatCurrency(portfolio.usdPrice) : 'Unknown';
    const marketCap = portfolio.marketcap ? Utils.formatCurrency(portfolio.marketcap) : 'Unknown';
    return <View style={styles.summaryContainer}>
      <Text style={styles.sectionTitle}>Summary</Text>
      <View style={CommonStyle.flexRow}>
        <Text style={styles.textSummary}>Marketcap</Text>
        <Text style={[styles.textSummary, styles.textRight, CommonStyle.flexOne]}>{marketCap}</Text>
      </View>
      <View style={CommonStyle.flexRow}>
        <Text style={styles.textSummary}>Price</Text>
        <Text style={[styles.textSummary, styles.textRight, CommonStyle.flexOne]}>{readablePrice}</Text>
      </View>
      <View style={CommonStyle.flexRow}>
        <Text style={styles.textSummary}>Price in Bitcoin</Text>
        <Text style={[styles.textSummary, styles.textRight, CommonStyle.flexOne]}>{Utils.toFixed(portfolio.btcPrice)}</Text>
      </View>
      <View style={CommonStyle.flexRow}>
        <Text style={styles.textSummary}>24H Change(USD)</Text>
        <Text style={[styles.textSummary, styles.textRight, CommonStyle.flexOne]}>{Utils.toFixed(portfolio.change)}%</Text>
      </View>
    </View>
  }

  renderExchanges() {
    const { exchangeShowMore } = this.state;
    const { exchanges } = this.state.portfolio;
    let maxLines = Math.ceil(exchanges.length / 3);
    if (!exchangeShowMore) maxLines = 6;
    return <View style={styles.summaryContainer}>
      <Text style={[styles.textSummary, {paddingVertical: 15}]}>Exchanges</Text>
      {
        _.range(0, maxLines).map( (line, index) =>
          <View key={`exchange-row-${index}`} style={CommonStyle.flexRow}>
            <Text style={[CommonStyle.flexOne, styles.textSummary]}>
              {index * 3 < exchanges.length ? exchanges[index * 3] : ''}
            </Text>
            <Text style={[CommonStyle.flexOne, styles.textSummary]}>
              {index * 3 + 1 < exchanges.length ? exchanges[index * 3 + 1] : ''}
            </Text>
            <Text style={[CommonStyle.flexOne, styles.textSummary]}>
              {index * 3 + 2 < exchanges.length ? exchanges[index * 3 + 2] : ''}
            </Text>
          </View>
        )
      }

      {exchanges.length > 18 && <TouchableOpacity
        style={styles.moreButton}
        onPress={this.onToggleExchangeMore}
      >
        <Text style={styles.moreButtonTitle}>{exchangeShowMore ? 'Show less' : 'See all'}</Text>
        <Image
          style={{alignSelf:'center', transform: [{ rotate: exchangeShowMore ? '180deg' : '0deg'}]}}
          source={require('../../assets/images/icon-show-more.png')}
        />
      </TouchableOpacity>}
    </View>
  }

  renderTokenPrice() {
    const { portfolio } = this.state;
    const readablePrice = portfolio.usdPrice ? Utils.formatCurrency(portfolio.usdPrice) : 'Unknown';
    return <View style={[CommonStyle.flexRow, styles.summaryContainer]}>
      <Text style={[CommonStyle.flexOne, {fontSize: 17, color:Constants.primaryTextColor}]}>Token Price & Volume</Text>
      <Text style={{fontSize: 17, color:Constants.primaryColor}}>{readablePrice}</Text>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='financial'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='Financial Strengths'
        weaknessTitle='Financial Weaknesses'
      />
      {this.renderFinancialSummary()}
      {this.renderExchanges()}
      {this.renderTokenPrice()}
      <PortfolioGraph
        {...this.props}
        statisticsLabel=' '
      />
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  summaryContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    paddingVertical: 15,
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  textSummary: {
    fontSize: 12,
    color: Constants.primaryTextColor,
  },
  textRight: {
    textAlign: 'right'
  },
  moreButton: {
    flexDirection: 'row',
  },
  moreButtonTitle : {
    paddingVertical: 10,
    color: Constants.primaryColor,
    fontSize: 13,
    paddingRight: 5,
  }
});