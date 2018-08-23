import React, { Component } from 'react';
import {
  connectSearchBox,
} from 'react-instantsearch/connectors';
import { TextInput } from 'react-native';

export const SearchBox = connectSearchBox(({ refine, currentRefinement }) => {

  const styles = {
    height: 36,
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#f3f3f4',
    color: 'rgba(82, 82, 102, 0.5)',
    flex: 1
  };

  return (
    <TextInput
      style={styles}
      onChangeText={text => refine(text)}
      value={currentRefinement}
      placeholder={'Search Blockchain Project'}
      clearButtonMode={'always'}
      spellCheck={false}
      autoCorrect={false}
      autoCapitalize={'none'}
      underlineColorAndroid={'rgba(0, 0, 0, 0)'}
    />
  );
});