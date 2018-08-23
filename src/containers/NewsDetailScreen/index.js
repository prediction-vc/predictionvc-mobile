import React, { Component } from 'react';
import { View, WebView, ActivityIndicator } from 'react-native';
import { CommonStyle } from '../styles';
import { NavigationBar } from '../../components';

class _NewsDetailScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      loading: false,
      article: params ? params.article : null
    }
  }

  componentDidMount() {
  }

  // mark - Actions
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onLoadStart = () => {
    this.setState({ loading: true });
  };

  onLoadEnd = () => {
    this.setState({ loading: false });
  };

  render() {
    const { article, loading } = this.state;
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel={article ? article.title : 'News'}
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <View style={CommonStyle.container}>
          <View style={[CommonStyle.absoluteFill, CommonStyle.center]}>
            {loading && <ActivityIndicator size='large'/>}
          </View>
          <WebView
            scalesPageToFit
            source={{uri: article.link}}
            style={[CommonStyle.flexOne, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}
            onLoadStart={this.onLoadStart}
            onLoadEnd={this.onLoadEnd}
            onError={this.onLoadEnd}
          />
        </View>
      </View>
    );
  }
}

export const NewsDetailScreen = _NewsDetailScreen;