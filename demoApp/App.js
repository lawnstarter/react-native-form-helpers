import React, { Component } from "react";
import {
  Button,
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput
} from "react-native";
import { validationService } from "./validation/service";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.onInputChange = validationService.onInputChange.bind(this);
    this.getFormValidation = validationService.getFormValidation.bind(this);
    this.submit = this.submit.bind(this);

    this.state = {
      inputs: {
        first_name: {
          type: "generic",
          value: ""
        },
        last_name: {
          type: "generic",
          value: ""
        },
        birthday_month: {
          type: "month",
          value: ""
        },
        birthday_day: {
          type: "day",
          value: ""
        }
      }
    };
  }

  submit() {
    this.getFormValidation();
  }

  renderError(id) {
    const { inputs } = this.state;
    if (inputs[id].errorLabel) {
      return <Text style={styles.error}>{inputs[id].errorLabel}</Text>;
    }
    return null;
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <Text>First Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "first_name", value });
              }}
            />
            {this.renderError("first_name")}
          </View>

          <View>
            <Text>Last Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={value => {
                this.onInputChange({ id: "last_name", value });
              }}
            />
            {this.renderError("last_name")}
          </View>

          <View>
            <Text>Birthday?</Text>
            <View style={styles.split}>
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Month"
                  onChangeText={value => {
                    this.onInputChange({ id: "birthday_month", value });
                  }}
                />
                {this.renderError("birthday_month")}
              </View>
              <View style={{ flex: 1, marginLeft: 5 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Day"
                  onChangeText={value => {
                    this.onInputChange({ id: "birthday_day", value });
                  }}
                />
                {this.renderError("birthday_day")}
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.button}>
          <Button title="Submit Form" onPress={this.submit} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 50
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    marginBottom: 15,
    alignSelf: "stretch"
  },
  split: {
    flexDirection: "row"
  },
  error: {
    position: "absolute",
    bottom: 0,
    color: "red",
    fontSize: 12
  },
  button: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 20
  }
});
