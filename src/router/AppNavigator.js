import React, { Component } from 'react';
import { Image, Platform } from 'react-native';
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import { Constants } from '../utils';
import {
  SplashScreen,
  Onboarding,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  PortfolioScreen,
  NewsScreen,
  NewsDetailScreen,
  SearchScreen,
  AddProjectScreen,
  SettingsScreen,
  EditColumnScreen,
  PortfolioDetailScreen,
  GraphScreen,
  GraphFullScreen,
  LeaderboardScreen,
  RewardScreen,
  NotificationScreen,
  ExchangeScreen,
} from '../containers';

export const SearchNavigator = StackNavigator({
  SearchScreen: { screen: SearchScreen },
  AddProjectScreen: {screen: AddProjectScreen},
  PortfolioDetailScreen: {screen: PortfolioDetailScreen},
  NewsDetailScreen: {screen: NewsDetailScreen},
}, {
  initialRouteName: 'SearchScreen',
  headerMode: 'none',
});

export const SettingsNavigator = StackNavigator({
  SettingsScreen: { screen: SettingsScreen },
  EditColumnScreen: {screen: EditColumnScreen},
  Onboarding: {screen: Onboarding},
  NewsDetailScreen: {screen: NewsDetailScreen},
  LeaderboardScreen: {screen: LeaderboardScreen},
  RewardScreen: {screen: RewardScreen},
  NotificationScreen: {screen: NotificationScreen},
}, {
  initialRouteName: 'SettingsScreen',
  headerMode: 'none',
});

export const NewsNavigator = StackNavigator({
  NewsScreen: { screen: NewsScreen },
  NewsDetailScreen: { screen: NewsDetailScreen },
}, {
  initialRouteName: 'NewsScreen',
  headerMode: 'none',
});

export const PortfolioNavigator = StackNavigator({
  PortfolioScreen: { screen: PortfolioScreen },
  ExchangeScreen: { screen: ExchangeScreen },
  AddProjectScreen: {screen: AddProjectScreen},
  PortfolioDetailScreen: {screen: PortfolioDetailScreen},
  GraphScreen: {screen: GraphScreen},
  GraphFullScreen: {screen: GraphFullScreen, navigationOptions: {
    tabBarVisible: false
  }},
  NewsDetailScreen: {screen: NewsDetailScreen},
}, {
  initialRouteName: 'PortfolioScreen',
  headerMode: 'none',
});

export const MainNavigator = TabNavigator({
  PortfolioNavigator: { screen: PortfolioNavigator },
  NewsNavigator: { screen: NewsNavigator },
  SearchNavigator: { screen: SearchNavigator },
  SettingsNavigator: { screen: ({ navigation, screenProps }) => <SettingsNavigator screenProps={{ screenProps, rootNavigation: navigation }}/> },
}, {
  initialRouteName: 'PortfolioNavigator',
  cardStyle:{ backgroundColor:'red' },
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconImage;
      if (routeName === 'PortfolioNavigator') {
        iconImage = require('../assets/images/tab-summary.png');
        // iconImage = focused ? require('../assets/images/icon-graph-active.png') : require('../assets/images/icon-graph.png');
      } else if (routeName === 'NewsNavigator') {
        iconImage = require('../assets/images/tab-news.png');
        // iconImage = focused ? require('../assets/images/icon-news-active.png') : require('../assets/images/icon-news.png');
      } else if (routeName === 'SearchNavigator') {
        iconImage = require('../assets/images/tab-search.png');
        // iconImage = focused ? require('../assets/images/icon-search-active.png') : require('../assets/images/icon-search.png');
      } else if (routeName === 'SettingsNavigator') {
        iconImage = require('../assets/images/tab-menu.png');
        // iconImage = focused ? require('../assets/images/icon-settings-active.png') : require('../assets/images/icon-settings.png');
      }

      return <Image source={iconImage}/>
    },
  }),
  tabBarOptions: {
    activeTintColor: Constants.primaryColor,
    inactiveTintColor: Constants.inactiveColor,
    showLabel: false,
    style: {
      backgroundColor: '#FFF',
      borderTopWidth: 0,
      height: Constants.tabBarHeight,

      ...Platform.select({
        android: {
          elevation: 10
        },
        ios: {
          shadowColor: '#000000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowRadius: 5,
          shadowOpacity: 0.3
        }
      })
    }
  },
  lazy: true,
  tabBarPosition: 'bottom',
  tabBarComponent: TabBarBottom,
  animationEnabled: true,
});

export const AuthNavigator = StackNavigator({
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPasswordScreen: { screen: ForgotPasswordScreen },
  MainNavigator: { screen: ({ navigation, screenProps }) => <MainNavigator screenProps={{ screenProps, rootNavigation: navigation }}/> },
}, {
  initialRouteName: 'LoginScreen',
  headerMode: 'none',
});

export const AppNavigator = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  Onboarding: { screen: Onboarding },
  AuthNavigator: { screen: ({ navigation, screenProps }) => <AuthNavigator screenProps={{ screenProps, rootNavigation: navigation }}/> },
  MainNavigator: { screen: ({ navigation, screenProps }) => <MainNavigator screenProps={{ screenProps, rootNavigation: navigation }}/> },
}, {
  initialRouteName: 'SplashScreen',
  // initialRouteName: 'Onboarding',
  headerMode: 'none',
});