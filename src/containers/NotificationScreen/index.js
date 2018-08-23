import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ListView, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { NavigationBar } from '../../components';
import { Utils } from '../../utils';
import moment from 'moment';
import { LOCAL_CONFIG } from "../../../config";

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class _NotificationScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.onPressNotificationItem = this.onPressNotificationItem.bind(this);
  }
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onMoreButtonPressed = () => {
    // alert('More button pressed');
  };

  onPressNotificationItem = (notificationItem) => {
    this.props.navigation.navigate('NewsDetailScreen', { article: {
      title: Utils.capitalize(notificationItem.mobileRedirectView),
      link: `${LOCAL_CONFIG.SERVER_URL}${notificationItem.webRedirectLink}`
    }});
  };

  // mark - Button Action end  ////////////

  // mark - Render components start
  renderNotificationRow(rowData) {
    return <TouchableOpacity
      style={styles.notificationItemContainer}
      onPress={() => {this.onPressNotificationItem(rowData)}}
    >
      <Image style={styles.notificationImage} source={require('../../assets/images/icon-notification.png')}/>
      <View style={[CommonStyle.flexOne, styles.notificationContent]}>
        <Text style={styles.notificationTitle} numberOfLines={0}>{rowData.displayText}</Text>
        <Text style={styles.notificationTime} numberOfLines={1}>{moment(rowData.timestamp).fromNow()}</Text>
      </View>
    </TouchableOpacity>;
  }

  // mark - Render Components end  ////////////

  render() {
    const { notifications } = this.props;
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel='Notifications'
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <ListView
          style={CommonStyle.container}
          dataSource={ds.cloneWithRows(notifications)}
          renderRow={this.renderNotificationRow.bind(this)}
          enableEmptySections
        />
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    notifications: store.user.notifications
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const NotificationScreen = connect(mapStateToProps, mapDispatchToProps)(_NotificationScreen);