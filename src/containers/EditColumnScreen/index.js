import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image, View, Text, ListView, TouchableOpacity } from 'react-native';
import { CommonStyle } from '../styles';
import { styles } from './style';
import { NavigationBar } from '../../components';
import { setDisplayColumns } from '../../actions/project';
import { Preferences, DISPLAY_COLUMNS } from '../../services';
import {Utils} from "../../utils/index";

const EditMode = {
  none: 0,
  edit: 1
};
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class _EditColumnScreen extends Component {
  // mark - Initialize Start
  constructor(props) {
    super(props);
    this.state = {
      editMode: EditMode.none,
      displayColumns: props.displayColumns,
      selectableLimit: 3,
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
  }
  // mark - Initialize end  ////////////

  // mark - Button Action start
  onBackPressed = () => {
    const { editMode } = this.state;
    if (editMode === EditMode.edit) {
      const { displayColumns } = this.props;
      this.setState({editMode: EditMode.none, displayColumns});
    } else {
      this.props.navigation.goBack();
    }
  };

  onEditButtonPressed = async () => {
    const { editMode, displayColumns } = this.state;
    if (editMode === EditMode.edit) {
      // Save changed data.
      await Preferences.setItem(DISPLAY_COLUMNS, displayColumns);
      this.props.setDisplayColumns(displayColumns);
    }
    this.setState({editMode: (editMode + 1) % 2});
  };

  onSelectColumn = (rowData) => {
    const { displayColumns, selectableLimit, editMode } = this.state;
    if (editMode === EditMode.none) return;
    const rowDataSelected = this.isColumnSelected(rowData);
    if (rowDataSelected) {
      let newColumns = [];
      displayColumns.map((column) => {
        if (column.id !== rowData.id) {
          newColumns.push(column);
        }
      });
      this.setState({displayColumns: newColumns});

    } else if (displayColumns.length < selectableLimit) {

      let newColumns = displayColumns;
      newColumns.push(rowData);
      this.setState({displayColumns: newColumns});
    } else if (displayColumns.length >= selectableLimit) {
      Utils.showAlert('Limited selection.', 'You cannot add more that 3 columns.');
    }
  };

  isColumnSelected = (rowData) => {
    const { displayColumns } = this.state;
    return displayColumns.find(column => column.id === rowData.id);
  };
  // mark - Button Action end  ////////////

  renderCurrencyCell(rowData) {
    const { editMode } = this.state;

    return <TouchableOpacity
      style={[styles.currencyCell, CommonStyle.center, CommonStyle.flexRow]}
      onPress={() => this.onSelectColumn(rowData)}
    >
      {
        editMode === EditMode.edit &&
        <View style={[styles.columnIcon, this.isColumnSelected(rowData) ? styles.activeColumnIcon : styles.inactiveColumnIcon]}/>
      }
      <Text style={this.isColumnSelected(rowData) ? styles.activeColumnText : styles.inActiveColumnText}>{rowData.name}</Text>
      {
        editMode === EditMode.none && this.isColumnSelected(rowData) &&
        <Image style={styles.columnCheckIcon} source={require('../../assets/images/icon-circle-checked.png')}/>
      }
    </TouchableOpacity>
  }

  render() {
    const { editMode } = this.state;
    const { currencyColumns } = this.props;
    return (
      <View style={CommonStyle.container}>
        <NavigationBar
          titleLabel='Edit Columns'
          backButton={true}
          rightButtonTitle={editMode === EditMode.none ? 'Edit' : 'Done'}
          onBackButtonPress={this.onBackPressed}
          onRightButtonPress={this.onEditButtonPressed}
        />
        <ListView
          style={CommonStyle.container}
          dataSource={ds.cloneWithRows(currencyColumns)}
          renderRow={this.renderCurrencyCell.bind(this)}
          removeClippedSubviews={false}
        />
      </View>
    );
  }
}

function mapStateToProps(store) {
  return {
    user: store.user,
    currencyColumns: store.currencyColumns,
    displayColumns: store.selectedCurrencyColumns
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setDisplayColumns: (columns) => dispatch(setDisplayColumns(columns)),
  };
}

export const EditColumnScreen = connect(mapStateToProps, mapDispatchToProps)(_EditColumnScreen);