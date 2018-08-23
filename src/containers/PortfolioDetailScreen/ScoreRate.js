import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { CommonStyle, ScreenWidth } from '../styles';
import { Utils, Constants } from '../../utils';

export class ScoreRate extends Component {

  static propTypes = {
    scoreType: PropTypes.string,
  };

  static defaultProps = {
    scoreType: 'financial',
  };

  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
    };
  }
  componentDidMount() {}
  componentWillReceiveProps(nextProps) {}

  // mark - Handle App data start
  getScoreLabel() {
    const { scoreType } = this.props;
    if (scoreType === 'financial') {
      return 'Financial Score';
    } else if (scoreType === 'ico') {
      return 'ICO Score';
    } else if (scoreType === 'news') {
      return 'News Score';
    } else if (scoreType === 'engineering') {
      return 'Engineering Score';
    } else if (scoreType === 'team') {
      return 'Team Score';
    } else if (scoreType === 'social') {
      return 'Social Score';
    } else if (scoreType === 'legal') {
      return 'Legal Score';
    }
  }

  getScore() {
    const { scoreType } = this.props;
    const { displayScores } = this.state.portfolio;
    if (scoreType === 'financial') {
      const score = displayScores.community ? displayScores.community.average : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'ico') {
      const score = displayScores.machine ? displayScores.machine.ico : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'news') {
      const score = displayScores.machine ? displayScores.machine.news : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'engineering') {
      const score = displayScores.machine ? displayScores.machine.engineering : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'team') {
      const score = displayScores.machine ? displayScores.machine.team : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'social') {
      const score = displayScores.machine ? displayScores.machine.social : 'Unknown';
      return Utils.toFixed(score, 2);
    } else if (scoreType === 'legal') {
      const score = displayScores.community ? displayScores.community.legal : 'Unknown';
      return Utils.toFixed(score, 2);
    }
  }

  getCommunityRating() {
    const { ratings } = this.state.portfolio;
    let count = 0, totalRating = 0;
    ratings.map( rating => {
      if (rating.rateVision) {
        count++;
        totalRating += rating.rateVision;
      }
    });
    if (count === 0) count = 1;

    return totalRating / count;
  }

  getMachineRating() {
    const { ratings } = this.state.portfolio;
    let count = 0, totalRating = 0;
    ratings.map( rating => {
      if (rating.rateValuation) {
        count++;
        totalRating += rating.rateValuation;
      }
    });
    if (count === 0) count = 1;

    return totalRating / count;
  }

  calculateBarFromScore(score) {
    return 160 + (ScreenWidth - 160) / 10 * score;
  }
  // mark - Handle App data end

  // mark - Render components start
  renderScore() {
    return <View style={[styles.scoreContainer, CommonStyle.flexRow, CommonStyle.center]}>
      <Text style={[styles.textLabel, CommonStyle.flexOne]}>{this.getScoreLabel()}</Text>
      <Text style={styles.textScore}>{this.getScore()}</Text>
    </View>
  }

  renderRating() {
    const { displayScores } = this.state.portfolio;
    const communityRating = this.getCommunityRating();
    const machineRating = this.getMachineRating();
    return <View>
      <View style={[CommonStyle.flexRow, styles.ratingBar, CommonStyle.center, {width: this.calculateBarFromScore(communityRating)}]}>
        <Text style={{fontSize: 12, color: 'white', flex: 1}}>Community Rating</Text>
        <Text style={{fontSize: 16, color: 'white', paddingLeft: 10}}>{Utils.toFixed(communityRating, 2)}</Text>
      </View>
      <View style={[CommonStyle.flexRow, styles.ratingBar, CommonStyle.center, {width: this.calculateBarFromScore(machineRating)}]}>
        <Text style={{fontSize: 12, color: 'white', flex: 1}}>Machine Rating</Text>
        <Text style={{fontSize: 16, color: 'white', paddingLeft: 10}}>{Utils.toFixed(machineRating, 2)}</Text>
      </View>
    </View>
  }
  // mark - Render components end

  render() {
    const { portfolio } = this.state;
    return <View style={styles.container}>
      {portfolio.displayScores && this.renderScore()}
      {portfolio.ratings && this.renderRating()}
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  scoreContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  textLabel: {
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  textScore: {
    fontSize: 25,
    color: Constants.primaryTextColor,
  },
  ratingBar: {
    marginVertical: 5,
    paddingVertical: 8,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: Constants.primaryColor
  }
});