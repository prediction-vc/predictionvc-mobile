import React, { Component } from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { CommonStyle } from '../styles'
import {styles} from './style'
import { NavigationBar } from '../../components'
import moment from 'moment'

class _NewsDetailScreen extends Component {
  // mark - Initialize Start
  constructor (props) {
    super(props)
    const {params} = props.navigation.state
    this.state = {
      article: params ? params.article : null
    }
  }

  componentDidMount () {
  }

  // mark - Actions
  onBackButtonPressed = () => {
    this.props.navigation.goBack()
  }

  render () {
    const {article} = this.state
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel={article ? article.title : 'News'}
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <ScrollView style={[CommonStyle.container, CommonStyle.flexCol, {marginLeft: 12, marginRight: 12}]}>
          <View style={[{justifyContent: 'center', alignItems: 'center'}, styles.marginTop]}>
            <Image
              style={[styles.newsImage]}
              source={{uri: article.image}}
              resizeMode="cover"
            />
          </View>
          <View style={styles.marginTop}>
            <Text style={[styles.newsTitle]}>{article.title}</Text>
          </View>
          <View style={[CommonStyle.container, CommonStyle.flexRow, styles.marginTop, {alignItems: 'center'}]}>
            <Text style={[styles.timeAgo]}>
              {moment(article.timestamp).fromNow()}
            </Text>
            <Text style={styles.tag}>
              {article.source}
            </Text>
            {
              article.locations.map((tag) => {
                return (<Text style={styles.tag} key={tag.name}>{tag.name}</Text>)
              })
            }
          </View>
          <Text style={styles.marginTop}>
            {article.text}
          </Text>
        </ScrollView>
      </View>
    )
  }
}

export const NewsDetailScreen = _NewsDetailScreen