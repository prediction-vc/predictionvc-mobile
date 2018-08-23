import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ListView, TouchableOpacity, Linking, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { NavigationBar, RoundButton } from '../../components';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { LOCAL_CONFIG } from '../../../config';
import { Constants } from '../../utils';
import { Auth } from '../../services';
import { clearUserInformation } from '../../actions/user';

const SettingsList = [
  {
    title: 'PORTFOLIO',
    type: 'tab',
    destination: 'PortfolioNavigator',
    navigationParams: {},
    style: 'main'
  },
  {
    title: 'NEWS',
    type: 'tab',
    destination: 'NewsNavigator',
    navigationParams: {},
    style: 'main'
  },
  {
    title: 'SEARCH',
    type: 'tab',
    destination: 'SearchNavigator',
    navigationParams: {},
    style: 'main'
  },
  {
    title: 'LEADERBOARDS',
    type: 'navigation',
    destination: 'LeaderboardScreen',
    navigationParams: {},
    style: 'main'
  },
  {
    title: 'REWARDS',
    type: 'navigation',
    destination: 'RewardScreen',
    navigationParams: {},
    style: 'main'
  },
  {
    title: 'NOTIFICATIONS',
    type: 'navigation',
    destination: 'NotificationScreen',
    navigationParams: {},
    badge: 0,
    style: 'main',
    separator: true
  },
  {
    title: 'About',
    type: 'link',
    destination: LOCAL_CONFIG.APP_CONTACT,
    style: 'subitem',
  },
  {
    // icon: require('../../assets/images/icon-edit-column.png'),
    title: 'Profile & Settings',
    type: 'navigation',
    destination: 'EditColumnScreen',
    navigationParams: {},
    style: 'subitem',
  },
  // {
  //   icon: require('../../assets/images/icon-faq.png'),
  //   title: 'FAQ',
  //   type: 'link',
  //   destination: LOCAL_CONFIG.APP_FAQ,
  // },
  {
    // icon: require('../../assets/images/icon-tour.png'),
    title: 'Help',
    type: 'navigation',
    destination: 'Onboarding',
    navigationParams: { isTour: true },
    style: 'subitem',
    separator: true,
  },
  {
    // icon: require('../../assets/images/icon-terms-service.png'),
    title: 'Terms of Service',
    type: 'link',
    destination: LOCAL_CONFIG.APP_TERMS_SERVICE,
    style: 'subitem',
  },
  {
    // icon: require('../../assets/images/icon-privacy-policy.png'),
    title: 'Privacy Policy',
    type: 'link',
    destination: LOCAL_CONFIG.APP_PRIVACY_POLICY,
    style: 'subitem',
    separator: true,
  },
  {
    // icon: require('../../assets/images/icon-terms-service.png'),
    title: 'Log Out',
    type: 'action',
    destination: 'logoutAction',
    style: 'subitem',
  },
];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class _SettingsScreen extends Component {
  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {}
  }

  // mark - Button Action start

  onSettingsItem = (rowData) => {
    const { navigation, screenProps } = this.props;
    if (rowData.type === 'navigation') {
      navigation.navigate(rowData.destination, rowData.navigationParams);
    } else if (rowData.type === 'tab') {
      screenProps.rootNavigation.navigate(rowData.destination);
    } else if (rowData.type === 'link') {
      navigation.navigate('NewsDetailScreen', { article: {
        title: rowData.title,
        link: rowData.destination
      }});
    } else if (rowData.type === 'action') {
      if (rowData.destination === 'logoutAction')
        this.onLogout()
    }
  };

  onLogout = () => {
    Alert.alert(
      `Logout`,
      'Are you sure you want to logout?',
      [
        {text: 'Cancel', onPress: () => console.log('Alert OK Pressed'), style: 'cancel'},
        {text: 'Logout', onPress: this.onActionLogout.bind(this), style: 'ok'},
      ],
      { cancelable: true }
    );
  };

  onActionLogout = async () => {
    try {
      await Auth.logout();
      this.props.clearUserInformation();
      let screenProps = this.props.screenProps;
      while (screenProps.screenProps) {
        screenProps = screenProps.screenProps;
      }
      const { rootNavigation } = screenProps;
      rootNavigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' })],
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // mark - Button Action end  ////////////

  renderRowData(rowData) {
    const { notifications } = this.props.user;

    return <View>
      <TouchableOpacity
        style={[styles.settingCell, CommonStyle.flexRow]}
        onPress={() => this.onSettingsItem(rowData)}
      >
        {/*<View style={[styles.columnIconContainer, CommonStyle.center]}>*/}
        {/*<Image source={rowData.icon}/>*/}
        {/*</View>*/}
        <Text style={rowData.style === 'main' ? styles.mainCell: styles.subCell}>
          {rowData.title}
        </Text>
        {
          rowData.title === 'NOTIFICATIONS' && notifications && notifications.length > 0 && <View style={styles.badge}>
            <Text style={styles.badgeText}>{notifications.length}</Text>
          </View>
        }
      </TouchableOpacity>
      {rowData.separator && <View style={styles.separator}/>}
    </View>
  }

  render() {
    const { user } = this.props;
    return (
      <View style={CommonStyle.container}>
        <NavigationBar titleLabel='Settings'/>
        <ListView
          style={CommonStyle.container}
          dataSource={ds.cloneWithRows(SettingsList)}
          renderRow={this.renderRowData.bind(this)}
        />
        {/*<View style={styles.logoutContainer}>*/}
          {/*<RoundButton*/}
            {/*size={Constants.buttonHeight}*/}
            {/*titleLabel='Logout'*/}
            {/*buttonStyle={styles.logoutButton}*/}
            {/*textStyle={styles.logoutButtonText}*/}
            {/*onPress={this.onLogout}*/}
          {/*/>*/}
        {/*</View>*/}
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    clearUserInformation: () => dispatch(clearUserInformation()),
  };
}

export const SettingsScreen = connect(mapStateToProps, mapDispatchToProps)(_SettingsScreen);