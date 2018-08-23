import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

export class ImagePlaceholder extends Component {

  static defaultProps = {
    showActivityIndicator: false,
  };

  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { placeholder } = this.props;
    const { showPlaceholder } = this.props;
    const placeholderImage = placeholder ? placeholder : require('../assets/images/placeholder.png');
    const placeholderStyle = {
      width: this.props.size - 2,
      height: this.props.size - 2,
      borderRadius: (this.props.size - 2) / 2,
    };
    const imageStyle = {
      width: this.props.size,
      height: this.props.size,
      borderRadius: this.props.size / 2,
    };
    return (
      <View style={[styles.container, this.props.style]}>
        <Image
          style={[styles.placeholder, placeholderStyle]}
          source={placeholderImage}
        />
        <Image
          style={[styles.image, imageStyle]}
          source={this.props.source}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    zIndex: 2,
  },
  placeholder: {
    position: 'absolute',
    left: 1,
    top: 1,
    zIndex: 1,
  }
});
