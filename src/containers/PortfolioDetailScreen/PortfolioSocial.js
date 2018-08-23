import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../styles';
import { Constants } from '../../utils';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';
import { PortfolioGraph } from './PortfolioGraph';

const SocialType = {
  FaceBook: 0,
  Twitter: 1,
  Youtube: 2,
  Github: 3,
  Reddit: 4,
};

export class PortfolioSocial extends Component {

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
  // mark - Initialize end  ////////////

  onClickSocial(socialType) {
    const { portfolio } = this.state;
    let article = {title: portfolio.name};
    switch (socialType) {
      case SocialType.FaceBook:
        article.link = `https://www.facebook.com/${portfolio._facebook ? portfolio._facebook.handle : ''}`;
        break;
      case SocialType.Twitter:
        article.link = portfolio.twitterUrl;
        break;
      case SocialType.Youtube:
        article.link = portfolio.youtubeUrl;
        break;
      case SocialType.Github:
        article.link = `https://github.com/${portfolio.githubUrl}`;
        break;
      case SocialType.Reddit:
        article.link = portfolio.redditUrl;
        break;
    }
    console.log('Social link:', article.link);
    article.link && this.props.navigation.navigate('NewsDetailScreen', { article });
  }

  // mark - Render components start
  renderSocial() {
    const { _facebook, twitterUrl, youtubeUrl, githubUrl, redditUrl } = this.state.portfolio;
    return <View style={styles.socialContainer}>
      <Text style={styles.textSubTitle}>Social Accounts</Text>
      <View style={styles.socialButtonWrapper}>
        {_facebook && <View style={[CommonStyle.flexOne, CommonStyle.center]}>
          <TouchableOpacity
            style={[styles.socialButton, CommonStyle.center]}
            onPress={() => this.onClickSocial(SocialType.FaceBook)}
          >
            <Image source={require('../../assets/images/icon-fb-green.png')}/>
          </TouchableOpacity>
        </View>}

        {twitterUrl && <View style={[CommonStyle.flexOne, CommonStyle.center]}>
          <TouchableOpacity
            style={[styles.socialButton, CommonStyle.center]}
            onPress={() => this.onClickSocial(SocialType.Twitter)}
          >
            <Image source={require('../../assets/images/icon-tw-green.png')}/>
          </TouchableOpacity>
        </View>}

        {youtubeUrl && <View style={[CommonStyle.flexOne, CommonStyle.center]}>
          <TouchableOpacity
            style={[styles.socialButton, CommonStyle.center]}
            onPress={() => this.onClickSocial(SocialType.Youtube)}
          >
            <Image source={require('../../assets/images/icon-youtube-green.png')}/>
          </TouchableOpacity>
        </View>}

        {githubUrl && <View style={[CommonStyle.flexOne, CommonStyle.center]}>
          <TouchableOpacity
            style={[styles.socialButton, CommonStyle.center]}
            onPress={() => this.onClickSocial(SocialType.Github)}
          >
            <Image source={require('../../assets/images/icon-github-green.png')}/>
          </TouchableOpacity>
        </View>}

        {redditUrl && <View style={[CommonStyle.flexOne, CommonStyle.center]}>
          <TouchableOpacity
            style={[styles.socialButton, CommonStyle.center]}
            onPress={() => this.onClickSocial(SocialType.Reddit)}
          >
            <Image source={require('../../assets/images/icon-reddit-green.png')}/>
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='social'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='Social Strengths'
        weaknessTitle='Social Weaknesses'
      />
      {this.renderSocial()}
      <PortfolioGraph
        {...this.props}
        statisticsLabel='Social Activity'
      />
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  socialContainer: {
    padding: 20,
  },
  socialButtonWrapper: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textSubTitle: {
    paddingVertical: 15,
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  textName: {
    fontSize: 15,
    color: Constants.primaryTextColor,
  },
  textPosition: {
    fontSize: 10,
    color: Constants.primaryTextColor,
  },
  imagePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: Constants.inactiveColor
  }

});