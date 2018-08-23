import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { CommonStyle } from '../styles';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import { PortfolioGraph } from './PortfolioGraph';

export class PortfolioEngineering extends Component {

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
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='engineering'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='Engineering Strengths'
        weaknessTitle='Engineering Weaknesses'
      />
      <PortfolioGraph
        {...this.props}
        statisticsLabel='GitHUB Activity'
      />
    </ScrollView>
  }
}