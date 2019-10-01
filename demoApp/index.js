/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import RNFormHelpers from './react-native-form-helpers';
import {validationDictionary} from './react-native-form-helpers/dictionary';

export const validationService = RNFormHelpers({
  dictionary: validationDictionary,
});

AppRegistry.registerComponent(appName, () => App);
