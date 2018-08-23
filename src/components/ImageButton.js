import React, { Component } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { CommonStyle } from '../containers/styles';

export const ImageButton = ({image, onPress, style, imageStyle}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[style, CommonStyle.center]}>
      <Image source={image} style={imageStyle}/>
    </TouchableOpacity>
  );
};