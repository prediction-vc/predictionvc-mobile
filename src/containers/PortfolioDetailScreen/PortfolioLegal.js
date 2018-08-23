import React, { Component } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { CommonStyle } from '../styles';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import { Constants } from '../../utils';

export class PortfolioLegal extends Component {

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
  renderLegal() {
    const { _category, _geo } = this.state.portfolio;
    return <View style={styles.legalContainer}>
      <Text style={styles.textSubTitle}>Legal Entity Information</Text>
      <View style={styles.legalWrapper}>
        <Text style={styles.textInfo}>{_geo.country}</Text>
        <Text style={styles.textInfo}>{_geo.state}</Text>
      </View>
      <View style={styles.legalWrapper}>
        <Text style={styles.textInfo}>NAICS: {_category.naicsCode}</Text>
        <Text style={styles.textInfo}>SIC: {_category.sicCode}</Text>
      </View>
      <View style={styles.legalWrapper}>
        <Text style={styles.textInfo}>{_category.industryGroup}</Text>
      </View>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='legal'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='Legal Strengths'
        weaknessTitle='Legal Weaknesses'
      />
      {this.renderLegal()}
    </ScrollView>
  }
}


const styles = StyleSheet.create({
  legalContainer: {
    padding: 20,
  },
  legalWrapper: {
    paddingVertical: 8,
  },
  textSubTitle: {
    paddingVertical: 15,
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  textInfo: {
    fontSize: 12,
    color: Constants.primaryTextColor,
  },

});