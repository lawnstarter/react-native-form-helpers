import validatejs from 'validate.js';

import {validationDictionary} from './dictionary';

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
  setInputPosition,
  getFirstInvalidInput,
};

function onInputChange({id, value, cb = () => {}}) {
  const {inputs} = this.state;
  this.setState(
    {
      inputs: {
        ...inputs,
        [id]: getInputValidationState({
          input: inputs[id],
          value,
        }),
      },
    },
    cb,
  );
}

function getInputValidationState({input, value, touched}) {
  return {
    ...input,
    value,
    errorLabel: input.optional
      ? null
      : validateInput({type: input.type, value}),
    touched: touched || input.touched,
  };
}

function validateInput({type, value}) {
  const result = validatejs(
    {
      [type]: value,
    },
    {
      [type]: validationDictionary[type],
    },
  );

  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation() {
  const {inputs} = this.state;

  const updatedInputs = {};

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value,
      touched: true,
    });
  }

  this.setState({
    inputs: updatedInputs,
  });

  return getFirstInvalidInput({inputs: updatedInputs});
}

function setInputPosition({ids, value}) {
  const {inputs} = this.state;

  const updatedInputs = {
    ...inputs,
  };

  ids.forEach(id => {
    updatedInputs[id].yCoordinate = value;
  });

  this.setState({
    inputs: updatedInputs,
  });
}

function getFirstInvalidInput({inputs}) {
  let firstInvalidCoordinate = Infinity;

  for (const [key, input] of Object.entries(inputs)) {
    if (input.errorLabel && input.yCoordinate < firstInvalidCoordinate) {
      firstInvalidCoordinate = input.yCoordinate;
    }
  }

  if (firstInvalidCoordinate === Infinity) {
    firstInvalidCoordinate = null;
  }

  return firstInvalidCoordinate;
}
