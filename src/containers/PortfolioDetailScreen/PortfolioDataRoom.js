import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Image, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { CommonStyle } from '../styles';
import { Constants } from '../../utils';
import { Prediction } from '../../services';

export class PortfolioData extends Component {

  // mark - Initialize Start
  constructor(props) {
    super(props);
    const { params } = props.navigation.state;
    this.state = {
      portfolio: params.portfolio,
      loadingData: true,
      allFiles: null,
    };
  }

  componentDidMount() {
    this.loadData().then();
  }

  async loadData() {
    const result = await Prediction.getProjectData(this.state.portfolio._id);
    if (result.success) {
      console.log("Data:", JSON.stringify(result.opinions));
      this.setState({allFiles: result.files, loadingData: false});
    } else {
      this.setState({loadingData: false})
    }
  }

  onLinkPress(title, link) {
    this.props.navigation.navigate('NewsDetailScreen', { article:
      { title, link }
    });
  }
  // mark - Initialize end  ////////////


  // mark - Render components start
  renderFiles(key) {
    const { allFiles } = this.state;
    const files = allFiles[key];

    return <View style={styles.fileContainer} key={`file-head-${key}`}>
      <View style={styles.fileHeaderWrapper}>
        <Text style={styles.fileHeader}>{key}</Text>
      </View>
      {
        files.map((file, index) => {
          return <View style={styles.fileWrapper} key={`${key}-file-${index}`}>
            <Text style={styles.fileName}>{file.description}</Text>
            <View style={[CommonStyle.flexRow, {marginTop: 10}]}>
              <Image source={require('../../assets/images/icon-link.png')}/>
              <TouchableOpacity onPress={() => this.onLinkPress(file.description, file.s3link)}>
                <Text style={styles.link}>{file.s3link}</Text>
              </TouchableOpacity>
            </View>
          </View>
        })
      }
    </View>
  }
  // mark - Render Components end  ////////////

  // mark - Main render module
  render() {
    const { allFiles, loadingData } = this.state;
    return <ScrollView style={[CommonStyle.container, styles.dataContainer]}>
      <Text style={[styles.textLabel, {lineHeight: 30.5}]}>Data Room</Text>
      {loadingData && <ActivityIndicator style={styles.dataLoader} size='large'/>}
      {
        allFiles && Object.keys(allFiles).map(key => {
          return this.renderFiles(key)
        })
      }
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  dataContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  textLabel: {
    fontSize: 17,
    color: Constants.primaryTextColor,
  },
  dataLoader: {
    marginTop: 100,
  },
  fileContainer: {
    paddingVertical: 10,
    borderRadius: 2,
  },
  fileHeader: {
    lineHeight: 25,
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },
  fileWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.02)',
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0, 0, 0, 0.04)',
    padding: 20,
  },
  fileHeaderWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    paddingHorizontal: 10,
  },
  fileName: {
    color: Constants.primaryTextColor,
    fontSize: 14,
  },
  link: {
    paddingLeft: 10,
    color: Constants.primaryColor,
    fontSize: 12,
  }
});