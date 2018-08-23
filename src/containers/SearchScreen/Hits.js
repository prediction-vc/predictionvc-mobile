import React, { Component } from 'react';
import { connectInfiniteHits } from 'react-instantsearch/connectors';
import { Image, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { RoundButton, ImagePlaceholder } from '../../components';
import { Constants, Utils } from '../../utils';
import { CommonStyle } from '../styles';

const hitStyles = {
  flatList: {
    marginTop: 8,
    marginBottom: 36,
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height : 76,
    padding: 15,
    position: 'relative',
  },

  borderView: {
    position: 'absolute',
    left: 15,
    right: 15,
    bottom: 0,
    height: 0.5,
    backgroundColor: Constants.primaryColor
  },

  textName: {
    fontSize: Constants.textSize,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },

  textPrice: {
    fontSize: Constants.textSizeMedium,
    color: 'rgba(82, 82, 102, 0.5)',
    paddingHorizontal: 10,
  },

  buttonAdd: {
    borderColor: Constants.primaryTextColor,
    borderWidth: 1,
    width: 90,
  },

  buttonAddTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: Constants.primaryTextColor
  }
};

export const Hits = connectInfiniteHits(({ hits, hasMore, refine, onAdd, onProjectPressed }) => {

  /* if there are still results, you can
  call the refine function to load more */
  const onEndReached = function() {
    if (hasMore) {
      refine();
    }
  };

  return (
    <FlatList
      style={hitStyles.flatList}
      data={hits}
      onEndReached={onEndReached}
      keyExtractor={(item, index) => `${item.objectID}-${index}`}
      renderItem={({ item }) => {
        const image = item.imageUrl ?
          {uri: item.imageUrl} :
          require('../../assets/images/placeholder.png');
        return (
          <View style={hitStyles.container}>
            <TouchableOpacity
              style={[CommonStyle.flexOne, CommonStyle.flexRow]}
              onPress={() => onProjectPressed(item)}
            >
              <ImagePlaceholder style={{}} size={44} source={image}/>
              <View style={CommonStyle.flexOne}>
                <Text style={hitStyles.textName}>
                  {item.name}
                </Text>
                <Text style={hitStyles.textPrice}>
                  {item.usdPrice ? Utils.formatCurrency(item.usdPrice) : 'Unknown Price'}
                </Text>
              </View>
            </TouchableOpacity>
            <RoundButton
              size={Constants.normalButtonHeight}
              titleLabel='Add'
              buttonStyle={hitStyles.buttonAdd}
              textStyle={hitStyles.buttonAddTitle}
              disabled={!item.usdPrice}
              onPress={() => onAdd(item)}
            />

            <View style={hitStyles.borderView}/>
          </View>
        );
      }}
    />
  );
});