import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { Utils } from '../../utils';
import { Auth } from "../../services";
import { LOCAL_CONFIG } from "../../../config";
import { LogoWithTitle, InputWithLabel, RoundButton, TextButton, Spinner } from '../../components';

class _LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: LOCAL_CONFIG.ENV === 'dev' ? 'mobileuser@mobile.com' : '',
      password: LOCAL_CONFIG.ENV === 'dev' ? 'mobileuser123' : '',
      loading: false,
    }
  }

  componentDidMount() {
  }

  onSignIn = async () => {
    const {email, password} = this.state;
    if (!Utils.validateEmail(email)) {
      Utils.showAlert("Input Error", "Please input your email.");
      return;
    } else if (!Utils.validatePassword(password, password)) {
      Utils.showAlert("Input Error", "Please input your password correctly.");
      return;
    }

    try {
      this.setState({loading: true});
      const result = await Auth.signin({email, password});
      this.setState({loading: false});
      console.log("Sign Ip result:", JSON.stringify(result));

      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainNavigator' })],
      }));


    } catch (error) {
      this.setState({loading: false});
      console.log(error);
      Utils.showAlert("Sign In Error", error);
    }

  };

  onSignUp = () => {
    this.props.navigation.navigate({ routeName: 'RegisterScreen' });
  };

  onForgotPassword = () => {
    this.props.navigation.navigate('ForgotPasswordScreen', { email: this.state.email} );
  };

  render() {
    const {email, password, loading} = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={loading}
          animation='fade'
        />

        <View style={[CommonStyle.center, styles.logoContainer]}>
          <LogoWithTitle imageSize={37} fontSize={30} />
        </View>

        <KeyboardAwareScrollView style={styles.scrollContent}>
          <View>
            <InputWithLabel
              type='email'
              icon={require('../../assets/images/icon_user.png')}
              title='Email'
              placeHolder='Type your email'
              value={email}
              onChange={ (text) => { this.setState({email: text})} }
              // returnKeyType='next'
            />

            <InputWithLabel
              type='password'
              icon={require('../../assets/images/icon_password.png')}
              title='Password'
              placeHolder='Type your password'
              value={password}
              onChange={ (text) => { this.setState({password: text})} }
            />

            <View style={styles.buttonContainer}>
              <RoundButton
                size={EStyleSheet.value('$buttonHeight')}
                titleLabel='Sign In'
                buttonStyle={styles.activeButton}
                textStyle={styles.activeButtonText}
                onPress={this.onSignIn}
              />
              <RoundButton
                size={EStyleSheet.value('$buttonHeight')}
                titleLabel='Sign Up'
                buttonStyle={styles.inactiveButton}
                textStyle={styles.buttonText}
                onPress={this.onSignUp}
              />
            </View>

            <View style={[styles.container, CommonStyle.center]}>
              <TextButton
                titleLabel='Forgot Password'
                textStyle={styles.forgotPasswordButton}
                onPress={this.onForgotPassword}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>

        <View style={[styles.bottomContainer]}>
          <Text style={styles.termsCondition}>
            {`By using our services, you agree to Terms of Service and Privacy Policy`}
          </Text>
        </View>
      </View>
    );
  }
}

export const LoginScreen = connect(null)(_LoginScreen);