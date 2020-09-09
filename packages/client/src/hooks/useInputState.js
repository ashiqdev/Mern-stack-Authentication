import { useState } from 'react';

const useInputState = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const onChangeHandler = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const reset = (field) => {
    if (field) {
      setState({
        ...state,
        [field]: initialValue[field],
      });
    } else {
      setState({
        ...initialValue,
      });
    }
  };

  return [state, onChangeHandler, reset];
};

export default useInputState;
