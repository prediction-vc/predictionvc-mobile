import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ScrollView } from 'react-native';
import { CommonStyle, ScreenWidth } from '../styles';
import { styles } from './style';
import { NavigationBar } from '../../components';
import { Utils } from '../../utils';

class _RewardScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  // mark - Button Action end  ////////////

  // mark - Render components start
  renderRankStatus() {
    const { user, allRanks } = this.props;
    let visibleRank = 0;
    allRanks.map((rank, index) => {
      if (rank.name === user.rank) visibleRank = index;
    });
    const imageIndex = visibleRank > 2 ? visibleRank - 2 : visibleRank;
    let offset = visibleRank === 6 ? 8 : ScreenWidth / 10;
    console.log(visibleRank);
    return <View style={styles.rankContainer}>
      {
        allRanks.map((rank, index) => {
          if (visibleRank >= 3) {
            if (index > 1) {
              return <View key={`rewards-rank-${index}`} style={[CommonStyle.flexOne, CommonStyle.center]}>
                <Image style={index <= visibleRank ? styles.activeRankImage : styles.inactiveRankImage} source={rank.image}/>
                <Text style={index <= visibleRank ? styles.activeRankText : styles.inactiveRankText}>{rank.name}</Text>
              </View>
            }
          } else {
            if (index < 5) {
              return <View key={`rewards-rank-${index}`} style={[CommonStyle.flexOne, CommonStyle.center]}>
                <Image style={index <= visibleRank ? styles.activeRankImage : styles.inactiveRankImage} source={rank.image}/>
                <Text style={index <= visibleRank ? styles.activeRankText : styles.inactiveRankText}>{rank.name}</Text>
              </View>
            }
          }
        })
      }
      <View style={styles.rankBar}/>
      <View style={[styles.rankActiveBar, {width: ScreenWidth / 5 * (imageIndex + 1) - offset}]}/>
      <Image style={[styles.iconTriangle, {left: ScreenWidth / 5 * (imageIndex + 1) - offset}]}
             source={require('../../assets/images/icon-triangle.png')}/>
    </View>
  }

  renderTotalPoint() {
    const { scoreLedger } = this.props.user;
    let totalPoint = 0;
    scoreLedger.map(score => {
      totalPoint += score.amount;
    });
    return <View style={[styles.totalPointContainer, CommonStyle.center]}>
      <Text style={styles.textTotalPoint}>Total Points</Text>
      <Text style={styles.textTotalPointValue}>{Utils.toFixed(totalPoint)}</Text>
    </View>
  }

  renderMe(days, type) {
    const { user } = this.props;
    const { leaderboard } = user;
    let textLeaderboard = '', score = 0;
    if (days === 7) {
      if (type === 'trading') {
        textLeaderboard = '7 Days Trading Leaderboard';
        score = leaderboard.performance7d;
      } else {
        textLeaderboard = '7 Days Researcher Leaderboard';
        score = leaderboard.totalContribution7d;
      }
    } else {
      if (type === 'trading') {
        textLeaderboard = '30 Days Trading Leaderboard';
        score = leaderboard.performance30d;
      } else {
        textLeaderboard = '30 Days Researcher Leaderboard';
        score = leaderboard.totalContribution30d;
      }
    }
    return <View style={[styles.userContainer]}>
      <Text style={styles.textLeaderboard}>{textLeaderboard}</Text>
      <View style={[CommonStyle.flexRow, styles.center]}>

        <Image style={styles.userImage} source={{uri: user.profileImage}}/>
        <View style={[CommonStyle.flexOne, styles.userContent, {justifyContent: 'center'}]}>
          <Text style={styles.userName} numberOfLines={1}>{user.name}</Text>
        </View>
        <View style={CommonStyle.center}>
          <Text style={styles.userScore}>{Utils.toFixed(score, 2)}</Text>
        </View>
      </View>
    </View>;
  }

  renderEarnMore() {
    return <View style={styles.earnMoreContainer}>
      <Text style={styles.textEarnMore}>Earn more Points (Coming soon)</Text>
    </View>
  }
  // mark - Render Components end  ////////////

  render() {
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel='REWARDS'
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        {this.renderRankStatus()}
        {this.renderTotalPoint()}
        <ScrollView>
          {this.renderMe(7, 'trading')}
          {this.renderMe(7, 'contribution')}
          {this.renderMe(30, 'trading')}
          {this.renderMe(30, 'contribution')}
          {this.renderEarnMore()}
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    allRanks: store.allRanks
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const RewardScreen = connect(mapStateToProps, mapDispatchToProps)(_RewardScreen);