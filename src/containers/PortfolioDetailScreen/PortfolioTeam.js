import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../styles';
import { Constants } from '../../utils';
import { PortfolioOpinion } from './PortfolioOpinion';
import { ScoreRate } from './ScoreRate';

export class PortfolioTeam extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
    };
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}
  // mark - Initialize end  ////////////

  // mark - Render components start
  renderTeam() {
    const { team } = this.state.portfolio;
    return <View style={styles.teamContainer}>
      {team.length > 0 && <Text style={styles.textSubTitle}>Team</Text>}
      {
        team.map( (item, index) => {
          return <View style={[styles.teamWrapper, CommonStyle.center]} key={`team-user-${index}`}>
            <Image style={styles.imagePhoto} source={require('../../assets/images/img-user-placeholder.png')}/>
            <View style={[CommonStyle.flexOne, {paddingLeft: 15}]}>
              <Text style={styles.textName}>{item.name}</Text>
              <Text style={styles.textPosition}>{item.role}</Text>
            </View>
            <TouchableOpacity style={[styles.socialButtonContainer, CommonStyle.center]}>
              <Image source={require('../../assets/images/icon-fb-black.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButtonContainer, CommonStyle.center]}>
              <Image source={require('../../assets/images/icon-tw-black.png')}/>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.socialButtonContainer, CommonStyle.center]}>
              <Image source={require('../../assets/images/icon-reddit-black.png')}/>
            </TouchableOpacity>
          </View>
        })
      }
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { team } = this.state.portfolio;
    return <ScrollView style={CommonStyle.container}>
      <ScoreRate
        {...this.props}
        scoreType='team'
      />
      <PortfolioOpinion
        {...this.props}
        strengthTitle='Team Strengths'
        weaknessTitle='Team Weaknesses'
      />
      {team && this.renderTeam()}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  teamContainer: {
    padding: 20,
  },
  teamWrapper: {
    paddingVertical: 8,
    flexDirection: 'row',
  },
  textSubTitle: {
    paddingVertical: 15,
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  textName: {
    fontSize: 15,
    color: Constants.primaryTextColor,
  },
  textPosition: {
    fontSize: 10,
    color: Constants.primaryTextColor,
  },
  imagePhoto: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  socialButtonContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    marginLeft: 10,
    borderColor: Constants.inactiveColor
  }

});