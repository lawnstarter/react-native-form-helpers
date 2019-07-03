import validatejs from "validate.js";

import { validationDictionary } from "./dictionary";

export const validationService = {
  onInputChange,
  getInputValidationState,
  validateInput,
  getFormValidation,
  setInputPosition
};

function onInputChange({ id, value, cb = () => {} }) {
  const { inputs } = this.state;
  this.setState(
    {
      inputs: {
        ...inputs,
        [id]: getInputValidationState({
          input: inputs[id],
          value
        })
      }
    },
    cb
  );
}

function getInputValidationState({ input, value }) {
  return {
    ...input,
    value,
    errorLabel: input.optional
      ? null
      : validateInput({ type: input.type, value })
  };
}

function validateInput({ type, value }) {
  const result = validatejs(
    {
      [type]: value
    },
    {
      [type]: validationDictionary[type]
    }
  );

  console.log("type,value", type, value);
  console.log("type,validationDictionary", type, validationDictionary[type]);

  if (result) {
    return result[type][0];
  }

  return null;
}

function getFormValidation() {
  const { inputs } = this.state;

  const updatedInputs = {};

  for (const [key, input] of Object.entries(inputs)) {
    updatedInputs[key] = getInputValidationState({
      input,
      value: input.value
    });
  }

  this.setState({
    inputs: updatedInputs
  });
}

function setInputPosition({ ids, value }) {
  const { inputs } = this.state;

  const updatedInputs = {
    ...inputs
  };

  ids.forEach(id => {
    updatedInputs[id].yCoordinate = value;
  });

  this.setState({
    inputs: updatedInputs
  });
}
