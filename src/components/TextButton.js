import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { CommonStyle } from '../containers/styles';

export const TextButton = ({titleLabel, onPress, style, textStyle, numberOfLines = 1}) => {
  return (
    <TouchableOpacity style={[CommonStyle.center, style ? style : {}]} onPress={onPress}>
      <Text
        numberOfLines={numberOfLines}
        style={textStyle}
      >
        {titleLabel}
      </Text>
    </TouchableOpacity>
  );
};