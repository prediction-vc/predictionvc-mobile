import React, { Component } from 'react';
import { StatusBar, Dimensions, Text, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigator } from './router/AppNavigator';
import EStyleSheet from 'react-native-extended-stylesheet';
import store from './store';

EStyleSheet.build({
  $primaryColor: '#21CE99',
  $primaryTextColor: '#000000',
  // $primaryTextColor: '#525266',
  $secondaryColor: '#8B8B9C',
  $inactiveColor: '#D3D3D8',
  $borderLightColor: '#CDCED3',
  $borderGrayColor: '#BCBBC1',
  $primaryTextOpacity: 0.5,
  $alertColor: '#FB0C49',

  $buttonHeight: 48,
  $normalButtonHeight: 32,

  $textSize: 16,
  $textSizeSmall: 12,
  $textSizeSmaller: 10,
  $textNavigationTitle: 18,
  $textPlaceholderSize: 14,
  $textSizeMedium: 14,
  $titleSize: 32,
  $textSizeBig: 34,

  $screenWidth: Dimensions.get('window').width,
  $screenHeight: Dimensions.get('window').height,
});

export default class App extends Component {
  componentDidMount () {
    StatusBar.setBarStyle('light-content', true);
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#27AD84');
    }
    Text.defaultProps.stype = {
      fontFamily: 'Roboto-Regular'
    }
  }

  render() {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    );
  }
}