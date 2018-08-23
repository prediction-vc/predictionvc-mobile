import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';

export const LogoWithTitle = ({imageSize, fontSize}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={require('../assets/images/logo.png')} style={{width:imageSize, height:imageSize}}/>
      <Text style={[styles.text, {fontSize}]}>PredictionVC</Text>
    </View>
  );
};

const styles = {
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginLeft: 20
  }
};