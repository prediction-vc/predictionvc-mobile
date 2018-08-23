import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { Utils } from '../../utils';
import { setUserProfile } from '../../actions/user';
import { setProjectTokenInfo } from '../../actions/project';
import { NavigationBar, RoundButton, TextButton, Spinner } from '../../components';
import { Constants } from '../../utils/constants';
import { Prediction } from '../../services';
import _ from 'lodash';

let BarButtons = ['Buy', 'Sell', 'Follow'];

class _AddProjectScreen extends Component {
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      currencyData: params.data ? params.data : null,
      currencyQuantity: '',
      activeButtonIndex: 0,
      loading: false,
      isFollowing: false,
    };
  }

  componentDidMount() {
    this.checkCoinIsFollowing();
  }

  getTotalTransaction() {
    const { currencyData, currencyQuantity, activeButtonIndex } = this.state;
    const { portfolioItems } = this.props.user;
    const readablePrice = currencyData.usdPrice ? currencyData.usdPrice : 0;
    let item = portfolioItems.find(item => item.token === currencyData.symbol);
    if (!item) item = {quantity: 0};
    if (activeButtonIndex === 0) {
      return readablePrice * (item.quantity + Utils.parseFloat(currencyQuantity))
    } else if (activeButtonIndex === 1) {
      return readablePrice * (item.quantity - Utils.parseFloat(currencyQuantity))
    } else {
      return readablePrice * (item.quantity + Utils.parseFloat(currencyQuantity))
    }
  }

  async getUpdatedInformation(user) {
    const { portfolioItems } = user;
    this.setState({ portfolioItems });
    let tokenInformation = [];
    if (portfolioItems.length > 0) {
      const projectTokens = portfolioItems.map((item) => {
        return item.token;
      });
      tokenInformation = await Prediction.getProjectTokenInformation({symbol: projectTokens.toString()});
    }
    this.props.setUserProfile(user);
    this.props.setProjectTokenInfo(tokenInformation);
    this.checkCoinIsFollowing();
  }

  checkCoinIsFollowing() {
    const { following } = this.props.user;
    const { currencyData } = this.state;
    const isFollowing = following.find(coin => coin.token === currencyData.symbol);
    this.setState({isFollowing});
    debugger;
    if (isFollowing) {
      BarButtons[2] = 'UnFollow'
    } else {
      BarButtons[2] = 'Follow'
    }
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  onBarButtonPressed = (index) => {
    switch (index) {
      case 0: // Buy button
      case 1: // Sell button
      case 2: // Follow button
        this.setState({activeButtonIndex: index});
    }
  };

  onSaveCurrency = async () => {
    const { activeButtonIndex, currencyData, currencyQuantity, isFollowing } = this.state;
    if (activeButtonIndex < 2) {
      if (Utils.parseFloat(currencyQuantity) === 0) {
        Utils.showAlert('Input Error', 'Please input quantity.');
        return;
      }
      if (!currencyData.usdPrice) {
        Utils.showAlert('Error', 'Price is unknown.');
        return;
      }
      try {
        this.setState({ loading: true });
        const { user } = await Prediction.updateTokenToPortfolio({
          side: activeButtonIndex === 0 ? 'buy' : 'sell',
          symbol: currencyData.symbol,
          quantity: Utils.parseFloat(currencyQuantity)
        });
        await this.getUpdatedInformation(user);

      } catch (error) {
        console.log(error);
        Utils.showAlert('Error', JSON.stringify(error));
      }
      this.setState({ loading: false });
      this.onBackPressed();

    } else {
      if (isFollowing) {
        // UnFollow
        try {
          const result = await Prediction.unFollowProject({
            name:currencyData.name, symbol:currencyData.symbol, quantity: 0
          });
          if (result) await this.getUpdatedInformation(this.props.user);
        } catch (error) {
          console.log(error);
          Utils.showAlert('Error', JSON.stringify(error));
        }
      } else {
        // Follow
        try {
          const result = await Prediction.followProject({
            name: currencyData.name, symbol: currencyData.symbol
          });
          if (result) await this.getUpdatedInformation(this.props.user);
        } catch (error) {
          console.log(error);
          Utils.showAlert('Error', JSON.stringify(error));
        }

      }
    }
  };

  onChangeQuantity = (currencyQuantity) => {
    // const { currencyData, activeButtonIndex } = this.state;
    // const { portfolioItems } = this.props.user;
    // const item = portfolioItems.find(item => item.token === currencyData.symbol);
    // if (currencyData && activeButtonIndex === 1) { // Sell
    //   currencyQuantity = Math.min(currencyQuantity, item.quantity)
    // }
    this.setState({currencyQuantity});
  };

  renderButtonBar() {
    const { activeButtonIndex } = this.state;
    return <View style={styles.buttonBarContainer}>
      {
        _.range(0,3).map((index) =>
          <TextButton
            key={`project-handle-${BarButtons[index]}`}
            titleLabel={BarButtons[index]}
            style={index === activeButtonIndex ? styles.buyButton : styles.commonBarButton}
            textStyle={index === activeButtonIndex ? styles.buyButtonTitle : styles.commonBarButtonTitle}
            onPress={() => { this.onBarButtonPressed(index) }}
          />
        )
      }
    </View>
  }

  renderTokenInformation() {
    const { portfolioItems } = this.props.user;
    const { currencyData, currencyQuantity } = this.state;
    const item = portfolioItems.find(item => item.token === currencyData.symbol);
    return currencyData && <View style={CommonStyle.container}>
      <View style={styles.existTokenContainer}>
        <Text style={styles.existTokenText}>
          {`NUMBER OF TOKENS IN PORTFOLIO: ${item ? item.quantity : '0'}`}
        </Text>
      </View>

      <View style={[CommonStyle.flexRow, styles.infoContainer]}>
        <Text style={styles.headText}>Coin</Text>
        <Text style={[styles.contentText, styles.nameText]}>{currencyData.name}</Text>
      </View>

      <View style={[CommonStyle.flexRow, styles.infoContainer]}>
        <Text style={styles.headText}>Current price</Text>
        <Text style={styles.contentText}>
          {currencyData.usdPrice ? Utils.formatCurrency(currencyData.usdPrice) : 'UNKNOWN'}
        </Text>
      </View>

      <View style={[CommonStyle.flexRow, styles.infoContainer]}>
        <Text style={styles.headText}>Enter quantity</Text>
        <TextInput
          style={styles.quantityInput}
          value={currencyQuantity.toString()}
          keyboardType='numeric'
          multiline={false}
          placeholder='Enter quantity'
          onChangeText={this.onChangeQuantity}
          underlineColorAndroid={'rgba(0, 0, 0, 0)'}
        />
      </View>

      <View style={[CommonStyle.flexRow, styles.infoContainer]}>
        <Text style={styles.headText}>Total Transaction</Text>
        <Text style={styles.contentText}>
          { Utils.formatCurrency(this.getTotalTransaction()) }
        </Text>
      </View>
    </View>
  }

  renderSaveButton() {
    return <View style={styles.saveButtonContainer}>
      <RoundButton
        size={Constants.buttonHeight}
        titleLabel='Save'
        buttonStyle={styles.saveButton}
        textStyle={styles.saveButtonText}
        onPress={this.onSaveCurrency}
      />
    </View>
  }

  render() {
    const { loading } = this.state;
    const { user } = this.props;
    return (
      <View style={CommonStyle.container}>
        <Spinner visible={loading}/>
        <NavigationBar
          titleLabel='Add Transaction'
          backButton={false}
          leftButtonTitle='Cancel'
          onBackButtonPress={this.onBackPressed}
        />
        <KeyboardAwareScrollView style={[CommonStyle.container]}>
          { this.renderButtonBar() }
          { user && this.renderTokenInformation() }
        </KeyboardAwareScrollView>
        { this.renderSaveButton() }
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    tokenInformation: store.project.tokenInformation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (profile) => dispatch(setUserProfile(profile)),
    setProjectTokenInfo: (tokens) => dispatch(setProjectTokenInfo(tokens)),
  };
}

export const AddProjectScreen = connect(mapStateToProps, mapDispatchToProps)(_AddProjectScreen);