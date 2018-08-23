import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CommonStyle } from '../styles';
import { styles } from './style';
import { Auth } from '../../services';
import { Constants, Utils } from '../../utils';
import { LogoWithTitle, InputWithLabel, RoundButton, ImageButton, Spinner } from '../../components';

class _ForgotPasswordScreen extends Component {

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state = {
      username: '',
      email: params.email ? params.email : '',
      password: '',
      confirmPassword: '',
      loading: false,
    }
  }

  componentDidMount() {
  }

  onRequestNewPassword = async () => {
    const { email } = this.state;
    if (!Utils.validateEmail(email)) {
      Utils.showAlert("Input Error", "Please input your email.");
      return;
    }

    try {
      this.setState({loading: true});
      const result = await Auth.recoveryPassword({ email });
      this.setState({loading: false});
      Utils.showAlert('Request has been submitted', 'Please check your email.');
      console.log("Recover password result:", JSON.stringify(result));
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
      Utils.showAlert("Failed to recover password", error);
    }
  };

  onNavigateBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {loading} = this.state;

    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          animation='fade'
        />
        <View style={[styles.navigationBar]}>
          <ImageButton
            image={require('../../assets/images/icon_back.png')}
            style={styles.navigationLeftButton}
            onPress={this.onNavigateBack}
          />
          <Text style={styles.navigationTitle} > Forgot password? </Text>
        </View>

        <KeyboardAwareScrollView style={styles.scrollContent}>

          <View style={[CommonStyle.center, styles.logoContainer]}>
            <LogoWithTitle imageSize={32} fontSize={26} />
          </View>

          <Text style={styles.description}>
            Enter your recovery Email address to reset your password
          </Text>

          <InputWithLabel
            type='email'
            title='Email'
            placeHolder='Type your email'
            value={this.state.email}
            onChange={ (text) => { this.setState({email: text})} }
          />

          <RoundButton
            size={Constants.buttonHeight}
            titleLabel='Request new password'
            buttonStyle={styles.forgotPasswordButton}
            textStyle={styles.activeButtonText}
            onPress={this.onRequestNewPassword}
          />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export const ForgotPasswordScreen = connect(null)(_ForgotPasswordScreen);