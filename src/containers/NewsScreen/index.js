import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, View, Text, ListView, TouchableOpacity, Linking } from 'react-native'
import { Prediction } from '../../services'
import { CommonStyle } from '../styles'
import { styles } from './style'
import { setProjectTokenNews } from '../../actions/project'
import { NavigationBar, Spinner } from '../../components'
import moment from 'moment'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

class _NewsScreen extends Component {

  // mark - Initialize Start
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      news: props.news,
      symbols: [],
      tokenInformation: []
    }

    this.onPressNewsItem = this.onPressNewsItem.bind(this)
  }

  componentDidMount () {
    this.getNews().then()
  }

  componentWillReceiveProps (nextProps) {}

  async getNews () {
    try {
      const news = await Prediction.getNews(Prediction.getNewsSources())
      this.props.setProjectTokenNews(news.articles)
      let symbols = []
      news.articles.map((article) => {
        if (symbols.indexOf(article.currency) < 0) {
          symbols.push(article.currency)
        }
      })
      this.setState({loading: false})
      const tokenInformation = await Prediction.getProjectTokenInformation({symbol: symbols.toString()})
      this.setState({tokenInformation})
    } catch (error) {
      console.log(`ERROR: ${JSON.stringify(error)}`)
    }
    this.setState({loading: false})
  }

  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onMoreButtonPressed = () => {
    // alert('More button pressed');
  }

  onPressNewsItem = (newsItem) => {
    this.props.navigation.navigate('NewsDetailScreen', {article: newsItem})
  }

  getTimeDifference (startTime, endTime = moment()) {
    // }
    return `${moment(startTime).format('MMMM Do YYYY h.mm A')}`
  }

  // mark - Button Action end  ////////////

  // mark - Render components start
  renderNewsRow (rowData) {
    return <TouchableOpacity
      style={[CommonStyle.flexRow, styles.newsItemContainer]}
      onPress={() => {this.onPressNewsItem(rowData)}}
    >
      <Image style={styles.newsImage} size={45} source={{uri: rowData.image}}/>
      <View style={[CommonStyle.flexOne, styles.newsContent]}>
        <Text style={styles.newsTitle} numberOfLines={1}>{rowData.title}</Text>
        <View style={[CommonStyle.flexRow, styles.newsDescriptionContainer]}>
          <Text style={styles.newsDescription} numberOfLines={1}>{rowData.source}</Text>
          <View style={styles.newsDot}/>
          <Text style={[styles.newsDescription, CommonStyle.flexOne]}
                numberOfLines={1}>{this.getTimeDifference(rowData.timestamp)}</Text>
        </View>
      </View>
      <View style={styles.borderBottomView}/>
    </TouchableOpacity>
  }

  renderNewsContent () {
    const {news} = this.props

    return <ListView
      style={CommonStyle.container}
      dataSource={ds.cloneWithRows(news)}
      renderRow={this.renderNewsRow.bind(this)}
      enableEmptySections
    />
  }

  // mark - Render Components end  ////////////

  render () {
    const {loading} = this.state
    return (
      <View style={CommonStyle.container}>
        <Spinner
          visible={loading}
          animation='fade'
        />
        <NavigationBar
          titleLabel='News'
          backButton={false}
        />
        {this.renderNewsContent()}
      </View>
    )
  }
}

function mapStateToProps (store) {
  return {
    news: store.project.news
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setProjectTokenNews: (news) => dispatch(setProjectTokenNews(news))
  }
}

export const NewsScreen = connect(mapStateToProps, mapDispatchToProps)(_NewsScreen)