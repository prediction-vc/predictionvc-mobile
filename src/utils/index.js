import { Alert } from 'react-native';

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const Utils = {

  validateEmail(email) {
    return emailRegex.test(email);
  },

  validatePassword(password, confirmPassword) {
    if (!password || !confirmPassword) return false;
    return password === confirmPassword;
  },

  capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  showAlert(title, message) {
    setTimeout(() => {
      Alert.alert(
        title,
        message,
        [
          {text: 'OK', onPress: () => console.log('Alert OK Pressed'), style: 'cancel'},
        ],
        { cancelable: false }
      );
    }, 500)
  },

  toFixed(decimalNumber, digits = 2) {
    if (decimalNumber === undefined || decimalNumber === null) return 0;
    if (!parseFloat(decimalNumber)) return 0;
    else {
      const value = parseFloat(decimalNumber);
      return value % 1 !== 0 ? value.toFixed(digits) : value;
    }
  },

  formatCurrency(n, fixed = 2, currency = '$') {
    return currency + n.toFixed(fixed).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
  },

  isEmptyObject(object) {
    if (!object) return true;
    return Object.keys(object).length === 0;
  },

  parseFloat(value) {
    if (!parseFloat(value)) return 0;
    return parseFloat(value);
  },

  makeSpacingText(text, spacing = 2) {
    return text.split('').join('\u200A'.repeat(spacing));
  }

};

export * from './constants';