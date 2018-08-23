import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ScrollView } from 'react-native';
import { styles, graphScreenStyles } from './style';
import { CommonStyle } from '../styles';
import { Utils } from '../../utils';
import { ImageButton, ImagePlaceholder } from '../../components';
import { PortfolioGraph } from './PortfolioGraph';


class _GraphScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio
    };

    this.scrollTabBar = null;
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onGraphExpand = () => {
    this.props.navigation.navigate('GraphFullScreen', {portfolio: this.state.portfolio});
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  getCoinIcon() {
    const { portfolio } = this.state;
    if (portfolio.imageUrl) {
      return {uri: portfolio.imageUrl};
    }
    return require('../../assets/images/placeholder.png');
  }
  // mark - Handle App data end////////////

  // mark - Render components start
  renderNavigationBar() {
    const { portfolio } = this.state;
    return <View style={graphScreenStyles.navigationContainer}>
      <ImageButton
        image={require('../../assets/images/icon_back_green.png')}
        style={graphScreenStyles.navigationButton}
        onPress={this.onBackButtonPressed}
      />
      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <ImagePlaceholder style={{}} size={25} source={this.getCoinIcon()}/>
        <Text style={graphScreenStyles.navigationTitle}>{`${portfolio.name} / ${portfolio.symbol}`}</Text>
      </View>
      <View style={{width: 21}}/>
    </View>
  }

  renderHeaderInformation() {
    const { portfolio } = this.state;
    const { portfolioItems } = this.props.user;
    const { usdPrice, change } = portfolio;
    const readablePrice = usdPrice ? usdPrice : 0;
    const coinStatusIcon = change >= 0 ?
      require('../../assets/images/icon-rise.png') :
      require('../../assets/images/icon-fall.png');
    const item = portfolioItems.find(item => item.token === portfolio.symbol);
    return <View style={graphScreenStyles.headerInformation}>
      <View style={styles.changeWrapper}>
        <Text/>
        <View style={[CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={change >= 0 ? styles.coinPrice : styles.coinFall}> {Utils.formatCurrency(readablePrice)} </Text>
          <Image source={coinStatusIcon}/>
        </View>
      </View>
      <View style={styles.changeDescriptionWrapper}>
        <Text/>
        <Text style={styles.changeDescription}>PROFIT / LOSS</Text>
      </View>
      <View style={styles.changeWrapper}>
        <View>
          <Text style={{fontSize: 15}}>{Utils.toFixed(item.quantity, 2)}</Text>
          <Text style={styles.changeDescription}>HOLDING</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 15}}>{Utils.formatCurrency(readablePrice)}</Text>
          <Text style={styles.changeDescription}>MARKET PRICE</Text>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 15}}>{Utils.formatCurrency(item.quantity * readablePrice)}</Text>
          <Text style={styles.changeDescription}>NET COST</Text>
        </View>
      </View>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    return <View style={CommonStyle.container}>
      {this.renderNavigationBar()}
      {this.renderHeaderInformation()}
      <ScrollView>
        <PortfolioGraph
          {...this.props}
          onGraphExpand={this.onGraphExpand}
          statisticsLabel=' '
        />
      </ScrollView>
    </View>
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
  }
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export const GraphScreen = connect(mapStateToProps, mapDispatchToProps)(_GraphScreen);