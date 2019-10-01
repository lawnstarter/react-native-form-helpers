import React, {Component, Fragment} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Switch,
} from 'react-native';
import {validationService} from './validation/service';
import FormInput from './components/FormInput';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputs: {
        first_name: {
          type: 'generic',
          value: '',
        },
        last_name: {
          type: 'generic',
          value: '',
        },
        birthday_month: {
          type: 'month',
          value: '',
        },
        birthday_day: {
          type: 'day',
          value: '',
        },
        birthday_year: {
          type: 'year',
          value: '',
        },
        state: {
          type: 'state',
          value: '',
        },
        zip: {
          type: 'zip',
          value: '',
        },
        tos: {
          type: 'bool',
          value: false,
        },
      },
    };

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.setInputPosition = validationService.setInputPosition.bind(this);
    this.submit = this.submit.bind(this);

    this.scrollView = React.createRef();
  }

  submit() {
    const firstInvalidCoordinate = this.getFormValidation();

    if (firstInvalidCoordinate !== null) {
      this.scrollView.current.scrollTo({
        x: 0,
        y: firstInvalidCoordinate,
        animated: true,
      });
      return;
    }

    // if we make it to this point, we can actually submit the form
  }

  renderError(id) {
    const {inputs} = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    const {inputs} = this.state;

    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <ScrollView ref={this.scrollView}>
          <FormInput
            label={'First Name'}
            onChangeText={value => {
              this.onInputChange({id: 'first_name', value});
            }}
            errorLabel={inputs.first_name.errorLabel}
            touched={inputs.first_name.touched}
            onLayout={({nativeEvent}) => {
              this.setInputPosition({
                ids: ['first_name'],
                value: nativeEvent.layout.y,
              });
            }}
          />

          <FormInput
            label={'Last Name'}
            onChangeText={value => {
              this.onInputChange({id: 'last_name', value});
            }}
            errorLabel={inputs.last_name.errorLabel}
            touched={inputs.last_name.touched}
            onLayout={({nativeEvent}) => {
              this.setInputPosition({
                ids: ['last_name'],
                value: nativeEvent.layout.y,
              });
            }}
          />

          <Fragment>
            <Text>Birthday?</Text>
            <View
              onLayout={({nativeEvent}) => {
                this.setInputPosition({
                  ids: ['birthday_month', 'birthday_day'],
                  value: nativeEvent.layout.y,
                });
              }}
              style={styles.split}>
              <View style={{flex: 1, marginRight: 5}}>
                <FormInput
                  onChangeText={value => {
                    this.onInputChange({id: 'birthday_month', value});
                  }}
                  errorLabel={inputs.birthday_month.errorLabel}
                  touched={inputs.birthday_month.touched}
                  placeholder="Month"
                  keyboardType="number-pad"
                />
              </View>
              <View style={{flex: 1, marginLeft: 5}}>
                <FormInput
                  onChangeText={value => {
                    this.onInputChange({id: 'birthday_day', value});
                  }}
                  errorLabel={inputs.birthday_day.errorLabel}
                  touched={inputs.birthday_day.touched}
                  placeholder="Day"
                  keyboardType="number-pad"
                />
              </View>
            </View>
            <FormInput
              onChangeText={value => {
                this.onInputChange({id: 'birthday_year', value});
              }}
              errorLabel={inputs.birthday_year.errorLabel}
              touched={inputs.birthday_year.touched}
              placeholder="Year"
              keyboardType="number-pad"
            />
          </Fragment>

          <FormInput
            label={'State'}
            onChangeText={value => {
              this.onInputChange({id: 'state', value});
            }}
            errorLabel={inputs.state.errorLabel}
            touched={inputs.state.touched}
            onLayout={({nativeEvent}) => {
              this.setInputPosition({
                ids: ['state'],
                value: nativeEvent.layout.y,
              });
            }}
            autoCapitalize="characters"
            maxLength={2}
          />

          <FormInput
            label={'Zip'}
            onChangeText={value => {
              this.onInputChange({id: 'zip', value});
            }}
            errorLabel={inputs.zip.errorLabel}
            touched={inputs.zip.touched}
            onLayout={({nativeEvent}) => {
              this.setInputPosition({
                ids: ['zip'],
                value: nativeEvent.layout.y,
              });
            }}
            maxLength={5}
            keyboardType="number-pad"
          />

          <View
            onLayout={({nativeEvent}) => {
              this.setInputPosition({
                ids: ['tos'],
                value: nativeEvent.layout.y,
              });
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 20,
              }}>
              <Switch
                value={this.state.inputs.tos.value}
                onValueChange={value => {
                  this.onInputChange({id: 'tos', value});
                }}
              />
              <Text style={{paddingLeft: 10}}>Do you agree to the TOS?</Text>
            </View>
            {this.renderError('tos')}
          </View>
        </ScrollView>

        <View style={styles.button}>
          <Button title="Submit Form" onPress={this.submit} />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50,
    paddingBottom: 10,
  },
  split: {
    flexDirection: 'row',
  },
  button: {
    flex: 0,
    justifyContent: 'flex-end',
  },
  error: {
    position: 'absolute',
    bottom: 0,
    color: 'red',
    fontSize: 12,
  },
});