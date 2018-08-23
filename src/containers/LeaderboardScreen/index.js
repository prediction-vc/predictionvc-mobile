import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Leaderboard } from '../../services';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { NavigationBar, LeaderboardTabBar } from '../../components';
import { Utils, Constants } from '../../utils';
import { LeaderboardTable } from './LeaderboardTable';

class _LeaderboardScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
  }
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };
  // mark - Button Action end  ////////////

  render() {
    const { user } = this.props;
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel='LEADERBOARD'
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <ScrollableTabView
          style={styles.scrollTabView}
          initialPage={0}
          renderTabBar={() => <LeaderboardTabBar
            activeTextColor={Constants.primaryTextColor}
            inactiveTextColor={Constants.primaryTextColor}
            style={styles.scrollTabBar}
            underlineStyle={styles.scrollTabBarUnderline}
            textStyle={{fontSize: 12, letterSpacing: 2}}
          />}
        >
          <LeaderboardTable
            tabLabel='Trading'
            leaderboardType={0}
            user={user}
          />

          <LeaderboardTable
            tabLabel='Contribution'
            leaderboardType={1}
            user={user}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const LeaderboardScreen = connect(mapStateToProps, mapDispatchToProps)(_LeaderboardScreen);