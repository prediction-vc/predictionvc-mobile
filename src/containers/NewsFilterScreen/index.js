import React, { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { Prediction } from '../../services/Prediction'
import { CommonStyle } from '../styles'
import { NavigationBar } from '../../components'
import { styles } from './style'

class _NewsFilterScreen extends Component {

  // mark - Initialize Start
  constructor (props) {
    super(props)
    this.state = {
      newsSources: []
    }
  }

  async componentDidMount() {
    const newsSources = await Prediction.getNewsSources();
    this.setState({ newsSources: newsSources });
  }

  onPressItem = (newsSource) => {
    newsSource.active = !newsSource.active
    this.setState({
      newsSources: this.state.newsSources.slice(),
    });
    Prediction.setNewsSources(this.state.newsSources)
  }

  onBackButtonPressed = () => {
    this.props.navigation.goBack()
  }

  getSource (rowData) {
    return rowData.active ? require('../../assets/images/icon-circle-checked.png') : require('../../assets/images/icon-circle-unchecked.png')
  }

  render () {
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel='News Sources'
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <FlatList
          data={this.state.newsSources}
          renderItem={({item}) =>
            <TouchableOpacity
              style={styles.notificationItemContainer}
              onPress={() => {this.onPressItem(item)}}
            >
              <View style={[CommonStyle.flexOne, styles.notificationContent, CommonStyle.flexRow]}>
                <Image
                  source={this.getSource(item)}
                />
                <Text style={styles.newsSourceTitle} numberOfLines={0}>{item.name} {item.active}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={item => item.name}
        />
      </View>
    )
  }
}

export const NewsFilterScreen = _NewsFilterScreen