import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CommonStyle } from '../styles';
import { styles, pickerStyles } from './style';
import { NavigationBar, PickerSelect, RoundButton, Spinner, ImagePlaceholder } from '../../components';
import { Auth, Prediction } from '../../services';
import { Utils } from '../../utils';
import { LOCAL_CONFIG } from '../../../config';
import { setUserProfile } from '../../actions/user';
import { setProjectTokenInfo } from '../../actions/project';

class _ExchangeScreen extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      connectionIndex: 0,
      apiKey: '',
      apiSecret: '',
      apiUid: '',
      apiPassPhrase: '',
      syncIndex: 0,
      importedTokens: [],
      tokenInformation: [],
    };
  }

  checkConnectionInputValid() {
    const { exchangeConnections } = this.props;
    const { connectionIndex, apiKey, apiSecret, apiUid, apiPassPhrase } = this.state;
    const selectedConnection = connectionIndex > 0 ? exchangeConnections[connectionIndex - 1] : null;

    if (selectedConnection.apiKey && !apiKey) {
      return false;
    }
    if (selectedConnection.apiSecret && !apiSecret) {
      return false;
    }
    if (selectedConnection.passphrase && !apiPassPhrase) {
      return false;
    }
    if (selectedConnection.uid && !apiUid) {
      return false;
    }

    return true;
  }

  getPortfolioToken(tokenName) {
    const { tokenInformation } = this.state;
    return tokenInformation.find(token => token.symbol === tokenName);
  }

  async updateInformation() {
    const profile = await Auth.getProfile();
    this.props.setUserProfile(profile);
  }

  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onBackButtonPressed = () => {
    this.props.navigation.goBack();
  };

  onApiKeyChanged = (apiKey) => {
    this.setState({ apiKey });
  };

  onApiSecretChanged = (apiSecret) => {
    this.setState({ apiSecret });
  };

  onApiUidChanged = (apiUid) => {
    this.setState({ apiUid });
  };

  onApiPassPhraseChanged = (apiPassPhrase) => {
    this.setState({ apiPassPhrase });
  };

  onSynchronize = async () => {
    const { exchangeConnections } = this.props;
    const { connectionIndex, apiKey, apiSecret, apiUid, apiPassPhrase } = this.state;
    const selectedConnection = connectionIndex > 0 ? exchangeConnections[connectionIndex - 1] : null;
    if (!this.checkConnectionInputValid()) {
      Utils.showAlert('Input Error', 'Please input required fields');
      return;
    }
    this.setState({ loading: true });
    try {
      const { balance } = await Prediction.importExchangeTokens({
        exchange: selectedConnection.name,
        publicKey: apiKey,
        privateKey : apiSecret,
        uid : apiUid,
        passphrase : apiPassPhrase
      });
      console.log(balance);
      const tokens = balance.map(item => item.currency);
      let tokenInformation = await Prediction.getProjectTokenInformation({symbol: tokens.toString()});
      tokenInformation = tokenInformation.filter(item => {
        if(item && item.usdPrice) { return item }
      });
      this.setState({ tokenInformation, importedTokens: balance, loading: false, syncIndex: connectionIndex });
    } catch (error) {
      console.log(JSON.stringify(error));
      this.setState({ loading: false });
    }
  };

  onImportTokens = async () => {
    const { exchangeConnections } = this.props;
    const { connectionIndex, apiKey, apiSecret, apiUid, apiPassPhrase, tokenInformation, importedTokens } = this.state;
    const selectedConnection = connectionIndex > 0 ? exchangeConnections[connectionIndex - 1] : null;
    const portfolio = tokenInformation.map(token => {
      const connection = importedTokens.find(item => item.currency === token.symbol);
      return {
        balance : connection.balance,
        currency: connection.currency,
        price: token.usdPrice
      }
    });
    this.setState({ loading: true });
    try {
      const result = await Prediction.addExchangePortfolio({
        publicKey: apiKey,
        privateKey: apiSecret,
        uid : apiUid,
        passphrase: apiPassPhrase,
        exchange: selectedConnection.name,
        portfolio: portfolio
      });
      console.log(JSON.stringify(result));
      if (result.success) {
        await this.updateInformation();
        this.onBackButtonPressed();
      } else {
        Utils.showAlert('Prediction', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.log(JSON.stringify(error));
      Utils.showAlert('Prediction', 'Something went wrong. Please try again.');
    }
    this.setState({ loading: false });
  };

  onChangeExchangeConnection(connectionIndex) {
    if (LOCAL_CONFIG.ENV === 'dev') {
      const apiKey = connectionIndex === 1 ? '7531b41abe634466b60eb4f678db6836' : connectionIndex === 4 ? 'd1cfa62b884730d311aa12a6d79236ff' : '';
      const apiSecret = connectionIndex === 1 ? 'f349e0972cab487290e9ce71131dae02' : connectionIndex === 4 ? 'j7iUiTliH9FwV0wAQkoVpf2T/3XiJbN52gT18sjQU8DQON71sbWJzwuHEIlIOhmsPcLdjR0LxBpUKHzz87ar2A==' : '';
      const apiPassPhrase = connectionIndex === 4 ? 'lyj03et7hbi' : '';
      this.setState({connectionIndex, apiKey, apiSecret, apiPassPhrase});
    } else {
      this.setState({connectionIndex});
    }
  };
  // mark - Button Action end  ////////////

  // mark - Render components start
  renderExchangeSelection() {
    const { exchangeConnections } = this.props;
    const { connectionIndex, apiKey, apiSecret, apiUid, apiPassPhrase, syncIndex } = this.state;
    const selectedConnection = connectionIndex > 0 ? exchangeConnections[connectionIndex - 1] : null;
    return <View style={styles.selectionContainer}>
      <Text style={styles.textHead}>Import Your Exchange Account</Text>
      <Text style={styles.textSelectDescription} numberOfLines={0}>
        PredictionVC lets you monitor your crypto portfolio performance automatically by synchronising your transactions with the exchanges and wallets you use.
      </Text>
      <PickerSelect
        placeholder={{
          label: 'Choose an Exchange',
          value: 0,
        }}
        items={exchangeConnections}
        onValueChange={this.onChangeExchangeConnection.bind(this)}
        style={{...pickerStyles}}
        value={connectionIndex}
      />
      {selectedConnection && <View style={styles.infoContainer}>
        <Text style={styles.infoText} numberOfLines={0}>Visit {selectedConnection.name}, go to settings and generate a read-only API key and paste it below. We use the key to request your tokens from the {selectedConnection.name} exchange.</Text>
        <Text style={styles.warnText}>For your own security make sure the key is read-only!</Text>
        { selectedConnection.apiKey && <TextInput
          placeholder='Insert API Key'
          placeholderColor='rgba(0, 0, 0, 0.5)'
          style={styles.connectionInput}
          onChangeText={this.onApiKeyChanged}
          value={apiKey}
        /> }
        { selectedConnection.apiSecret && <TextInput
          placeholder='Insert API Secret'
          placeholderColor='rgba(0, 0, 0, 0.5)'
          style={styles.connectionInput}
          onChangeText={this.onApiSecretChanged}
          value={apiSecret}
        /> }
        { selectedConnection.passphrase && <TextInput
          placeholder='Insert Passphrase'
          placeholderColor='rgba(0, 0, 0, 0.5)'
          style={styles.connectionInput}
          onChangeText={this.onApiPassPhraseChanged}
          value={apiPassPhrase}
        /> }
        { selectedConnection.uid && <TextInput
          placeholder='Insert UID/Username'
          placeholderColor='rgba(0, 0, 0, 0.5)'
          style={styles.connectionInput}
          onChangeText={this.onApiUidChanged}
          value={apiUid}
        /> }
        <View style={CommonStyle.center}>
          {syncIndex !== connectionIndex && <RoundButton
            size={40}
            titleLabel='Synchronize'
            buttonStyle={styles.btnSynchronize}
            textStyle={styles.btnSynchronizeTitle}
            onPress={this.onSynchronize}
          />}
          {syncIndex === connectionIndex && this.renderBalances()}
          {syncIndex === connectionIndex && <RoundButton
            size={40}
            titleLabel='Import Tokens'
            buttonStyle={styles.btnSynchronize}
            textStyle={styles.btnSynchronizeTitle}
            onPress={this.onImportTokens}
          />}
        </View>
      </View>}
    </View>
  }

  renderBalances() {
    const { importedTokens } = this.state;
    return <View style={styles.tokenGrid}>
      <View style={styles.tokenHeadWrapper}>
        <Text style={[CommonStyle.flexOneAndHalf, styles.tokenHead]}/>
        <Text style={[CommonStyle.flexThree, styles.tokenHead]}>Name</Text>
        <Text style={[CommonStyle.flexThree, styles.tokenHead]}>Symbol</Text>
        <Text style={[CommonStyle.flexThree, styles.tokenHead]}>Amount</Text>
        <Text style={[CommonStyle.flexThree, styles.tokenHead]}>Price</Text>
      </View>
      { importedTokens.map(token => this.renderTokenRow(token)) }
    </View>
  }

  renderTokenRow(rowData) {
    const token = this.getPortfolioToken(rowData.currency);
    const readablePrice = token.usdPrice ? token.usdPrice : 0;
    return <View style={styles.tokenWrapper} key={`token-${rowData.currency}`}>
      <View style={CommonStyle.flexOneAndHalf}><ImagePlaceholder size={25} style={styles.tokenImage} source={{uri: `${token.imageUrl}`}}/></View>
      <Text style={[CommonStyle.flexThree, styles.tokenText]}>{token.name}</Text>
      <Text style={[CommonStyle.flexThree, styles.tokenText]}>{token.symbol}</Text>
      <Text style={[CommonStyle.flexThree, styles.tokenText]}>{Utils.toFixed(rowData.balance, 4)}</Text>
      <Text style={[CommonStyle.flexThree, styles.tokenText]}>{Utils.formatCurrency(readablePrice)}</Text>
    </View>
  }
  // mark - Render Components end  ////////////

  render() {
    const { loading } = this.state;
    return (
      <View style={CommonStyle.container}>
        <Spinner
          visible={loading}
          animation='fade'
        />
        <NavigationBar
          titleLabel='EXCHANGE ACCOUNT'
          backButton={true}
          onBackButtonPress={this.onBackButtonPressed}
        />
        <KeyboardAwareScrollView style={styles.scrollContent}>
          {this.renderExchangeSelection()}
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

function mapStateToProps(store) {
  const { user, exchangeConnections, project } = store;
  return {
    user,
    exchangeConnections,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setUserProfile: (profile) => dispatch(setUserProfile(profile)),
    setProjectTokenInfo: (tokens) => dispatch(setProjectTokenInfo(tokens)),
  };
}

export const ExchangeScreen = connect(mapStateToProps, mapDispatchToProps)(_ExchangeScreen);