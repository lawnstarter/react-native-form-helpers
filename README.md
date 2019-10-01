# react-native-form-helpers

**Step 1:**<br>
`npm install react-native-form-helpers`

**Step 2:**<br>
Create a dictionary file ([example dictionary](demoApp/react-native-form-helpers/dictionary.js))

**Step 3:**<br>

```js
import RNFormHelpers from "./react-native-form-helpers";
import { validationDictionary } from "./dictionary.js"; // location of your dictionary file

export const validationService = RNFormHelpers({
  dictionary: validationDictionary
});
```

**Step 4:**<br>
Import into your form and utilize the built-in methods. See below tutorial or [sample app](demoApp/App.js) for more details.

## Tutorial Series:

https://medium.com/lawnstarter-engineering/how-to-create-custom-forms-with-validation-and-scroll-to-invalid-logic-in-react-native-part-one-43e5f7cdf807

https://medium.com/lawnstarter-engineering/how-to-create-custom-forms-with-validation-and-scroll-to-invalid-logic-in-react-native-part-two-9834849d4d78

// placeholder for part three
