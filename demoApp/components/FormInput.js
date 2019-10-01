import React, {Component, Fragment} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderError() {
    const {errorLabel} = this.props;
    if (errorLabel) {
      return (
        <View>
          <Text style={styles.error}>{errorLabel}</Text>
        </View>
      );
    }
    return null;
  }

  render() {
    const {label} = this.props;
    return (
      <Fragment>
        <Text>{label}</Text>
        <TextInput style={styles.input} {...this.props} />
        {this.renderError()}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 15,
    alignSelf: 'stretch',
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12,
  },
});
