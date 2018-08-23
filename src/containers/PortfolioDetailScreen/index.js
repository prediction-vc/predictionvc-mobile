import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import { styles } from './style';
import { CommonStyle } from '../styles';
import { NavigationBar, ScrollableTabBar, RoundButton, ImagePlaceholder } from '../../components';
import { setProjectOpinions } from '../../actions/project';
import { Utils, Constants } from '../../utils';
import { Prediction } from '../../services';
import { PortfolioSummary } from './PortfolioSummary';
import { PortfolioFinancial } from './PortfolioFinancial';
import { PortfolioIco } from './PortfolioIco';
import { PortfolioNews } from './PortfolioNews';
import { PortfolioEngineering } from './PortfolioEngineering';
import { PortfolioTeam } from './PortfolioTeam';
import { PortfolioSocial } from './PortfolioSocial';
import { PortfolioLegal } from './PortfolioLegal';
import { PortfolioData } from './PortfolioDataRoom';
import { TransactionModal } from '../SearchScreen/TransactionModal';


class _PortfolioDetailScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
      loadingComments: true,
      visibleTransactionModal: false,
    };

    this.scrollTabBar = null;
  }

  componentDidMount() {
    this.loadOpinions().then();
  }

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onCloseTransactionModal = () => {
    this.setState({
      visibleTransactionModal: false,
    });
  };

  onAdd = () => {
    this.setState({
      visibleTransactionModal: true,
    });
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  async loadOpinions() {
    const result = await Prediction.getOpinionsFromProjectId(this.state.portfolio._id);
    if (result.success) {
      this.props.setProjectOpinions(result.opinions);
    }
  }

  getCoinIcon() {
    const { portfolio } = this.state;
    if (portfolio.imageUrl) {
      return {uri: portfolio.imageUrl};
    }
    return require('../../assets/images/placeholder.png');
  }
  // mark - Handle App data end////////////

  // mark - Render components start
  renderHeaderInformation() {
    const { portfolio } = this.state;
    const { usdPrice, change } = portfolio;
    const readablePrice = usdPrice ? usdPrice : 0;
    const coinStatusIcon = change >= 0 ?
      require('../../assets/images/icon-rise.png') :
      require('../../assets/images/icon-fall.png');
    return <View style={styles.headerInformation}>
      <View style={[CommonStyle.flexRow, CommonStyle.center]}>
        <ImagePlaceholder style={{}} size={50} source={this.getCoinIcon()}/>
        <Text style={styles.coinTitle} numberOfLines={2}>{`${portfolio.name} / ${portfolio.symbol}`}</Text>
      </View>
      <View style={styles.addButtonWrapper}>
        <RoundButton
          size={40}
          titleLabel='Buy / Sell'
          buttonStyle={styles.buttonAdd}
          textStyle={styles.buttonAddTitle}
          disabled={!portfolio.usdPrice}
          onPress={this.onAdd}
        />
      </View>
      <View style={styles.changeWrapper}>
        <Text style={styles.coinPrice}>{Utils.formatCurrency(readablePrice)}</Text>
        <View style={[CommonStyle.flexRow, CommonStyle.center]}>
          <Text style={change >= 0 ? styles.coinPrice : styles.coinFall}> {change}% </Text>
          <Image source={coinStatusIcon}/>
        </View>
      </View>
      <View style={styles.changeDescriptionWrapper}>
        <Text style={styles.changeDescription}>CURRENT PRICE</Text>
        <Text style={styles.changeDescription}>24 HOURS CHANGE</Text>
      </View>
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { visibleTransactionModal, portfolio } = this.state;
    return <View style={CommonStyle.container}>
      <NavigationBar
        titleLabel={''}
        backButton={true}
        onBackButtonPress={this.onBackButtonPressed}
      />
      <TransactionModal
        visible={visibleTransactionModal}
        portfolio={portfolio}
        onCloseTransaction={this.onCloseTransactionModal}
      />
      {this.renderHeaderInformation()}
      <ScrollableTabView
        style={styles.scrollTabView}
        initialPage={0}
        renderTabBar={() => <ScrollableTabBar
          ref={this.scrollTabBar}
          activeTextColor={Constants.primaryColor}
          inactiveTextColor={Constants.primaryTextColor}
          style={styles.scrollTabBar}
          underlineStyle={styles.scrollTabBarUnderline}
          textStyle={{fontSize: 10}}
        />}
      >
        <PortfolioSummary tabLabel='SUMMARY' {...this.props}/>
        <PortfolioFinancial tabLabel='FINANCIAL' {...this.props}/>
        <PortfolioIco tabLabel='ICO' {...this.props}/>
        <PortfolioData tabLabel='DATA ROOM' {...this.props}/>
        <PortfolioNews tabLabel='NEWS & SENTIMENT' {...this.props}/>
        <PortfolioEngineering tabLabel='ENGINEERING' {...this.props}/>
        <PortfolioTeam tabLabel='TEAM' {...this.props}/>
        <PortfolioSocial tabLabel='SOCIAL' {...this.props}/>
        <PortfolioLegal tabLabel='LEGAL' {...this.props}/>
      </ScrollableTabView>
    </View>
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    tokenInformation: store.project.tokenInformation,
    graphTimePeriods: store.graphTimePeriods,
    displayColumns: store.selectedCurrencyColumns,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProjectOpinions: (opinions) => dispatch(setProjectOpinions(opinions)),
  };
}

export const PortfolioDetailScreen = connect(mapStateToProps, mapDispatchToProps)(_PortfolioDetailScreen);