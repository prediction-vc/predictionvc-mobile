import React, { Component } from 'react';
import { Text, View, Platform } from 'react-native';
import { Utils, Constants } from '../utils';
import { ImageButton } from './ImageButton';
import { TextButton } from './TextButton';

export const NavigationBar = ({titleLabel, backButton, leftButtonTitle, rightButtonTitle, onBackButtonPress, onRightButtonPress, style, titleStyle}) => {
  let leftButton, rightButton;

  if (!backButton) {
    if (leftButtonTitle) {
      leftButton = <TextButton
        titleLabel={leftButtonTitle}
        onPress={onBackButtonPress ? onBackButtonPress : () => {}}
        textStyle={[styles.navigationButton, styles.textButton]}
      />
    } else {
      leftButton = <View/>;
    }
  } else {
    leftButton = <ImageButton
      image={require('../assets/images/icon_back_green.png')}
      style={styles.navigationButton}
      onPress={onBackButtonPress ? onBackButtonPress : () => {}}
    />;
  }

  if (rightButtonTitle) {
    if (rightButtonTitle === 'more_icon') {
      rightButton = <ImageButton
        image={require('../assets/images/icon_more.png')}
        style={styles.navigationButton}
        onPress={onRightButtonPress ? onRightButtonPress : () => {}}
      />
    } else {
      rightButton = <TextButton
        titleLabel={rightButtonTitle}
        onPress={onRightButtonPress ? onRightButtonPress : () => {}}
        textStyle={[styles.navigationButton, styles.textButton]}
      />
    }
  } else {
    rightButton = <View/>;
  }

  if (!style) style = {};

  return (
    <View style={[styles.navigationContainer, style]}>
      { leftButton }
      <Text style={[styles.navigationTitle, titleStyle ? titleStyle : {}]} >
        {Platform.OS === 'android' ? Utils.makeSpacingText(titleLabel.toUpperCase()) : titleLabel.toUpperCase()}
      </Text>
      { rightButton }
    </View>
  );
};

const styles = {
  navigationContainer: {
    marginTop: 20,
    marginHorizontal: 15,
    height: Constants.navigationBarSize,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navigationButton: {
    height: Constants.navigationBarSize,
  },

  textButton: {
    fontSize: Constants.textSize,
    color: Constants.primaryColor,
    textAlign: 'center',
    lineHeight: Constants.navigationBarSize,
  },

  navigationTitle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 30,
    right: 30,
    lineHeight: Constants.navigationBarSize,
    // fontSize: Constants.textNavigationTitle,
    fontSize: 10,
    color: Constants.primaryTextColor,
    letterSpacing: 3,
    textAlign: 'center',
  },
};