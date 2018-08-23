import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CommonStyle } from '../containers/styles';

export const RoundButton = ({titleLabel, size, buttonStyle, textStyle, onPress, disabled=false}) => {

  buttonStyle = buttonStyle ? buttonStyle : styles.button;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[CommonStyle.center, buttonStyle, {height: size, borderRadius: size / 2, opacity: disabled ? 0.5 : 1}]}
    >
      <Text style={textStyle} > {titleLabel} </Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: 'white',
  }
};