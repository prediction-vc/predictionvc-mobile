import React, { Component } from 'react';
import { View, Image, Text, TextInput } from 'react-native';
import { CommonStyle } from '../containers/styles';

export const InputWithLabel = ({type, icon, title, value, placeHolder, returnKeyType, onChange}) => {

  if (!type) type= 'default';
  if (!value) value = '';
  if (!returnKeyType) returnKeyType = 'default';

  const onChangeText = (text) => {
    onChange(text);
  };

  return (
    <View style={[styles.wrapper, {height: title ? 68 : 40, marginVertical: title ? 16 : 0}]}>
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={[styles.inputWrapper, CommonStyle.center]}>
        {icon && <Image source={icon} style={styles.icon}/>}
        <TextInput
          style={styles.input}
          placeholder={placeHolder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={type === 'password'}
          keyboardType={type === 'email' ? 'email-address' : 'default'}
          placeholderTextColor={'rgba(255, 255, 255, 0.5)'}
          autoCapitalize='none'
          returnKeyType={returnKeyType}
          underlineColorAndroid={'rgba(0, 0, 0, 0)'}
        />
      </View>
      <View style={styles.border}/>
    </View>
  );
};

const styles = {
  wrapper: {
    flexDirection: 'column',
  },

  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
  },

  title: {
    fontSize: 16,
    color: 'white',
  },

  border: {
    backgroundColor: 'white',
    height: 1,
    width: '100%'
  },

  input: {
    flex: 1,
    height: 40,
    borderWidth: 0,
    fontSize: 16,
    marginLeft: 8,
    color: 'white',
  },

  icon: {
    width: 13,
    height: 13,
    marginRight: 8,
  }
};