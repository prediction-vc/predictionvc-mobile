import React, { Component } from 'react';
import PropTypes from 'prop-types';

export function paramsToProps(OriginalComponent, extParams = null) {
  return class ParamsToPropsWrapper extends Component {
    static propTypes = {
      navigation: PropTypes.object.isRequired,
    };
    render() {
      const { params } = this.props.navigation.state;
      return <OriginalComponent {...this.props} {...params} {...extParams} />;
    }
  };
}
