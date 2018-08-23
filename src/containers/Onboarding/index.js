import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { NavigationActions } from 'react-navigation';
import Swiper from 'react-native-swiper'
import { CommonStyle } from '../styles';
import { styles } from './style';
import { TextButton } from '../../components/TextButton';
import { COMPLETE_TUTORIAL, Preferences, Auth } from '../../services';
import _ from 'lodash';

const TutorialStyle1 = ({image, headText, description, hasStartButton = false, startButtonCallback=() => {}}) => {
  return (
    <View style={styles.tutorialContainer1}>
      <View style={[CommonStyle.container, CommonStyle.center]}>
        <Image
          source={image}
        />
      </View>

      <View style={{flex: 3, paddingTop: 20}}>
        <Text style={[CommonStyle.textCenter, styles.tutorialTitle]}>
          {headText}
        </Text>
        <Text style={[CommonStyle.textCenter, styles.description]}>
          {description}
        </Text>
        {hasStartButton && <View style={styles.startButtonContainer}>
          <TouchableOpacity
            onPress={startButtonCallback}
            style={[CommonStyle.center, styles.startButton, CommonStyle.flexRow]}
          >
            <Text style={styles.startButtonText} >Get Started</Text>
            <Image
              style={styles.startButtonIcon}
              source={require('../../assets/images/icon-arrow-right.png')}
            />
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  );
};

const TutorialStyle2 = ({image, description}) => {
  return (
    <View style={styles.tutorialContainer2}>
      <View style={[CommonStyle.center, {flex: 2}]}>
        <Image
          source={image}
        />
      </View>

      <View style={{flex: 1, paddingTop: 20}}>
        <Text style={[CommonStyle.textCenter, styles.description]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const TutorialStyle3 = ({headText, description}) => {
  return (
    <View style={styles.tutorialContainer2}>
      <View style={[CommonStyle.center, {flex: 2}]}>
        <Text style={[CommonStyle.textCenter, styles.tutorialTitle]}>
          {headText}
        </Text>
      </View>

      <View style={{flex: 1, paddingTop: 20}}>
        <Text style={[CommonStyle.textCenter, styles.description]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const tutorials = [
  {
    type: 1,
    image: require('../../assets/images/logo_big.png'),
    title: 'PredictionVC',
    hasStartButton: false,
    description: 'Make smarter crypto investment decisions using predictions from top traders and artificial intelligence.\n\nEarn Oracle tokens in the process '
  },
  {
    type: 1,
    image: require('../../assets/images/logo_big.png'),
    title: '',
    hasStartButton: true,
    description: 'Here is a quick tutorial to get you started.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img3.png'),
    description: 'Connect an unlimited number of exchanges\n and wallets to synchronise your holdings.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img4.png'),
    description: 'If you want to add transactions manually, \n just click on the + icon.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img5.png'),
    description: 'View 24 hour, 7 day or monthly price\npredictions for each coin in your \nportfolio.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img6.png'),
    description: 'You can easily delete tokens from your\nportfolio. Just tap on coin and then\nthe delete icon.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img7.png'),
    description: 'From the settings menu, you can customise\nwhich columns you view, manage price \nalerts and news alerts.'
  },
  {
    type: 2,
    image: require('../../assets/images/tuto_img8.png'),
    description: 'Earn Oracle tokens based on your \nleaderboard positions, or for rating and \nreviewing coins.'
  },
  {
    type: 3,
    title: 'Looks like you’re ready to start making smarter investment decisions.',
    description: 'Check out our FAQs for more information, \nfound in the settings menu.'
  },
];

class _Onboarding extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: 0,
    }
  }

  isUserTour() {
    const { params } = this.props.navigation.state;
    if (!params) return false;
    return !!params.isTour;
  }

  swiperChanged = pageIndex => this.setState({ pageIndex });

  onSkip = async () => {
    await Preferences.setItem(COMPLETE_TUTORIAL, true);
    if (this.isUserTour()) {
      this.props.navigation.goBack();
    } else {
      if (!await Auth.isAuthenticated()) {
        this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'AuthNavigator' })],
        }));
        return;
      }
      this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'MainNavigator' })],
      }));
    }
  };

  onNext = () => {
    if (this.swiper.state.index < tutorials.length - 1) {
      this.swiper.scrollBy(1, true);
    }
    else {
      this.onSkip();
    }
  };

  render() {
    const { pageIndex } = this.state
    return (
      <View style={CommonStyle.container}>
        <Swiper
          ref={(ref) => {this.swiper = ref;}}
          dot={<View style={styles.swiperDot} />}
          activeDot={<View style={styles.activeDot} />}
          loop={false}
          onIndexChanged={this.swiperChanged}
        >
          {
            _.range(0, tutorials.length).map((index) => {
              const data = tutorials[index];
              console.log(JSON.stringify(data));
              if (data.type === 1) {
                return <TutorialStyle1
                  key={`tutorial_${index}`}
                  image={data.image}
                  headText={data.title}
                  hasStartButton={data.hasStartButton}
                  description={data.description}
                  startButtonCallback={this.onNext}
                />
              } else if (data.type === 2) {
                return <TutorialStyle2
                  key={`tutorial_${index}`}
                  image={data.image}
                  description={data.description}
                />
              } else {
                return <TutorialStyle3
                  key={`tutorial_${index}`}
                  headText={data.title}
                  description={data.description}
                />
              }
            })
          }
        </Swiper>

        <View style={styles.bottomContainer}>
          <TextButton
            titleLabel={'Skip'}
            textStyle={styles.skipButton}
            onPress={this.onSkip}
          />
          <TextButton
            titleLabel={pageIndex === tutorials.length - 1 ? 'Finish' : 'Next'}
            textStyle={styles.nextButton}
            onPress={this.onNext}
          />
        </View>
      </View>
    );
  }
}

export const Onboarding = connect(null)(_Onboarding);