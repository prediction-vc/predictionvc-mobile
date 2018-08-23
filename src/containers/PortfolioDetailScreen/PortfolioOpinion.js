import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CommonStyle } from '../styles';
import { TextButton, ImageButton } from '../../components';
import { Utils, Constants } from '../../utils';
import _ from 'lodash';

class _PortfolioOpinion extends Component {

  static propTypes = {
    strengthTitle: PropTypes.string,
    weaknessTitle: PropTypes.string,
  };

  static defaultProps = {
    strengthTitle: 'Strengths',
    weaknessTitle: 'Weaknesses',
  };

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
      strengthShowMore: false,
      weaknessShowMore: false,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Button Actions start
  onToggleStrengthMore = () => {
    const { strengthShowMore } = this.state;
    this.setState({ strengthShowMore: !strengthShowMore });
  };

  onToggleWeaknessMore = () => {
    const { weaknessShowMore } = this.state;
    this.setState({ weaknessShowMore: !weaknessShowMore });
  };
  // mark - Button Action end  ////////////

  // mark - Handle App data start
  // mark - Handle App data end////////////

  // mark - Render components start
  renderOpinions(type) {
    const { strengths, weaknesses } = this.props.opinions;
    const { strengthShowMore, weaknessShowMore } = this.state;
    const selectedOpinions = type === 0 ? strengths : weaknesses;
    const selectedShowMore = type === 0 ? strengthShowMore : weaknessShowMore;
    let visibleOpinions = [];
    if (!selectedShowMore) {
      selectedOpinions.map( (opinion, index) => {
        if (index < 3) visibleOpinions.push(opinion);
      })
    } else {
      visibleOpinions = _.cloneDeep(selectedOpinions);
    }

    return <View>
      {
        visibleOpinions.map( (opinion, index) => <View style={styles.opinionContainer} key={`opinion-${type === 0 ? 'strength' : 'weakness'}-${index}`}>
          <View style={CommonStyle.flexOne}>
            <Text style={styles.textTitle} numberOfLines={0}>{opinion.title}</Text>
            <View style={[CommonStyle.flexRow, {paddingTop: 10}]}>
              <Image style={{width:17, height: 17}} source={require('../../assets/images/icon-faq.png')}/>
              <TextButton
                textStyle={styles.textComments}
                titleLabel={`${opinion.commentsNumber} Comment ${opinion.commentsNumber > 1 ? 's' : ''}`}
              />
            </View>
          </View>

          <View style={styles.voteContainer}>
            <Text style={styles.textVote}>{opinion.upvotesNumber}</Text>
            <ImageButton style={{marginHorizontal: 2, marginBottom: 3}} image={require('../../assets/images/icon-like.png')}/>
            <ImageButton style={{marginHorizontal: 2, marginTop: 3}} image={require('../../assets/images/icon-dislike.png')}/>
          </View>
        </View>)
      }
      {selectedOpinions.length > 3 && <TouchableOpacity
        style={styles.moreButton}
        onPress={type === 0 ? this.onToggleStrengthMore : this.onToggleWeaknessMore}
      >
        <Text style={styles.moreButtonTitle}>{selectedShowMore ? 'Show less' : 'See more'}</Text>
        <Image
          style={{alignSelf:'center', transform: [{ rotate: selectedShowMore ? '180deg' : '0deg'}]}}
          source={require('../../assets/images/icon-show-more.png')}
        />
      </TouchableOpacity>}
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render modulex
  render() {
    const { strengthTitle, weaknessTitle, opinions } = this.props;
    return <View>
      <Text style={styles.sectionTitle}>{strengthTitle}</Text>
      { opinions && this.renderOpinions(0) }
      <Text style={styles.sectionTitle}>{weaknessTitle}</Text>
      { opinions && this.renderOpinions(1) }
    </View>
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    padding: 20,
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  opinionContainer: {
    paddingVertical: 15,
    paddingLeft: 25,
    paddingRight: 10,
    marginBottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    flexDirection: 'row',
  },
  voteContainer: {
    width: 60,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textVote: {
    color: Constants.primaryTextColor,
    fontSize: 13,
    paddingRight: 5,
    alignSelf: 'center',
  },
  textTitle: {
    color: Constants.primaryTextColor,
    fontSize: 11,
  },
  textComments: {
    color: Constants.primaryColor,
    fontSize: 10,
    paddingHorizontal: 5,
    alignSelf: 'center'
  },
  moreButton: {
    flexDirection: 'row',
    padding: 20,
  },
  moreButtonTitle : {
    color: Constants.primaryColor,
    fontSize: 13,
    paddingRight: 5,
  }
});

function mapStateToProps(store) {
  return {
    user: store.user,
    opinions: store.project.opinions,
  }
}

export const PortfolioOpinion = connect(mapStateToProps, {})(_PortfolioOpinion);