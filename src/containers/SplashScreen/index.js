import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { CommonStyle } from '../styles';
import { Preferences, Auth, COMPLETE_TUTORIAL } from '../../services';
import Orientation from 'react-native-orientation';

class _SplashScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Orientation.lockToPortrait();
    this.checkNavigation().then();
  }

  async checkNavigation() {
    if (!await Preferences.getItem(COMPLETE_TUTORIAL)) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Onboarding' })],
      }));
      return;
    }
    if (!await Auth.isAuthenticated()) {
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' })],
      }));
      return;
    }
    this.props.navigation.dispatch(NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'MainNavigator' })],
    }));
  }

  render() {
    return (
      <View style={[CommonStyle.container, CommonStyle.center]}>
        <Image
          source={require('../../assets/images/logo_big.png')}
        />
      </View>
    );
  }
}

export const SplashScreen = connect(null)(_SplashScreen);