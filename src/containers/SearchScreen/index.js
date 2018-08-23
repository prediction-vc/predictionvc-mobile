import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ActivityIndicator } from 'react-native';
import { CommonStyle } from '../styles';
import { NavigationBar } from '../../components';
import { LOCAL_CONFIG } from '../../../config';
import { InstantSearch } from 'react-instantsearch/native';
import { SearchBox } from './SearchBox';
import { Hits } from './Hits';
import { styles } from './style';
import { TransactionModal } from './TransactionModal';
import { Prediction } from '../../services';
import { Utils } from '../../utils';
import { Spinner } from "../../components";

class _SearchScreen extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      lastScreen: params ? params.lastNavigationName : null,
      loading: true,
      loadingPortfolio: false,
      visibleTransactionModal: false,
      selectedPortfolio: null,
    }
  }

  componentDidMount() {}

  onBackPressed = () => {
    const { lastScreen } = this.state;
    if (lastScreen) {
      this.props.navigation.navigate(lastScreen);
    }
  };

  onAddCurrency = async (currency) => {
    this.setState({ loadingPortfolio: true });
    const project = await Prediction.getProject(currency.name);
    this.setState({
      selectedPortfolio: project,
      loadingPortfolio: false,
    });
    setTimeout(() => this.setState({visibleTransactionModal: true}), 50);
  };

  onCloseTransactionModal = () => {
    this.setState({
      visibleTransactionModal: false,
      selectedPortfolio: null,
    });
  };

  onSearchStateChange = () => {
    const { loading } = this.state;
    if (loading) {
      this.setState({loading: false});
    }
  };

  onProjectPressed = async (currency) => {
    this.setState({ loadingPortfolio: true });
    try {
      const portfolio = await Prediction.getProject(currency.name);
      if (portfolio) {
        this.props.navigation.navigate('PortfolioDetailScreen', {portfolio});
      }
    } catch(error) {
      console.log('Get project detail error', JSON.stringify(error));
      Utils.showAlert('Prediction', 'Something went wrong. Please try again');
    }
    this.setState({ loadingPortfolio: false });
  };

  render() {
    const { loading, loadingPortfolio, visibleTransactionModal, selectedPortfolio, lastScreen } = this.state;
    return (
      <View style={CommonStyle.container}>
        <Spinner
          visible={loadingPortfolio}
          animation='fade'
        />
        {selectedPortfolio && <TransactionModal
          visible={visibleTransactionModal}
          portfolio={selectedPortfolio}
          onCloseTransaction={this.onCloseTransactionModal}
        />}
        <NavigationBar
          titleLabel='Search'
          backButton={!!lastScreen}
          onBackButtonPress={this.onBackPressed}
        />
        <View style={CommonStyle.container}>
          {loading && <View style={[CommonStyle.center, styles.loadingContainer]}>
            <ActivityIndicator size="large"/>
          </View>}
          <InstantSearch
            appId={LOCAL_CONFIG.ALGOLIA_APP_ID}
            apiKey={LOCAL_CONFIG.ALGOLIA_API_KEY}
            indexName="category_asc"
            onSearchStateChange={this.onSearchStateChange}
          >
            <View style={CommonStyle.flexRow}>
              <SearchBox />
            </View>
            <Hits
              onAdd={this.onAddCurrency}
              onProjectPressed={this.onProjectPressed}/>
          </InstantSearch>
        </View>
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export const SearchScreen = connect(mapStateToProps, mapDispatchToProps)(_SearchScreen);