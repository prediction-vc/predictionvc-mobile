import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { CommonStyle } from '../styles';
import { Utils, Constants } from '../../utils';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import { TextButton } from '../../components';

export class PortfolioIco extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Render components start
  renderIcoInformation() {
    const { portfolio } = this.state;
    return <View style={styles.icoContainer}>
      <Text style={{fontSize: 17, paddingVertical: 15}}>ICO Information</Text>
      <View style={CommonStyle.flexRow}>
        <View style={CommonStyle.flexOne}>
          <Text style={styles.textSubTitle}>Active</Text>
          <Text style={styles.textDescription}>ICO Status</Text>
        </View>
        <View>
          <TextButton
            titleLabel="Whitepaper"
            style={styles.buttonWhitePaper}
            textStyle={styles.buttonWhitePaperTitle}
          />
        </View>
      </View>
      <View style={styles.infoWrapper}>
        {portfolio.icoStartDate && <View style={CommonStyle.flexOne}>
          <Text style={{fontSize: 12, color: Constants.primaryTextColor}}>{portfolio.icoStartDate}</Text>
          <Text style={styles.textDescription}>Start-Date</Text>
        </View>}
        {portfolio.icoEndDate && <View style={CommonStyle.flexOne}>
          <Text style={{fontSize: 12, color: Constants.primaryTextColor}}>{portfolio.icoEndDate}</Text>
          <Text style={styles.textDescription}>End-Date</Text>
        </View>}
      </View>
      {(portfolio.floor || portfolio.ceiling) && <View style={styles.infoWrapper}>
        {portfolio.floor && <View style={CommonStyle.flexOne}>
          <Text style={styles.textSubTitle}>{Utils.formatCurrency(1270.97)}</Text>
          <Text style={styles.textDescription}>Floor Price</Text>
        </View>}
        {portfolio.ceiling && <View style={CommonStyle.flexOne}>
          <Text style={styles.textSubTitle}>{Utils.formatCurrency(9278.97)}</Text>
          <Text style={styles.textDescription}>Ceiling Price</Text>
        </View>}
      </View>}
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { portfolio } = this.state;
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='ico'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='ICO Strengths'
        weaknessTitle='ICO Weaknesses'
      />
      {portfolio.icoStartDate && this.renderIcoInformation()}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  icoContainer: {
    padding: 20,
  },
  textSubTitle: {
    fontSize: 20,
    color: Constants.primaryColor,
  },
  textDescription: {
    fontSize: 10,
    color: Constants.primaryTextColor,
  },
  buttonWhitePaper: {
    backgroundColor: Constants.primaryColor,
    borderRadius: 2,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonWhitePaperTitle: {
    color: 'white',
    fontSize: 10,
  },
  infoWrapper: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
});