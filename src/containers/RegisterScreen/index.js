import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EStyleSheet from 'react-native-extended-stylesheet';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { Utils } from '../../utils';
import { Auth } from "../../services";
import { InputWithLabel, RoundButton, ImageButton, Spinner } from '../../components';

class _RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      loading: false,
    }
  }

  componentDidMount() {
  }

  onSignUp = async () => {

    const {username, email, password, confirmPassword} = this.state;

    if (!username || username.length >= 20) {
      Utils.showAlert("Input Error", "Please input username but it can't be longer than 20 characters.");
      return;
    } else if (!Utils.validateEmail(email)) {
      Utils.showAlert("Input Error", "Please input your email.");
      return;
    } else if (!Utils.validatePassword(password, confirmPassword)) {
      Utils.showAlert("Input Error", "Please input your password correctly.");
      return;
    }

    try {
      this.setState({loading: true});
      const result = await Auth.signup({username, email, password});
      console.log("Sign Up result:", JSON.stringify(result));

      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainNavigator' })],
      }));
      this.setState({loading: false});

    } catch (error) {
      this.setState({loading: false});
      console.log(error);
      Utils.showAlert("Sign Up Error", error);
    }

  };

  onNavigateBack = () => {
    this.props.navigation.goBack();
  };

  render() {

    const { username, email, password, confirmPassword } = this.state;
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          animation='fade'
        />
        <View style={[styles.navigationBar]}>
          <ImageButton
            image={require('../../assets/images/icon_back.png')}
            style={styles.navigationLeftButton}
            onPress={this.onNavigateBack}
          />
          <Text style={styles.navigationTitle} > Registration </Text>
        </View>

        <KeyboardAwareScrollView style={styles.scrollContent}>
          <View>
            <InputWithLabel
              title='Username'
              placeHolder='Type your username'
              value={username}
              onChange={ (username) => { this.setState({ username })} }
            />

            <InputWithLabel
              type='email'
              title='Email'
              value={email}
              placeHolder='Type your email'
              onChange={ (email) => { this.setState({ email })} }
            />

            <InputWithLabel
              type='password'
              title='Password'
              value={password}
              placeHolder='Create a password'
              onChange={ (password) => { this.setState({ password })} }
            />

            <InputWithLabel
              type='password'
              value={confirmPassword}
              placeHolder='Confirm password'
              onChange={ (confirmPassword) => { this.setState({ confirmPassword })} }
            />
          </View>
        </KeyboardAwareScrollView>

        <View style={[styles.bottomContainer, CommonStyle.center]}>
          <RoundButton
            size={EStyleSheet.value('$buttonHeight')}
            titleLabel='Sign Up'
            buttonStyle={styles.activeButton}
            textStyle={styles.activeButtonText}
            onPress={this.onSignUp}
          />
        </View>
      </View>
    );
  }
}

export const RegisterScreen = connect(null)(_RegisterScreen);