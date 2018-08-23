import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { CommonStyle } from '../styles';
import { Constants } from '../../utils';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import { TextButton } from '../../components';
import { PortfolioGraph } from './PortfolioGraph';
import moment from 'moment';

export class PortfolioNews extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  getNewsCalendarDate(date) {
    return moment(date).calendar(null, {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    });
  }

  getNewsIcon(url) {
    // if (url) {
    //   return {uri: url};
    // }
    return require('../../assets/images/placeholder.png');
  }
  // mark - Initialize end  ////////////

  onPressNews = (data) => {
    this.props.navigation.navigate('NewsDetailScreen', { article:
      {
        title: this.state.portfolio.name,
        link: data.url
      }
    });
  };

  // mark - Render components start
  renderNews() {
    const { news } = this.state.portfolio;
    return <View style={styles.newsContainer}>
      <Text style={[styles.textLabel, {paddingVertical: 15}]}>Recent News</Text>
      {
        news.map((data, index) => {
          return <View style={styles.newsWrapper} key={`portfolio-news-${index}`}>
            <View style={CommonStyle.flexRow}>
              <Image style={styles.newsImage} source={this.getNewsIcon(data.url)}/>
              <View style={CommonStyle.flexOne}>
                <Text style={styles.newsTitle} numberOfLines={2}>{data.title}</Text>
                <Text style={styles.newsDate}>{this.getNewsCalendarDate(data.created_at)}</Text>
              </View>
            </View>
            <TextButton
              titleLabel='Read More'
              style={{paddingTop: 5, width: 65}}
              textStyle={styles.moreButtonTitle}
              onPress={() => this.onPressNews(data)}
            />
          </View>
        })
      }
      <Text style={[styles.textLabel, {paddingTop: 20}]}>News Performance</Text>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { portfolio } = this.state;
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='news'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='News Strengths'
        weaknessTitle='News Weaknesses'
      />
      {portfolio.news && this.renderNews()}
      <PortfolioGraph
        {...this.props}
        statisticsLabel=' '
      />
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  newsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20
  },
  newsWrapper: {
    paddingVertical: 8,
  },
  newsImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textLabel: {
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  newsTitle: {
    fontSize: 14,
    color: Constants.primaryTextColor,
  },
  newsDate: {
    paddingVertical: 4,
    fontSize: 8,
    color: Constants.primaryTextColor,
  },
  newsDescription: {
    paddingVertical: 4,
    fontSize: 12,
    color: Constants.primaryTextColor,
  },
  moreButtonTitle: {
    color: Constants.primaryColor,
    fontSize: 12,
  }
});