import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ListView, TouchableOpacity, Linking } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { Leaderboard } from '../../services';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { Spinner, RoundButton } from '../../components';
import { Utils, Constants } from '../../utils';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

export class LeaderboardTable extends Component {

  constructor(props) {
    super(props);
    const { leaderboardType } = props;
    this.state = {
      loading: true,
      users: [],
      me: null,
      days: '30d',              // '7d' or '30d'
      leaderboardType,     // 0: Trading, 1: Contribution
    };

    this.users7d = [];
    this.users30d = [];
    this.onPressUserItem = this.onPressUserItem.bind(this);
  }

  componentDidMount() {
    this.getLeaderboard().then();
  }

  updateLeaderboard() {
    const { days } = this.state;
    const { user } = this.props;
    let users = [], me = null;
    if (days === '7d') {
      if (this.users7d.length > 0) users = this.users7d;
    } else if (days === '30d') {
      if (this.users30d.length > 0) users = this.users30d;
    }
    if (users.length > 0) {
      users.map(userObject => {
        if (userObject._id === user._id) {
          me = userObject;
        }
      });
      this.setState({users, me});
    }
    if (users.length === 0) {
      this.setState({loading: true});
      this.getLeaderboard().then();
    }
  }

  async getLeaderboard() {
    const { leaderboardType, days } = this.state;
    const { getTrading, getContribution } = Leaderboard;
    const { user } = this.props;
    try {
      const userObjects = leaderboardType === 0 ? await getTrading(days) : await getContribution(days);
      let me = null;
      let users = [];
      Object.keys(userObjects).map((key) => {
        const userObject = userObjects[key];
        if (parseInt(key) >= 0 && userObject) {
          if (userObject._id === user._id) {
            me = userObject;
          }
          users.push(userObject);
        }
      });

      if (days === '7d') this.users7d = users;
      else this.users30d = users;
      this.setState({ users, me });
    } catch (error) {
      console.log(`ERROR: ${JSON.stringify(error)}`);
    }
    this.setState({loading: false});
  }

  onPressUserItem = (user) => {
    console.log(JSON.stringify(user));
  };

  onPressDay = (days) => {
    this.setState({ days }, () => {
      this.updateLeaderboard();
    });
  };

  renderDaysSelection() {
    const { days } = this.state;
    return <View style={[CommonStyle.flexRow, styles.daysContainer]}>
      <View style={[CommonStyle.flexOne, CommonStyle.center]}>
        <RoundButton
          titleLabel='MONTH'
          size={25}
          buttonStyle={days === '30d' ? styles.activeDayButton : styles.inactiveDayButton}
          textStyle={days === '30d' ? styles.activeDayButtonText : styles.inactiveDayButtonText}
          onPress={() => this.onPressDay('30d')}
        />
      </View>
      <View style={[CommonStyle.flexOne, CommonStyle.center]}>
        <RoundButton
          titleLabel='WEEK'
          size={25}
          buttonStyle={days === '7d' ? styles.activeDayButton : styles.inactiveDayButton}
          textStyle={days === '7d' ? styles.activeDayButtonText : styles.inactiveDayButtonText}
          onPress={() => this.onPressDay('7d')}
        />
      </View>
    </View>
  }

  renderUserRow(rowData) {
    const { leaderboardType, days } = this.state;
    const { user } = this.props;
    let score = 0;
    if (leaderboardType === 0) {
      score = days === '7d' ? rowData.performance7d : rowData.performance30d;
    } else {
      score = days === '7d' ? rowData.totalContribution7d : rowData.totalContribution30d;
    }
    score = Utils.parseFloat(score);
    return <TouchableOpacity
      style={[CommonStyle.flexRow, styles.userContainer, styles.center, {backgroundColor: rowData._id === user._id ? 'rgba(0, 0, 0, 0.05)' : 'white'} ]}
      onPress={() => {this.onPressUserItem(rowData)}}
    >
      <Text style={styles.userRank}>{rowData.index}.</Text>
      <Image style={styles.userImage} source={{uri: rowData.profileImage}}/>
      <View style={[CommonStyle.flexOne, styles.newsContent]}>
        <Text style={styles.userName} numberOfLines={1}>{rowData.name}</Text>
        <Text style={styles.userPosition} numberOfLines={1}>{rowData.rank}</Text>
      </View>
      <View style={CommonStyle.center}>
        <Text style={styles.userScore}>{Utils.toFixed(score, 2)}</Text>
      </View>
    </TouchableOpacity>;
  }

  renderUsers(users) {
    return <ListView
      style={CommonStyle.container}
      dataSource={ds.cloneWithRows(users)}
      renderRow={this.renderUserRow.bind(this)}
      enableEmptySections
    />
  }

  renderMe() {
    const { leaderboardType, days, me } = this.state;
    let score = 0;
    if (leaderboardType === 0) {
      score = days === '7d' ? me.performance7d : me.performance30d;
    } else {
      score = days === '7d' ? me.totalContribution7d : me.totalContribution30d;
    }
    score = Utils.parseFloat(score);

    return <View style={[CommonStyle.flexRow, styles.userContainer, styles.center, {backgroundColor: 'rgba(0, 0, 0, 0.05)', marginVertical: 15} ]}>
      <Text style={styles.userRank}>{me.index}.</Text>
      <Image style={styles.userImage} source={{uri: me.profileImage}}/>
      <View style={[CommonStyle.flexOne, styles.newsContent]}>
        <Text style={styles.userName} numberOfLines={1}>{me.name}</Text>
        <Text style={styles.userPosition} numberOfLines={1}>{me.rank}</Text>
      </View>
      <View style={CommonStyle.center}>
        <Text style={styles.userScore}>{Utils.toFixed(score, 2)}</Text>
      </View>
    </View>;
  }

  render() {
    const { loading, me, users } = this.state;
    return <View style={CommonStyle.flexOne}>
      <Spinner
        visible={loading}
        animation='fade'
        overlayColor='rgba(0, 0, 0, 0)'
      />
      {this.renderDaysSelection()}
      {me && this.renderMe()}
      {this.renderUsers(users)}
    </View>
  }
}
